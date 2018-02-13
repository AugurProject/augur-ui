import BigNumber from 'bignumber.js'
import { augur } from 'services/augurjs'
import { BUY, SELL } from 'modules/transactions/constants/types'
import { BIDS, ASKS } from 'modules/order-book/constants/order-book-order-types'
import { TWO } from 'modules/trade/constants/numbers'
import { SCALAR } from 'modules/markets/constants/market-types'

import { loadAccountPositions } from 'modules/my-positions/actions/load-account-positions'
import { selectAggregateOrderBook, selectTopBid, selectTopAsk } from 'modules/bids-asks/helpers/select-order-book'
import logError from 'utils/log-error'

export const UPDATE_TRADE_IN_PROGRESS = 'UPDATE_TRADE_IN_PROGRESS'
export const CLEAR_TRADE_IN_PROGRESS = 'CLEAR_TRADE_IN_PROGRESS'

// Updates user's trade. Only defined (i.e. !== null) parameters are updated
export function updateTradesInProgress(marketID, outcomeID, side, numShares, limitPrice, maxCost, callback = logError) {
  return (dispatch, getState) => {
    const {
      tradesInProgress, marketsData, loginAccount, orderBooks, orderCancellation
    } = getState()

    const outcomeTradeInProgress = (tradesInProgress && tradesInProgress[marketID] && tradesInProgress[marketID][outcomeID]) || {}
    const market = marketsData[marketID]
    // if nothing changed, exit
    if (!market || (outcomeTradeInProgress.numShares === numShares && outcomeTradeInProgress.limitPrice === limitPrice && outcomeTradeInProgress.side === side && outcomeTradeInProgress.totalCost === maxCost)) {
      return
    }

    // if new side not provided, use old side
    const cleanSide = side || outcomeTradeInProgress.side
    if ((numShares === '' || parseFloat(numShares) === 0) && limitPrice === null && !maxCost) { // numShares cleared
      return dispatch({
        type: UPDATE_TRADE_IN_PROGRESS,
        data: {
          marketID,
          outcomeID,
          details: {
            side: cleanSide,
            numShares: '',
            limitPrice: outcomeTradeInProgress.limitPrice
          }
        }
      })
    }

    if ((limitPrice === '' || (parseFloat(limitPrice) === 0 && market.type !== SCALAR)) && numShares === null) { // limitPrice cleared
      return dispatch({
        type: UPDATE_TRADE_IN_PROGRESS,
        data: {
          marketID,
          outcomeID,
          details: {
            side: cleanSide,
            limitPrice: '',
            numShares: outcomeTradeInProgress.numShares,
          }
        }
      })
    }

    // find top order to default limit price to
    if (orderBooks[marketID] && orderBooks[marketID][outcomeID]) console.log(orderBooks[marketID][outcomeID])
    const marketOrderBook = selectAggregateOrderBook(outcomeID, orderBooks[marketID], orderCancellation)
    console.log('marketOrderBook', marketOrderBook)
    const defaultPrice = market.type === SCALAR ?
      new BigNumber(market.maxPrice, 10)
        .plus(new BigNumber(market.minPrice, 10))
        .dividedBy(TWO)
        .toFixed() :
      '0.5'
    const topOrderPrice = cleanSide === BUY ?
      ((selectTopAsk(marketOrderBook, true) || {}).price || {}).formattedValue || defaultPrice :
      ((selectTopBid(marketOrderBook, true) || {}).price || {}).formattedValue || defaultPrice

    const bignumShares = new BigNumber(numShares, 10)
    const bignumLimit = new BigNumber(limitPrice, 10)
    // clean num shares
    let cleanNumShares = numShares && bignumShares.toFixed() === '0' ? '0' : (numShares && bignumShares.abs().toFixed()) || outcomeTradeInProgress.numShares || '0'

    // if current trade order limitPrice is equal to the best price, make sure it's equal to that; otherwise, use what the user has entered
    let cleanLimitPrice
    const topAskPrice = ((selectTopAsk(marketOrderBook, true) || {}).price || {}).formattedValue || defaultPrice
    const topBidPrice = ((selectTopBid(marketOrderBook, true) || {}).price || {}).formattedValue || defaultPrice

    if (limitPrice && bignumLimit.toFixed() === '0') {
      cleanLimitPrice = '0'
    } else if (limitPrice && bignumLimit.toFixed()) {
      cleanLimitPrice = bignumLimit.toFixed()
    } else if (cleanSide === BUY && outcomeTradeInProgress.limitPrice === topBidPrice) {
      cleanLimitPrice = topAskPrice
    } else if (cleanSide === SELL && outcomeTradeInProgress.limitPrice === topAskPrice) {
      cleanLimitPrice = topBidPrice
    } else {
      cleanLimitPrice = outcomeTradeInProgress.limitPrice
    }

    if (cleanNumShares && !cleanLimitPrice && (market.type === SCALAR || cleanLimitPrice !== '0')) {
      cleanLimitPrice = topOrderPrice
    }

    // if this isn't a scalar market, limitPrice must be positive.
    if (market.type !== SCALAR && limitPrice) {
      cleanLimitPrice = bignumLimit.abs().toFixed() || outcomeTradeInProgress.limitPrice || topOrderPrice
    }

    if (maxCost) {
      // maxCost defined indicates a Market Order
      let sharesAmount = new BigNumber(0, 10)
      let amountLeftToFill = maxCost
      let orderLimitPrice = cleanLimitPrice
      const orderBookSide = side === BUY ? marketOrderBook[ASKS] : marketOrderBook[BIDS]
      for (let i = 0; i < orderBookSide.length; i++) {
        const orderPrice = new BigNumber(orderBookSide[i].price.value, 10)
        const orderShares = new BigNumber(orderBookSide[i].shares.value, 10)
        const amountOfSharesFillableAtPrice = amountLeftToFill.dividedBy(orderPrice)
        const sharesPurchasableAtPriceMinusOrderMax = amountOfSharesFillableAtPrice.minus(orderShares)
        // update limitPrice
        orderLimitPrice = orderPrice

        if (sharesPurchasableAtPriceMinusOrderMax.lte(0)) {
          sharesAmount = sharesAmount.plus(amountOfSharesFillableAtPrice)
          break
        }

        amountLeftToFill = amountLeftToFill.minus((orderPrice.mul(orderShares)))
        sharesAmount = sharesAmount.plus(orderShares)
      }
      cleanNumShares = sharesAmount.toFixed()
      cleanLimitPrice = orderLimitPrice.toFixed()
    }

    const newTradeDetails = {
      side: cleanSide,
      numShares: cleanNumShares === '0' ? undefined : cleanNumShares,
      limitPrice: cleanLimitPrice,
      totalFee: '0',
      totalCost: '0'
    }

    // trade actions
    if (newTradeDetails.side && loginAccount.address) {
      dispatch(loadAccountPositions({ market: marketID }, (err, accountPositions) => {
        if (err) {
          return dispatch({
            type: UPDATE_TRADE_IN_PROGRESS,
            data: { marketID, outcomeID, details: newTradeDetails }
          })
        }
        const cleanAccountPositions = []
        for (let i = 0; i < market.numOutcomes; i++) {
          if (accountPositions[i]) {
            cleanAccountPositions.push(accountPositions[i].numShares)
          } else {
            cleanAccountPositions.push(0)
          }
        }
        const simulatedTrade = augur.trading.simulateTrade({
          orderType: newTradeDetails.side === BUY ? 0 : 1,
          outcome: parseInt(outcomeID, 10),
          shareBalances: cleanAccountPositions,
          tokenBalance: (loginAccount.eth && loginAccount.eth.toString()) || '0',
          userAddress: loginAccount.address,
          minPrice: market.minPrice,
          maxPrice: market.maxPrice,
          price: newTradeDetails.limitPrice,
          shares: newTradeDetails.numShares,
          marketCreatorFeeRate: market.settlementFee,
          singleOutcomeOrderBook: (orderBooks && orderBooks[marketID] && orderBooks[marketID][outcomeID]) || {},
          shouldCollectReportingFees: !market.isDisowned,
          reportingFeeRate: market.reportingFeeRate
        })
        const totalFee = new BigNumber(simulatedTrade.settlementFees, 10).plus(new BigNumber(simulatedTrade.gasFees, 10))
        newTradeDetails.totalFee = totalFee.toFixed()
        newTradeDetails.totalCost = new BigNumber(simulatedTrade.tokensDepleted, 10).neg().toFixed()
        newTradeDetails.feePercent = totalFee.dividedBy(new BigNumber(simulatedTrade.tokensDepleted, 10)).toFixed()
        if (isNaN(newTradeDetails.feePercent)) newTradeDetails.feePercent = '0'
        dispatch({
          type: UPDATE_TRADE_IN_PROGRESS,
          data: { marketID, outcomeID, details: { ...newTradeDetails, ...simulatedTrade } }
        })
        callback(null, { ...newTradeDetails, ...simulatedTrade })
      }))
    } else {
      dispatch({
        type: UPDATE_TRADE_IN_PROGRESS,
        data: { marketID, outcomeID, details: newTradeDetails }
      })
      callback(null)
    }
  }
}

export function clearTradeInProgress(marketID) {
  return { type: CLEAR_TRADE_IN_PROGRESS, marketID }
}
