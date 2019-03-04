import memoize from "memoizee";
import { createBigNumber } from "utils/create-big-number";

import { LONG, SHORT, ZERO } from "modules/common-elements/constants";

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
      currentValue,
      frozenFunds
    } = adjustedPosition;

    // need augur-node to provide realized gains as a percentage.
    const type = createBigNumber(netPosition).gte("0") ? LONG : SHORT;
    const quantity = createBigNumber(netPosition).abs();
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
      totalCost: formatEther(frozenFunds),
      totalValue: formatEther(currentValue),
      lastPrice: formatEther(outcome.price),
      totalReturns: formatEther(total || ZERO),
      totalPercent: formatPercent(totalPercent || ZERO)
    };
  },
  {
    max: 50
  }
);
