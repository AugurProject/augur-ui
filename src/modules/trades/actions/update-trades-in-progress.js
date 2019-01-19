import { createBigNumber } from "utils/create-big-number";
import { augur } from "services/augurjs";
import { BUY, SELL } from "modules/transactions/constants/types";
import { ZERO, TWO } from "modules/trades/constants/numbers";
import { SCALAR } from "modules/markets/constants/market-types";

import {
  selectAggregateOrderBook,
  selectTopBid,
  selectTopAsk
} from "modules/orders/helpers/select-order-book";
import logError from "utils/log-error";
import { loadUsershareBalances } from "modules/positions/actions/load-user-share-balances";

export const UPDATE_TRADE_IN_PROGRESS = "UPDATE_TRADE_IN_PROGRESS";
export const CLEAR_TRADE_IN_PROGRESS = "CLEAR_TRADE_IN_PROGRESS";

// Updates user's trade. Only defined (i.e. !== null) parameters are updated
export function updateTradesInProgress({
  marketId,
  outcomeId,
  side,
  numShares,
  limitPrice,
  maxCost,
  callback = logError
}) {
  return (dispatch, getState) => {
    const {
      tradesInProgress,
      marketsData,
      loginAccount,
      orderBooks,
      orderCancellation,
      accountPositions
    } = getState();
    const outcomeTradeInProgress =
      (tradesInProgress &&
        tradesInProgress[marketId] &&
        tradesInProgress[marketId][outcomeId]) ||
      {};
    const market = marketsData[marketId];
    // if nothing changed, exit
    if (
      !market ||
      (outcomeTradeInProgress.numShares === numShares &&
        outcomeTradeInProgress.limitPrice === limitPrice &&
        outcomeTradeInProgress.side === side)
    ) {
      return;
    }

    // if new side not provided, use old side
    const cleanSide = side || outcomeTradeInProgress.side;
    if (
      (numShares === "" || parseFloat(numShares) === 0) &&
      limitPrice === null
    ) {
      // numShares cleared
      return dispatch({
        type: UPDATE_TRADE_IN_PROGRESS,
        data: {
          marketId,
          outcomeId,
          details: {
            side: cleanSide,
            numShares: "",
            limitPrice: ""
          }
        }
      });
    }
    if (
      limitPrice === "" ||
      limitPrice === null ||
      (parseFloat(limitPrice) === 0 && market.marketType !== SCALAR)
    ) {
      // limitPrice cleared
      return dispatch({
        type: UPDATE_TRADE_IN_PROGRESS,
        data: {
          marketId,
          outcomeId,
          details: {
            side: cleanSide,
            limitPrice: outcomeTradeInProgress.limitPrice,
            numShares: outcomeTradeInProgress.numShares
          }
        }
      });
    }
    // need to calculate shares based on maxCost and price and user existing position
    if (
      limitPrice !== "" &&
      limitPrice !== null &&
      (numShares === "" || numShares === null) &&
      (maxCost !== "" || maxCost !== null)
    ) {
      const cleanSide = side || outcomeTradeInProgress.side;
      const newTradeDetails = {
        side: cleanSide,
        numShares,
        limitPrice,
        totalFee: "0",
        totalCost: "0"
      };
      // calculate num shares
      const marketRange = createBigNumber(market.maxPrice)
        .minus(market.minPrice)
        .abs();
      const bnPrice = createBigNumber(limitPrice);
      const price =
        cleanSide === BUY
          ? bnPrice.minus(market.minPrice).dividedBy(marketRange)
          : createBigNumber(market.maxPrice)
              .minus(bnPrice)
              .dividedBy(marketRange);

      let newShares = createBigNumber(maxCost).dividedBy(price);

      const marketPosition = accountPositions[marketId];
      if (marketPosition && marketPosition[outcomeId]) {
        // How many shares user can buy with totalCost/maxCost amount
        // don't think this can be figured out here.
        const position = marketPosition[outcomeId];
        const netPosition = createBigNumber(position.netPosition);
        if (side === BUY) {
          if (netPosition.lt(ZERO)) {
            newShares = newShares.plus(netPosition.abs());
          }
        } else if (netPosition.gt(ZERO)) {
          newShares = newShares.plus(netPosition);
        }
      }
      newTradeDetails.numShares = newShares.toFixed();

      return runSimulateTrade(
        newTradeDetails,
        market,
        outcomeId,
        loginAccount,
        orderBooks,
        dispatch
      );
    }

    // find top order to default limit price to
    const marketOrderBook = selectAggregateOrderBook(
      outcomeId,
      orderBooks[marketId],
      orderCancellation
    );
    const defaultPrice =
      market.marketType === SCALAR
        ? createBigNumber(market.maxPrice, 10)
            .plus(createBigNumber(market.minPrice, 10))
            .dividedBy(TWO)
            .toFixed()
        : "0.5";
    // get topOrderPrice and make sure it's a string value
    const topOrderPrice = createBigNumber(
      cleanSide === BUY
        ? ((selectTopAsk(marketOrderBook, true) || {}).price || {})
            .formattedValue || defaultPrice
        : ((selectTopBid(marketOrderBook, true) || {}).price || {})
            .formattedValue || defaultPrice
    ).toFixed();

    const bignumShares = createBigNumber(numShares || "0", 10);
    const bignumLimit = createBigNumber(limitPrice || "0", 10);
    // clean num shares
    const cleanNumShares =
      numShares && bignumShares.toFixed() === "0"
        ? "0"
        : (numShares && bignumShares.abs().toFixed()) ||
          outcomeTradeInProgress.numShares ||
          "0";

    // if current trade order limitPrice is equal to the best price, make sure it's equal to that; otherwise, use what the user has entered
    let cleanLimitPrice;
    const topAskPrice =
      ((selectTopAsk(marketOrderBook, true) || {}).price || {})
        .formattedValue || defaultPrice;
    const topBidPrice =
      ((selectTopBid(marketOrderBook, true) || {}).price || {})
        .formattedValue || defaultPrice;

    if (limitPrice && bignumLimit.toFixed() === "0") {
      cleanLimitPrice = "0";
    } else if (limitPrice && bignumLimit.toFixed()) {
      cleanLimitPrice = bignumLimit.toFixed();
    } else if (
      cleanSide === BUY &&
      outcomeTradeInProgress.limitPrice === topBidPrice
    ) {
      cleanLimitPrice = topAskPrice;
    } else if (
      cleanSide === SELL &&
      outcomeTradeInProgress.limitPrice === topAskPrice
    ) {
      cleanLimitPrice = topBidPrice;
    } else {
      cleanLimitPrice = outcomeTradeInProgress.limitPrice;
    }

    if (
      cleanNumShares &&
      !cleanLimitPrice &&
      (market.marketType === SCALAR || cleanLimitPrice !== "0")
    ) {
      cleanLimitPrice = topOrderPrice;
    }

    // if this isn't a scalar market, limitPrice must be positive.
    if (market.marketType !== SCALAR && limitPrice) {
      cleanLimitPrice =
        bignumLimit.abs().toFixed() ||
        outcomeTradeInProgress.limitPrice ||
        topOrderPrice;
    }

    const newTradeDetails = {
      side: cleanSide,
      numShares: cleanNumShares === "0" ? undefined : cleanNumShares,
      limitPrice: cleanLimitPrice,
      totalFee: "0",
      totalCost: "0"
    };

    // trade actions
    if (
      newTradeDetails.side &&
      newTradeDetails.numShares &&
      loginAccount.address
    ) {
      return runSimulateTrade(
        newTradeDetails,
        market,
        outcomeId,
        loginAccount,
        orderBooks,
        dispatch
      );
    }
    dispatch({
      type: UPDATE_TRADE_IN_PROGRESS,
      data: { marketId, outcomeId, details: newTradeDetails }
    });
    callback(null);
  };
}

