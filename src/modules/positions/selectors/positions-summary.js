import memoize from "memoizee";
import { createBigNumber } from "utils/create-big-number";

import { LONG, SHORT, ZERO } from "modules/common-elements/constants";

import { formatEther, formatShares, formatPercent } from "utils/format-number";

export const generateOutcomePositionSummary = memoize(
  (adjustedPosition, maxPrice, outcome) => {
    if (!adjustedPosition) {
      return null;
    }
    const {
      netPosition,
      realized,
      unrealized,
      averagePrice,
      marketId,
      outcome: outcomeId,
      total
    } = adjustedPosition;

    const totalReturns = total || 0;
    const type = createBigNumber(netPosition).gte("0") ? LONG : SHORT;
    const quantity = createBigNumber(netPosition).abs();
    let totalCost = createBigNumber(quantity)
      .times(createBigNumber(averagePrice))
      .abs();

    let totalValue = createBigNumber(quantity).times(outcome.price);
    if (type === SHORT) {
      totalCost = createBigNumber(maxPrice)
        .minus(averagePrice)
        .times(createBigNumber(quantity))
        .abs();

      totalValue = createBigNumber(maxPrice)
        .minus(outcome.price)
        .times(quantity)
        .abs();
    }
    const totalReturnsPercent =
      totalReturns === 0
        ? ZERO
        : createBigNumber(total)
            .dividedBy(averagePrice)
            .times(100);

    return {
      marketId,
      outcomeId,
      type,
      quantity: formatShares(quantity),
      purchasePrice: formatEther(averagePrice),
      realizedNet: formatEther(realized),
      unrealizedNet: formatEther(unrealized),
      totalCost: formatEther(totalCost),
      totalValue: formatEther(totalValue),
      lastPrice: formatEther(outcome.price),
      totalReturns: formatEther(total),
      totalReturnsPercent: formatPercent(totalReturnsPercent)
    };
  },
  {
    max: 50
  }
);
