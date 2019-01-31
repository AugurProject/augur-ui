import { createBigNumber } from "utils/create-big-number";
import { augur } from "services/augurjs";
import { BUY } from "modules/transactions/constants/types";
import logError from "utils/log-error";
import { generateTrade } from "modules/trades/helpers/generate-trade";
import { ZERO } from "modules/trades/constants/numbers";

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

    const {
      marketsData,
      loginAccount,
      outcomesData,
      accountPositions,
      orderBooks
    } = getState();
    const market = marketsData[marketId];

    const newTradeDetails = {
      side,
      maxCost,
      limitPrice,
      totalFee: "0",
      totalCost: "0"
    };

    /*
    market -5 => 10
    Ultimate values we want: quantity 10, price 0, maxCost 50/100 (long/short)

    Range = Max - Min = 10 - -5 = 15
    scaledPrice = price + abs(min) = 0 + [-5] = 5

    Find MaxCost:
    quantity * scaledPrice = MaxCostLong => 10 * 5 = 50
    (Range * quantity) - MaxCostLong = maxCostShort => (15 * 10) - 50 = 100

    Find Quantity:
    MaxCostLong / scaledPrice = quantityLong => 50 / 5 = 10
    MaxCostShort /(range - scaledPrice) = quantityShort => 100 / (15 - 5) = 10
    */

    // calculate num shares
    const marketMaxPrice = createBigNumber(market.maxPrice);
    const marketMinPrice = createBigNumber(market.minPrice);
    const marketRange = marketMaxPrice.minus(market.minPrice);
    const scaledPrice = createBigNumber(limitPrice).plus(marketMinPrice.abs());

    let newShares = createBigNumber(maxCost).dividedBy(
      marketRange.minus(scaledPrice)
    );
    if (side === BUY) {
      newShares = createBigNumber(maxCost).dividedBy(scaledPrice);
    }
    /*
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
    */
    newTradeDetails.numShares = newShares.abs().toFixed(9);
    const outcome = outcomesData[marketId][outcomeId];

    return runSimulateTrade(
      newTradeDetails,
      market,
      marketId,
      outcomeId,
      loginAccount,
      orderBooks,
      outcome,
      accountPositions,
      callback
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
  callback
) {
  let userShareBalance = new Array(market.numOutcomes).fill("0");
  let sharesFilledAvgPrice = "";
  const positions = accountPositions[marketId];
  if (positions) {
    userShareBalance = Object.keys(positions).reduce((arr, outcomeId) => {
      const position = positions[outcomeId];
      arr[position.outcome] = position.position;
      return arr;
    }, userShareBalance);
    sharesFilledAvgPrice = (positions[outcomeId] || {}).averagePrice;
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
  simulatedTrade.tradeGroupId = augur.trading.generateTradeGroupId();

  const order = generateTrade(
    market,
    outcome,
    { ...newTradeDetails, ...simulatedTrade, sharesFilledAvgPrice },
    orderBooks
  );
  if (callback) callback(null, { ...order, ...simulatedTrade });
}