function runSimulateTrade(
  newTradeDetails,
  market,
  outcomeId,
  loginAccount,
  orderBooks,
  dispatch,
  callback
) {
  const { id: marketId } = market;
  dispatch(
    loadUsershareBalances(
      { market: market.id },
      (err, userShareBalances = []) => {
        if (err) {
          return dispatch({
            type: UPDATE_TRADE_IN_PROGRESS,
            data: { marketId, outcomeId, details: newTradeDetails }
          });
        }

        const paddedArray = new Array(
          market.numOutcomes - userShareBalances.length
        ).fill("0");
        const paddedUserShareBalances = userShareBalances.concat(paddedArray);
        const simulatedTrade = augur.trading.simulateTrade({
          orderType: newTradeDetails.side === BUY ? 0 : 1,
          outcome: parseInt(outcomeId, 10),
          shareBalances: paddedUserShareBalances,
          tokenBalance:
            (loginAccount.eth && loginAccount.eth.toString()) || "0",
          userAddress: loginAccount.address,
          minPrice: market.minPrice,
          maxPrice: market.maxPrice,
          price: newTradeDetails.limitPrice,
          shares: newTradeDetails.numShares,
          marketCreatorFeeRate: market.marketCreatorFeeRate,
          singleOutcomeOrderBook:
            (orderBooks &&
              orderBooks[marketId] &&
              orderBooks[marketId][outcomeId]) ||
            {},
          shouldCollectReportingFees: !market.isDisowned,
          reportingFeeRate: market.reportingFeeRate
        });
        const totalFee = createBigNumber(simulatedTrade.settlementFees, 10);
        newTradeDetails.totalFee = totalFee.toFixed();
        newTradeDetails.totalCost = simulatedTrade.tokensDepleted;
        newTradeDetails.shareCost = Number(simulatedTrade.sharesDepleted)
          ? simulatedTrade.sharesDepleted
          : simulatedTrade.otherSharesDepleted;
        newTradeDetails.feePercent = totalFee
          .dividedBy(createBigNumber(simulatedTrade.tokensDepleted, 10))
          .toFixed();
        if (isNaN(newTradeDetails.feePercent)) newTradeDetails.feePercent = "0";
        dispatch({
          type: UPDATE_TRADE_IN_PROGRESS,
          data: {
            marketId,
            outcomeId,
            details: {
              ...newTradeDetails,
              ...simulatedTrade,
              tradeGroupId: augur.trading.generateTradeGroupId()
            }
          }
        });
        if (callback) callback(null, { ...newTradeDetails, ...simulatedTrade });
      }
    )
  );
}

export function clearTradeInProgress(marketId) {
  return { type: CLEAR_TRADE_IN_PROGRESS, data: { marketId } };
}
