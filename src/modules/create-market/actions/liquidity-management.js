import { eachOfSeries, eachOfLimit } from 'async'
import { createBigNumber } from 'utils/create-big-number'
import { augur } from 'services/augurjs'
import { loadMarketsInfo } from 'modules/markets/actions/load-markets-info'
import { BID } from 'modules/transactions/constants/types'
import { CATEGORICAL } from 'modules/markets/constants/market-types'
import noop from 'utils/noop'

const localStorageRef = typeof window !== 'undefined' && window.localStorage
const LIQUIDITY = 'liquidity'
// liquidity should be an orderbook, example with yesNo:
// { 1: [{ type, quantity, price, orderEstimate }, ...], ... }
export const saveLiquidity = (liquidity, marketId, callback = noop) =>
  (dispatch, getState) => {
    const { loginAccount } = getState()
    const { address } = loginAccount
    if (localStorageRef) {
      const accountStorage = getAccountStorage(address)
      const updatedAccountStorage = Object.assign(accountStorage, {
        [LIQUIDITY]: {
          ...accountStorage[LIQUIDITY],
          [marketId]: liquidity,
        },
      })
      setAccountStorage(address, updatedAccountStorage)
    }
    callback()
  }
// updatedOutcomeOrdersArray is an array of order objects: [{ type, quantity, price, orderEstimate }, ...]
export const updateLiquidityOrder = (orderId, outcomeId, marketId, updatedOrderInfo, isRemoval = false) => (dispatch, getState) => {
  const { loginAccount } = getState()
  const { address } = loginAccount
  if (localStorageRef) {
    const accountStorage = getAccountStorage(address)
    const accountLiquidity = accountStorage[LIQUIDITY]
    const curMarketLiquidity = accountLiquidity[marketId]
    let marketLiquidityOutcomeArray = curMarketLiquidity[outcomeId]
    const curOrder = marketLiquidityOutcomeArray[orderId]
    const newOrder = Object.Assign(curOrder, {
      ...updatedOrderInfo,
    })
    marketLiquidityOutcomeArray[orderId] = newOrder
    if (isRemoval) marketLiquidityOutcomeArray = marketLiquidityOutcomeArray.slice(0, orderId).concat(marketLiquidityOutcomeArray.slice(orderId + 1, marketLiquidityOutcomeArray.length))
    setAccountStorage(address, Object.assign(accountStorage, {
      [LIQUIDITY]: {
        ...accountLiquidity,
        [marketId]: { ...curMarketLiquidity, [outcomeId]: marketLiquidityOutcomeArray },
      },
    }))
  }
}

export const doesMarketHaveOrders = marketId => (dispatch, getState) => {
  const { loginAccount } = getState()
  const { address } = loginAccount
  if (localStorageRef) {
    const accountStorage = getAccountStorage(address)
    const accountLiquidity = accountStorage[LIQUIDITY]
    const curMarketLiquidity = accountLiquidity[marketId]
    console.log('doesMarjetHaveOrders', marketId, curMarketLiquidity, Object.keys(curMarketLiquidity).length);
    if (Object.keys(curMarketLiquidity).length) return true
  }
  return false
}

export const startOrderSending = marketId => (dispatch, getState) => {
  dispatch(loadMarketsInfo([marketId], (err, marketsDataInfo) => {
    if (err) return console.log(err)
    const { loginAccount, marketsData } = getState()
    const { address } = loginAccount
    const market = marketsData[marketId]
    console.log('market', market);
    const accountStorage = getAccountStorage(address)
    const orderBook = accountStorage[LIQUIDITY][marketId]
    eachOfSeries(Object.keys(orderBook), (outcome, index, seriesCB) => {
      // Set the limit for simultaneous async calls to 1 so orders will have to be signed in order, one at a time.
      // (This is done so the gas cost doesn't increase as orders are created, due to having to traverse the
      // order book and insert each order in the appropriate spot.)
      const { numTicks, marketType, minPrice, maxPrice } = market
      eachOfLimit(orderBook[outcome], 1, (order, orderId, orderCB) => {
        console.log('eachOfLimit', order, orderId, orderBook[outcome])
        // if (order.sent) orderCB()
        const outcomeId = marketType === CATEGORICAL ? index : 1 // NOTE -- Both Scalar + Binary only trade against one outcome, that of outcomeId 1
        const orderType = order.type === BID ? 0 : 1
        const tradeCost = augur.trading.calculateTradeCost({
          displayPrice: order.price,
          displayAmount: order.quantity,
          sharesProvided: '0',
          numTicks,
          orderType,
          minDisplayPrice: minPrice || 0,
          maxDisplayPrice: maxPrice || 1,
        })
        const { onChainAmount, onChainPrice, cost } = tradeCost
        augur.api.CreateOrder.publicCreateOrder({
          meta: loginAccount.meta,
          tx: { value: augur.utils.convertBigNumberToHexString(cost) },
          _type: orderType,
          _attoshares: augur.utils.convertBigNumberToHexString(onChainAmount),
          _displayPrice: augur.utils.convertBigNumberToHexString(onChainPrice),
          _market: marketId,
          _outcome: outcomeId,
          _tradeGroupId: augur.trading.generateTradeGroupId(),
          onSent: (res) => {
            console.log('onSent', order, outcomeId, marketId);
            // updateLiquidityOrder(orderId, outcomeId, marketId, { sent: true })
            orderCB()
          },
          onSuccess: (res) => {
            console.log('onSuccess', res);
            // updateLiquidityOrder(orderId, outcomeId, marketId, {}, true)
          },
          onFailed: (err) => {
            console.error('ERROR creating order in initial market liquidity: ', err)
            orderCB()
          },
        })
      }, (err) => {
        if (err !== null) console.error('ERROR: ', err)
        seriesCB()
      })
    }, (err) => {
      if (err !== null) console.error('ERROR: ', err)
    })
  }))
}

const getAccountStorage = address => JSON.parse(localStorageRef.getItem(address))

const setAccountStorage = (address, accountStorage) => localStorageRef.setItem(address, JSON.stringify(accountStorage))

