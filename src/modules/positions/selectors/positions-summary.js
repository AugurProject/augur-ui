import memoize from "memoizee";
import { createBigNumber } from "utils/create-big-number";

import { LONG, SHORT } from "modules/common-elements/constants";

import { formatEther, formatShares } from "utils/format-number";

export const generateOutcomePositionSummary = memoize(
  (adjustedPosition, maxPrice, outcome) => {
    if (!adjustedPosition) {
      return null;
    }
    const {
      netPosition,
      position,
      realized,
      unrealized,
      averagePrice,
      marketId,
      outcome: outcomeId,
      total
    } = adjustedPosition;

    const type = createBigNumber(netPosition).gte("0") ? LONG : SHORT;
    const quantity = createBigNumber(netPosition).abs();
    let totalCost = createBigNumber(position)
      .times(createBigNumber(averagePrice))
      .abs()
      .toString();
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
      totalReturns: formatEther(total)
    };
  },
  {
    max: 50
  }
);
