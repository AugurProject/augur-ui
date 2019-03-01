import { createBigNumber } from "utils/create-big-number";
import { ZERO } from "modules/common-elements/constants";
import { BUY } from "modules/common-elements/constants";

export const buildDisplayTrade = trade => {
  const {
    userNetPositions,
    userShareBalance,
    outcomeId,
    numShares,
    side,
    shareBalances
  } = trade;

  const outcomeIndex = parseInt(outcomeId, 10);
  const equalArrays = areEqual(userShareBalance, userNetPositions);

  if (
    buyingAllOutcomes(
      userShareBalance,
      outcomeIndex,
      numShares,
      shareBalances,
      side
    )
  ) {
    // using totalCost at "1", so trading confirm form shows new position
    return { ...trade, shareCost: "0", totalCost: "1" };
  }

  const mirror = sum(userShareBalance, userNetPositions);
  if (!Array.isArray(mirror)) return trade;

  const summationToZero = mirror
    .reduce((p, i) => createBigNumber(p).plus(createBigNumber(i)), ZERO)
    .isEqualTo(ZERO);

  // if summation is zero then synthetics and onChain mirrored and no special logic is needed
  // if synthetics and onChain are the same no special logic is needed
  if (summationToZero || equalArrays) return trade;
  if (side === BUY) return trade;

  return { ...trade, shareCost: "0", totalCost: "1" };
};

const sum = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  const result = [];
  arr1.forEach((value, i) => {
    result[i] = createBigNumber(value).plus(createBigNumber(arr2[i]));
  });
  return result;
};

const areEqual = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  let result = true;
  arr1.forEach((value, i) => {
    if (value !== arr2[i]) {
      result = false;
    }
  });
  return result;
};

/**
Detect that user is closing out position by buying last outcomes.
Meaning they already own all other outcomes
 */
const buyingAllOutcomes = (
  userShareBalance,
  outcomeIndex,
  numShares,
  shareBalances,
  side
) => {
  if (side !== BUY) return false;
  // check if user is selling shares when buying all outcomes
  const modUserShareBalance = [...userShareBalance];
  // add resulting buy shares for comparison of resulting shareBalance
  modUserShareBalance[outcomeIndex] = numShares;

  const minValue = Math.min(...modUserShareBalance);
  if (createBigNumber(minValue).isEqualTo(ZERO)) return false;
  // see if min value is deducted from all other outcome than current outcome buy is on
  const resulting = modUserShareBalance.map(value =>
    createBigNumber(value)
      .minus(minValue)
      .toString()
  );
  return areEqual(resulting, shareBalances);
};
