import memoize from "memoizee";
import { createBigNumber } from "utils/create-big-number";

import { LONG, SHORT } from "modules/common-elements/constants";

import { formatEther, formatShares, formatNumber } from "utils/format-number";

export const generateOutcomePositionSummary = memoize(
  adjustedPosition => {
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
      frozenFunds
    } = adjustedPosition;
    return {
      marketId,
      outcomeId,
      ...generatePositionsSummary(
        1,
        netPosition,
        position,
        averagePrice,
        realized,
        unrealized,
        frozenFunds
      )
    };
  },
  {
    max: 50
  }
);

const generatePositionsSummary = memoize(
  (
    numPositions,
    netPosition,
    position,
    meanTradePrice,
    realizedNet,
    unrealizedNet,
    totalNet,
    frozenFunds
  ) => ({
    numPositions: formatNumber(numPositions, {
      decimals: 0,
      decimalsRounded: 0,
      denomination: "Positions",
      positiveSign: false,
      zeroStyled: false
    }),
    type: createBigNumber(netPosition).gt("0") ? LONG : SHORT,
    netPosition: formatShares(netPosition),
    position: formatShares(position),
    purchasePrice: formatEther(meanTradePrice),
    realizedNet: formatEther(realizedNet),
    unrealizedNet: formatEther(unrealizedNet),
    totalNet: formatEther(totalNet),
    totalReturns: formatEther(
      createBigNumber(unrealizedNet).plus(createBigNumber(realizedNet))
    ),
    totalCost: formatEther(frozenFunds)
  }),
  {
    max: 20
  }
);
