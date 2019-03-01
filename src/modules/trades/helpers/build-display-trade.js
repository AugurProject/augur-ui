import { createBigNumber } from "utils/create-big-number";
import { ZERO } from "modules/common-elements/constants";

export const buildDisplayTrade = trade => {
  const { userNetPositions, userShareBalance, outcomeId, numShares } = trade;

  const mirror = sum(userShareBalance, userNetPositions);
  if (!Array.isArray(mirror)) return trade;

  const summation = mirror.reduce((p, i) =>
    createBigNumber(p).plus(createBigNumber(i))
  );

  const equalArrays = areEqual(userShareBalance, userNetPositions);
  if (summation.isEqualTo(ZERO) || equalArrays) return trade;

  const bnNumShares = createBigNumber(numShares);
  const netPosition = createBigNumber(
    userNetPositions[parseInt(outcomeId, 10)]
  );
  console.log("arrays are not equal");
  // here is where we subtract values
  const newShareCost = bnNumShares.gte(netPosition)
    ? netPosition
    : bnNumShares.minus(netPosition);

  return {
    ...trade,
    shareCost: newShareCost
  };
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
