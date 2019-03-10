import { YES_NO, CATEGORICAL, YES_NO_YES_OUTCOME_NAME } from "modules/common-elements/constants";

export function getOutcome(
  market,
  outcome,
  alwaysReturnYesForBinaryMarket = true
) {
  let value = null;
  if (!market || isNaN(outcome)) return outcome;
  if (market.marketType === YES_NO) {
    value = "Yes";
    if (!alwaysReturnYesForBinaryMarket && outcome.toString() === "0") {
      value = "No";
    }
  } else if (market.marketType === CATEGORICAL) {
    value = market.outcomes[outcome] && market.outcomes[outcome].description;
  } else {
    value = outcome;
  }
  return value;
}

export const getOutcomeName = (market, outcome) => {
  let outcomeName = market.isYesNo
    ? YES_NO_YES_OUTCOME_NAME
    : outcome.description || "N/A";
  if (market.isScalar) {
    outcomeName = market.scalarDenomination || "N/A";
  }
  return outcomeName;
};
