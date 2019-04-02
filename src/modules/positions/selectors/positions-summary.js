import memoize from "memoizee";
import { createBigNumber } from "utils/create-big-number";

import { LONG, SHORT, ZERO, CLOSED } from "modules/common-elements/constants";
import { formatEther, formatShares, formatPercent } from "utils/format-number";

export const positionSummary = memoize(
  (adjustedPosition, outcome) => {
    if (!adjustedPosition) {
      return null;
    }
    const {
      netPosition,
      realized,
      realizedPercent,
      unrealized,
      unrealizedPercent,
      averagePrice,
      marketId,
      outcome: outcomeId,
      total,
      totalPercent,
      unrealizedRevenue,
      totalCost
    } = adjustedPosition;

    const quantity = createBigNumber(netPosition).abs();
    let type = createBigNumber(netPosition).gte("0") ? LONG : SHORT;
    if (
      createBigNumber(quantity).isEqualTo(ZERO) &&
      createBigNumber(averagePrice).isEqualTo(ZERO)
    ) {
      type = CLOSED;
    }

    return {
      marketId,
      outcomeId,
      type,
      quantity: formatShares(quantity),
      purchasePrice: formatEther(averagePrice),
      realizedNet: formatEther(realized),
      unrealizedNet: formatEther(unrealized),
      realizedPercent: formatPercent(realizedPercent || ZERO),
      unrealizedPercent: formatPercent(unrealizedPercent || ZERO),
      totalCost: formatEther(totalCost),
      totalValue: formatEther(unrealizedRevenue),
      lastPrice: formatEther(outcome.price),
      totalReturns: formatEther(total || ZERO),
      totalPercent: formatPercent(totalPercent || ZERO),
      valueChange: formatPercent(ZERO, { decimalsRounded: 2 })
    };
  },
  {
    max: 50
  }
);
