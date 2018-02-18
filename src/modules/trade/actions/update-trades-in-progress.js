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

    if ((limitPrice === '' || (parseFloat(limitPrice) === 0 && market.marketType !== SCALAR)) && numShares === null) { // limitPrice cleared
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
    const marketOrderBook = selectAggregateOrderBook(outcomeID, orderBooks[marketID], orderCancellation)
    const defaultPrice = market.marketType === SCALAR ?
      new BigNumber(market.maxPrice, 10)
        .plus(new BigNumber(market.minPrice, 10))
        .dividedBy(TWO)
        .toFixed() :
      '0.5'
    const topOrderPrice = cleanSide === BUY ?
      ((selectTopAsk(marketOrderBook, true) || {}).price || {}).formattedValue || defaultPrice :
      ((selectTopBid(marketOrderBook, true) || {}).price || {}).formattedValue || defaultPrice

    const bignumShares = new BigNumber(numShares || 0, 10)
    const bignumLimit = new BigNumber(limitPrice || 0, 10)
    // clean num shares
    let cleanNumShares = numShares && bignumShares.toFixed() === '0' ? '0' : (numShares && bignumShares.abs().toFixed()) || outcomeTradeInProgress.numShares || '0'

    // if current trade order limitPrice is equal to the best price, make sure it's equal to that otherwise, use what the user has entered
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

    if (cleanNumShares && !cleanLimitPrice && (market.marketType === SCALAR || cleanLimitPrice !== '0')) {
      cleanLimitPrice = topOrderPrice
    }

    // if this isn't a scalar market, limitPrice must be positive.
    if (market.marketType !== SCALAR && limitPrice) {
      cleanLimitPrice = bignumLimit.abs().toFixed() || outcomeTradeInProgress.limitPrice || topOrderPrice
    }

    if (maxCost) {
      // maxCost defined indicates a Market Order
      let sharesAmount = new BigNumber(0, 10)
      let amountLeftToFill = new BigNumber(maxCost, 10)
      let orderLimitPrice = new BigNumber(cleanLimitPrice, 10)
      const normalizedOrderLimitPrice = new BigNumber(augur.trading.normalizePrice({
        minPrice: market.minPrice,
        maxPrice: market.maxPrice,
        price: orderLimitPrice.toString()
      }), 10)
      const orderBookSide = side === BUY ? marketOrderBook[ASKS] : marketOrderBook[BIDS]
      const bignumMarketRange = new BigNumber(market.maxPrice, 10).minus(new BigNumber(market.minPrice, 10))

      for (let i = 0; i < orderBookSide.length; i++) {
        if (amountLeftToFill.eq('0')) {
          break
        }

        let orderAmountTaken = new BigNumber(0)
        let orderSharesTaken = new BigNumber(0)

        const sharesEscrowed = new BigNumber(orderBookSide[i].sharesEscrowed.value, 10)

        const tokensEscrowed = new BigNumber(orderBookSide[i].tokensEscrowed.value, 10)

        const orderPrice = new BigNumber(orderBookSide[i].price.value, 10)

        const normalizedOrderPrice = new BigNumber(augur.trading.normalizePrice({
          minPrice: market.minPrice,
          maxPrice: market.maxPrice,
          price: orderPrice.toString()
        }), 10)
        const normalizedPricePerShare = normalizedOrderPrice.times(bignumMarketRange)

        const orderShares = new BigNumber(orderBookSide[i].shares.value, 10)

        // scalars have a limit to stop at, let's check if we break early
        if (market.marketType === SCALAR) {
          if ((side === BUY && normalizedOrderPrice.gt(normalizedOrderLimitPrice)) || (side === SELL && normalizedOrderPrice.lt(normalizedOrderLimitPrice))) {
            // stop looping, we have hit our limitPrice for this marketOrder
            break
          }
        }

        if (sharesEscrowed.gt('0')) {
          let sharesAffordable = new BigNumber(0)
          let amountToTake = new BigNumber(0)
          const orderSharesLeft = sharesEscrowed
          const sharesLeftScaled = orderSharesLeft.times(bignumMarketRange)

          if (side === BUY) {
            const costOfFullOrder = sharesLeftScaled.times(normalizedPricePerShare)
            const sharesAtAmountFillable = amountLeftToFill.dividedBy(normalizedPricePerShare)
            if (amountLeftToFill.gt(costOfFullOrder)) {
              sharesAffordable = orderSharesLeft
              amountToTake = costOfFullOrder
            } else {
              sharesAffordable = sharesAtAmountFillable
              amountToTake = amountLeftToFill
            }
          }
          if (side === SELL) {
            // if we are selling, we are walking the buy book, cost of shares should be
            const costOfFullOrder = sharesLeftScaled.times((bignumMarketRange.minus(normalizedPricePerShare)))
            const amountOfSharesAffordable = amountLeftToFill.dividedBy((bignumMarketRange.minus(normalizedPricePerShare)))
            if (costOfFullOrder.gt(amountLeftToFill)) {
              sharesAffordable = amountOfSharesAffordable
              amountToTake = amountLeftToFill
            } else {
              sharesAffordable = orderSharesLeft
              amountToTake = costOfFullOrder
            }
          }
          sharesAmount = sharesAmount.plus(sharesAffordable)
          amountLeftToFill = amountLeftToFill.minus(amountToTake)
          orderAmountTaken = orderAmountTaken.plus(amountToTake)
          orderSharesTaken = orderSharesTaken.plus(sharesAffordable)
        }

        if (tokensEscrowed.gt('0')) {
          let sharesAffordable = new BigNumber(0)
          let amountToTake = new BigNumber(0)
          const orderSharesLeft = orderShares.minus(orderSharesTaken)
          const sharesLeftScaled = orderSharesLeft.times(bignumMarketRange)

          if (side === BUY) {
            const costOfFullOrder = sharesLeftScaled.times(normalizedOrderPrice)
            const sharesAtAmountFillable = amountLeftToFill.dividedBy(normalizedPricePerShare)
            if (amountLeftToFill.gt(costOfFullOrder)) {
              sharesAffordable = orderSharesLeft
              amountToTake = costOfFullOrder
            } else {
              sharesAffordable = sharesAtAmountFillable
              amountToTake = amountLeftToFill
            }
          }

          if (side === SELL) {
            const costOfFullOrder = sharesLeftScaled.minus(tokensEscrowed)
            const costPerShare = costOfFullOrder.dividedBy(orderSharesLeft)
            if (amountLeftToFill.gt(costOfFullOrder)) {
              sharesAffordable = orderSharesLeft
              amountToTake = costOfFullOrder
            } else {
              sharesAffordable = amountLeftToFill.dividedBy(costPerShare)
              amountToTake = amountLeftToFill
            }
          }
          // save values
          sharesAmount = sharesAmount.plus(sharesAffordable)
          amountLeftToFill = amountLeftToFill.minus(amountToTake)
          orderAmountTaken = orderAmountTaken.plus(amountToTake)
          orderSharesTaken = orderSharesTaken.plus(sharesAffordable)
        }
        // update limitPrice for simulateTrade
        orderLimitPrice = orderPrice
      }
      // finished all marketOrder calculations, update clean values
      cleanNumShares = sharesAmount.toString()
      cleanLimitPrice = orderLimitPrice.toString()
    }

    const newTradeDetails = {
      side: cleanSide,
      numShares: cleanNumShares === '0' ? undefined : cleanNumShares,
      limitPrice: new BigNumber(cleanLimitPrice, 10).toString(),
      totalFee: '0',
      totalCost: '0'
    }
    // trade actions
    if (newTradeDetails.side && loginAccount.address && !isNaN(newTradeDetails.numShares)) {
      dispatch(loadAccountPositions({ market: marketID }, (err, accountPositions) => {
        if (err) {
          return dispatch({
            type: UPDATE_TRADE_IN_PROGRESS,
            data: { marketID, outcomeID, details: newTradeDetails }
          })
        }
        const cleanAccountPositions = []
        for (let i = 0; i < market.numOutcomes; i++) {
          if (accountPositions[i] && !isNaN(accountPositions[i].numShares)) {
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
        // console.log('simtrade:', simulatedTrade);
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
