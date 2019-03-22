import { createBigNumber } from "utils/create-big-number";
import memoize from "memoizee";
import { formatPercent, formatShares, formatEther } from "utils/format-number";
import {
  calcOrderProfitLossPercents,
  calcOrderShareProfitLoss,
  calculateTotalOrderValue
} from "modules/trades/helpers/calc-order-profit-loss-percents";
import * as constants from "modules/common-elements/constants";
import { selectAggregateOrderBook } from "modules/orders/helpers/select-order-book";
import store from "src/store";

/**
 * @param {Object} market
 * @param {Object} outcome
 * @param {Object} outcomeTradeInProgress
 * @param {Object} loginAccount
 * @param {Object} orderBooks Orders for market
 */
export const generateTrade = memoize(
  (market, outcome, outcomeTradeInProgress, orderBooks) => {
    const { settlementFee } = market;
    const side =
      (outcomeTradeInProgress && outcomeTradeInProgress.side) || constants.BUY;
    const numShares =
      (outcomeTradeInProgress && outcomeTradeInProgress.numShares) || null;
    const sharesFilled =
      (outcomeTradeInProgress && outcomeTradeInProgress.sharesFilled) || null;
    const sharesFilledAvgPrice =
      (outcomeTradeInProgress && outcomeTradeInProgress.sharesFilledAvgPrice) ||
      null;
    const limitPrice =
      (outcomeTradeInProgress && outcomeTradeInProgress.limitPrice) || null;
    const totalFee = createBigNumber(
      (outcomeTradeInProgress && outcomeTradeInProgress.totalFee) || "0",
      10
    );
    const feePercent =
      (outcomeTradeInProgress && outcomeTradeInProgress.feePercent) || "0";
    const totalCost = createBigNumber(
      (outcomeTradeInProgress && outcomeTradeInProgress.totalCost) || "0",
      10
    );
    const shareCost = createBigNumber(
      (outcomeTradeInProgress && outcomeTradeInProgress.shareCost) || "0",
      10
    );
    const marketType = (market && market.marketType) || null;
    const minPrice = createBigNumber(market.minPrice);
    const maxPrice = createBigNumber(market.maxPrice);

    const orderShareProfitLoss = shareCost.gt(0)
      ? calcOrderShareProfitLoss(
          limitPrice,
          side,
          minPrice,
          maxPrice,
          marketType,
          shareCost,
          sharesFilledAvgPrice,
          settlementFee,
          outcomeTradeInProgress.reversal
        )
      : null;

    const preOrderProfitLoss = calcOrderProfitLossPercents(
      shareCost.gt(0) && numShares
        ? createBigNumber(numShares)
            .minus(shareCost)
            .toFixed(9)
        : numShares,
      limitPrice,
      side,
      minPrice,
      maxPrice,
      marketType,
      settlementFee
    );

    const totalOrderValue = calculateTotalOrderValue(
      numShares,
      limitPrice,
      side,
      minPrice,
      maxPrice,
      marketType
    );

    return {
      side,
      numShares,
      limitPrice,
      sharesFilled,
      totalOrderValue: totalOrderValue
        ? formatEtherValue(totalOrderValue)
        : null,
      orderShareProfit: orderShareProfitLoss
        ? formatEtherValue(orderShareProfitLoss.potentialEthProfit)
        : null,
      orderShareTradingFee: orderShareProfitLoss
        ? formatEtherValue(orderShareProfitLoss.tradingFees)
        : null,
      potentialEthProfit: preOrderProfitLoss
        ? formatEtherValue(preOrderProfitLoss.potentialEthProfit)
        : null,
      potentialEthLoss: preOrderProfitLoss
        ? formatEtherValue(preOrderProfitLoss.potentialEthLoss)
        : null,
      potentialLossPercent: preOrderProfitLoss
        ? formatEtherValue(preOrderProfitLoss.potentialLossPercent)
        : null,
      potentialProfitPercent: preOrderProfitLoss
        ? formatEtherValue(preOrderProfitLoss.potentialProfitPercent)
        : null,

      tradingFees: preOrderProfitLoss
        ? formatEtherValue(preOrderProfitLoss.tradingFees)
        : null,
      totalFee: formatEtherValue(totalFee, { blankZero: true }),
      totalFeePercent: formatEtherValue(feePercent, { blankZero: true }),
      totalCost: formatEtherValue(totalCost.abs().toFixed(), {
        blankZero: false
      }),
      shareCost: formatEtherValue(shareCost.abs().toFixed(), {
        blankZero: false
      }), // These are actually shares, but they can be formatted like ETH

      tradeTypeOptions: [
        { label: constants.BUY, value: constants.BUY },
        { label: constants.SELL, value: constants.SELL }
      ],

      totalSharesUpToOrder: (orderIndex, side) =>
        totalSharesUpToOrder(outcome.id, side, orderIndex, orderBooks)
    };
  },
  { max: 5 }
);

const formatEtherValue = (value, options = {}) =>
  formatEther(
    value,
    Object.assign(
      { decimalsRounded: constants.UPPER_FIXED_PRECISION_BOUND },
      options
    )
  );

const totalSharesUpToOrder = memoize(
  (outcomeId, side, orderIndex, orderBooks) => {
    const { orderCancellation } = store.getState();

    const sideOrders = selectAggregateOrderBook(
      outcomeId,
      orderBooks,
      orderCancellation
    )[side === constants.BUY ? constants.BIDS : constants.ASKS];

    return sideOrders
      .filter((order, i) => i <= orderIndex)
      .reduce((p, order) => p + order.shares.value, 0);
  },
  { max: 5 }
);

export const generateTradeOrders = memoize(
  (market, outcome, outcomeTradeInProgress) => {
    const tradeActions =
      outcomeTradeInProgress && outcomeTradeInProgress.tradeActions;
    if (
      !market ||
      !outcome ||
      !outcomeTradeInProgress ||
      !tradeActions ||
      !tradeActions.length
    ) {
      return [];
    }
    const { description, marketType, id: marketId } = market;
    const { id: outcomeId, name: outcomeName } = outcome;
    return tradeActions.map(tradeAction => {
      const numShares = createBigNumber(tradeAction.shares, 10);
      const costEth = createBigNumber(tradeAction.costEth, 10).abs();
      const avgPrice = createBigNumber(costEth, 10).dividedBy(
        createBigNumber(numShares, 10)
      );
      const noFeePrice =
        marketType === "scalar"
          ? outcomeTradeInProgress.limitPrice
          : tradeAction.noFeePrice;
      return {
        type: constants[tradeAction.action],
        data: {
          marketId,
          outcomeId,
          marketType,
          outcomeName
        },
        description,
        numShares: formatShares(tradeAction.shares),
        avgPrice: formatEther(avgPrice),
        noFeePrice: formatEther(noFeePrice),
        tradingFees: formatEther(tradeAction.feeEth),
        feePercent: formatPercent(tradeAction.feePercent)
      };
    });
  },
  { max: 5 }
);
