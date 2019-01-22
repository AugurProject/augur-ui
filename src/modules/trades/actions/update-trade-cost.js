import { createBigNumber } from "utils/create-big-number";
import { augur } from "services/augurjs";
import { BUY } from "modules/transactions/constants/types";
import logError from "utils/log-error";
import { generateTrade } from "modules/trades/helpers/generate-trade";

export const UPDATE_TRADE_IN_PROGRESS = "UPDATE_TRADE_IN_PROGRESS";
export const CLEAR_TRADE_IN_PROGRESS = "CLEAR_TRADE_IN_PROGRESS";

// Updates user's trade. Only defined (i.e. !== null) parameters are updated
export function updateTradeCost({
  marketId,
  outcomeId,
  side,
  numShares,
  limitPrice,
  callback = logError
}) {
  return (dispatch, getState) => {
    if (!side || !numShares || !limitPrice) {
      return callback("side or numShare or limitPrice is not provided");
    }

    const {
      marketsData,
      loginAccount,
      orderBooks,
      outcomesData,
      accountPositions
    } = getState();
    const market = marketsData[marketId];
    const outcome = outcomesData[marketId][outcomeId];

    const newTradeDetails = {
      side,
      numShares,
      limitPrice,
      totalFee: "0",
      totalCost: "0"
    };

    return runSimulateTrade(
      newTradeDetails,
      market,
      marketId,
      outcomeId,
      loginAccount,
      orderBooks,
      outcome,
      accountPositions,
      dispatch,
      callback
    );
  };
}

export function updateTradeShares({
  marketId,
  outcomeId,
  side,
  maxCost,
  limitPrice,
  callback = logError
}) {
  return (dispatch, getState) => {
    if (!side || !maxCost || !limitPrice) {
      return callback("side or numShare or limitPrice is not provided");
    }

    const { marketsData, loginAccount, orderBooks } = getState();
    const market = marketsData[marketId];

    const newTradeDetails = {
      side,
      maxCost,
      limitPrice,
      totalFee: "0",
      totalCost: "0"
    };

    // need to figure out how many shares user can purchase given maxCost

    return runSimulateTrade(
      newTradeDetails,
      market,
      marketId,
      outcomeId,
      loginAccount,
      orderBooks,
      dispatch
    );
  };
}

function runSimulateTrade(
  newTradeDetails,
  market,
  marketId,
  outcomeId,
  loginAccount,
  orderBooks,
  outcome,
  accountPositions,
  dispatch,
  callback
) {
  let userShareBalance = new Array(market.numOutcomes).fill("0");
  const positions = accountPositions[marketId];
  if (positions) {
    userShareBalance = Object.keys(positions).reduce((arr, outcomeId) => {
      const position = positions[outcomeId];
      arr[position.outcome] = position.position;
      return arr;
    }, userShareBalance);
  }

  const simulatedTrade = augur.trading.simulateTrade({
    orderType: newTradeDetails.side === BUY ? 0 : 1,
    outcome: parseInt(outcomeId, 10),
    shareBalances: userShareBalance,
    tokenBalance: (loginAccount.eth && loginAccount.eth.toString()) || "0",
    userAddress: loginAccount.address,
    minPrice: market.minPrice,
    maxPrice: market.maxPrice,
    price: newTradeDetails.limitPrice,
    shares: newTradeDetails.numShares,
    marketCreatorFeeRate: market.marketCreatorFeeRate,
    singleOutcomeOrderBook:
      (orderBooks && orderBooks[marketId] && orderBooks[marketId][outcomeId]) ||
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
  const order = generateTrade(
    market,
    outcome,
    { ...newTradeDetails, ...simulatedTrade },
    orderBooks
  );
  if (callback) callback(null, order);
}
