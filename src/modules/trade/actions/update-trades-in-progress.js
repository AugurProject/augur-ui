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
      let amountFilledSoFar = new BigNumber(0, 10)
      let orderLimitPrice = new BigNumber(cleanLimitPrice, 10)
      const normalizedOrderLimitPrice =  new BigNumber(augur.trading.normalizePrice({
        minPrice: market.minPrice,
        maxPrice: market.maxPrice,
        price: orderLimitPrice.toString()
      }), 10)
      const orderBookSide = side === BUY ? marketOrderBook[ASKS] : marketOrderBook[BIDS]
      const bignumMarketRange = new BigNumber(market.maxPrice, 10).minus(new BigNumber(market.minPrice, 10))

      console.log('sharesAmount', sharesAmount.toString(), 'Shares')
      console.log('amountLeftToFill', amountLeftToFill.toString(), 'ETH Tokens')
      console.log('orderLimitPrice', orderLimitPrice.toString(), 'ETH Tokens')
      console.log('normalizedOrderLimitPrice', normalizedOrderLimitPrice.toString(), 'ETH Tokens');
      console.log('maxCost:', maxCost, 'ETH Tokens')
      console.log('marketMinMax', market.minPrice, market.maxPrice, market.numTicks, market.tickSize);
      console.log('bignumMarketRange:', bignumMarketRange.toString());
      console.log('This is a', side, 'Order')

      for (let i = 0; i < orderBookSide.length; i++) {
        amountFilledSoFar = new BigNumber(maxCost, 10).minus(amountLeftToFill)
        console.log('                                       ');
        console.log('inLoop', i)
        console.log('amountLeftToFill', amountLeftToFill.toString(), 'ETH Tokens')
        console.log('amountFilledSoFar', amountFilledSoFar.toString(), 'ETH Tokens');

        console.log(orderBookSide[i].shares.full, orderBookSide[i].price.full);
        console.log('escrowed:', orderBookSide[i].sharesEscrowed.full, orderBookSide[i].tokensEscrowed.full);

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
            break;
          }
        }

        // update limitPrice for simulateTrade
        orderLimitPrice = orderPrice

        if (sharesEscrowed.gt('0')) {
          console.log('****sharesEscrowed', sharesEscrowed.toString());
          // order has shares to take
          const amountOfSharesFillableAtPrice = amountLeftToFill.dividedBy(normalizedPricePerShare)

          const sharesFillableAtPriceLessOrderMax = amountOfSharesFillableAtPrice.minus(orderShares)

          const amountOfShares = sharesFillableAtPriceLessOrderMax.lte(0) ? amountOfSharesFillableAtPrice : orderShares

          const amountOfTokens = normalizedPricePerShare.times(amountOfShares)
          console.log('amountOfSharesFillableAtPrice', amountOfSharesFillableAtPrice.toString());
          console.log('sharesFillableAtPriceLessOrderMax', sharesFillableAtPriceLessOrderMax.toString());
          console.log('amountOfShares', amountOfShares.toString());
          console.log('amountOfTokens', amountOfTokens.toString());
          sharesAmount = sharesAmount.plus(amountOfShares)
          amountLeftToFill = amountLeftToFill.minus(amountOfTokens)
          orderAmountTaken = orderAmountTaken.plus(amountOfTokens)
          orderSharesTaken = orderSharesTaken.plus(amountOfShares)
          console.log('exiting Shares');
          console.log('sharesAmount', sharesAmount.toString());
          console.log('amountLeftToFill', amountLeftToFill.toString());
          console.log('orderAmountTaken', orderAmountTaken.toString());
          console.log('orderSharesTaken', orderSharesTaken.toString());
        }

        if (tokensEscrowed.gt('0')) {
          console.log('*****TokensEscrowed', tokensEscrowed.toString());
          const orderSharesLeft = orderShares.minus(orderSharesTaken)
          if (amountLeftToFill.gte(tokensEscrowed)) {
            sharesAmount = sharesAmount.plus(orderSharesLeft)
            amountLeftToFill = amountLeftToFill.minus(tokensEscrowed)
            orderAmountTaken = orderAmountTaken.plus(tokensEscrowed)
            orderSharesTaken = orderSharesTaken.plus(orderSharesLeft)
            console.log('exiting Tokens First IF');
            console.log('sharesAmount', sharesAmount.toString());
            console.log('amountLeftToFill', amountLeftToFill.toString());
            console.log('orderAmountTaken', orderAmountTaken.toString());
            console.log('orderSharesTaken', orderSharesTaken.toString());
          } else {
            const sharesNotFilled = (tokensEscrowed.minus(amountLeftToFill)).dividedBy(normalizedOrderPrice)

            const sharesAffordable = orderSharesLeft.minus(sharesNotFilled)
            const amountToTake = amountLeftToFill
            console.log('                       ');
            console.log('in Tokens else');
            console.log('orderSharesLeft', orderSharesLeft.toString());
            console.log('amountToTake', amountToTake.toString());
            console.log('sharesNotFilled', sharesNotFilled.toString());
            console.log('sharesAffordable', sharesAffordable.toString());
            console.log('                       ');
            sharesAmount = sharesAmount.plus(sharesAffordable)
            amountLeftToFill = amountLeftToFill.minus(amountToTake)
            orderAmountTaken = orderAmountTaken.plus(amountToTake)
            orderSharesTaken = orderSharesTaken.plus(sharesAffordable)
            console.log('exiting Tokens Second IF');
            console.log('sharesAmount', sharesAmount.toString());
            console.log('amountLeftToFill', amountLeftToFill.toString());
            console.log('orderAmountTaken', orderAmountTaken.toString());
            console.log('orderSharesTaken', orderSharesTaken.toString());
          }
        }
      }
      console.log('setting cleanNumShares and limitPrice');
      cleanNumShares = sharesAmount.toString()
      cleanLimitPrice = orderLimitPrice.toString()
      console.log(cleanNumShares, cleanLimitPrice);
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
        console.log({
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
        console.log('callingBack:')
        console.log({ ...newTradeDetails, ...simulatedTrade })
        callback(null, { ...newTradeDetails, ...simulatedTrade })
      }))
    } else {
      console.log('else dispatching')
      console.log(newTradeDetails)
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
