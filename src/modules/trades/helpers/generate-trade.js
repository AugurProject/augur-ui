import { createBigNumber } from "utils/create-big-number";
import memoize from "memoizee";
import { formatPercent, formatShares, formatEther } from "utils/format-number";
import {
  calcOrderProfitLossPercents,
  calcOrderShareProfitLoss,
  calculateTotalOrderValue
} from "modules/trades/helpers/calc-order-profit-loss-percents";
import { augur } from "services/augurjs";
import { calculateMaxPossibleShares } from "modules/markets/helpers/calculate-max-possible-shares";
import { BIDS, ASKS } from "modules/orders/constants/orders";
import * as TRANSACTIONS_TYPES from "modules/transactions/constants/types";
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
    const { loginAccount } = store.getState();
    const { settlementFee } = market;
    const side =
      (outcomeTradeInProgress && outcomeTradeInProgress.side) ||
      TRANSACTIONS_TYPES.BUY;
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
          settlementFee
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

    let maxNumShares;
    if (limitPrice != null) {
      const orders = augur.trading.filterAndSortByPrice({
        singleOutcomeOrderBookSide: (orderBooks[outcome.id] || {})[
          side === TRANSACTIONS_TYPES.BUY
            ? TRANSACTIONS_TYPES.SELL
            : TRANSACTIONS_TYPES.BUY
        ],
        orderType: side,
        price: limitPrice,
        userAddress: loginAccount.address
      });
      maxNumShares = formatShares(
        calculateMaxPossibleShares(
          loginAccount,
          orders,
          market.makerFee,
          market.settlementFee,
          market.cumulativeScale,
          market.marketType === "scalar" ? market.minPrice : null
        )
      );
    } else {
      maxNumShares = formatShares(0);
    }

    return {
      side,
      numShares,
      limitPrice,
      maxNumShares,
      sharesFilled,
      totalOrderValue: totalOrderValue ? formatEther(totalOrderValue) : null,
      orderShareProfit: orderShareProfitLoss
        ? formatEther(orderShareProfitLoss.potentialEthProfit)
        : null,
      orderShareTradingFee: orderShareProfitLoss
        ? formatEther(orderShareProfitLoss.tradingFees)
        : null,
      potentialEthProfit: preOrderProfitLoss
        ? formatEther(preOrderProfitLoss.potentialEthProfit)
        : null,
      potentialEthLoss: preOrderProfitLoss
        ? formatEther(preOrderProfitLoss.potentialEthLoss)
        : null,
      potentialLossPercent: preOrderProfitLoss
        ? formatPercent(preOrderProfitLoss.potentialLossPercent)
        : null,
      potentialProfitPercent: preOrderProfitLoss
        ? formatPercent(preOrderProfitLoss.potentialProfitPercent)
        : null,

      tradingFees: preOrderProfitLoss
        ? formatEther(preOrderProfitLoss.tradingFees)
        : null,
      totalFee: formatEther(totalFee, { blankZero: true }),
      totalFeePercent: formatEther(feePercent, { blankZero: true }),
      totalCost: formatEther(totalCost.abs().toFixed(), { blankZero: false }),
      shareCost: formatEther(shareCost.abs().toFixed(), { blankZero: false }), // These are actually shares, but they can be formatted like ETH

      tradeTypeOptions: [
        { label: TRANSACTIONS_TYPES.BUY, value: TRANSACTIONS_TYPES.BUY },
        { label: TRANSACTIONS_TYPES.SELL, value: TRANSACTIONS_TYPES.SELL }
      ],

      totalSharesUpToOrder: (orderIndex, side) =>
        totalSharesUpToOrder(outcome.id, side, orderIndex, orderBooks)
    };
  },
  { max: 5 }
);

const totalSharesUpToOrder = memoize(
  (outcomeId, side, orderIndex, orderBooks) => {
    const { orderCancellation } = store.getState();

    const sideOrders = selectAggregateOrderBook(
      outcomeId,
      orderBooks,
      orderCancellation
    )[side === TRANSACTIONS_TYPES.BUY ? BIDS : ASKS];

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
        type: TRANSACTIONS_TYPES[tradeAction.action],
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
