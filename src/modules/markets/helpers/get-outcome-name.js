import {
  SCALAR,
  YES_NO,
  YES_NO_YES_OUTCOME_NAME
} from "modules/common-elements/constants";

export default function getOutcomeName(market, outcomeId) {
  const { outcomes, marketType, scalarDenomination } = market;

  const outcomeInfo =
    outcomes && outcomes.find(outcomeValue => outcomeValue.id === outcomeId);

  let outcomeName = outcomeInfo && outcomeInfo.description;
  if (marketType === YES_NO) {
    outcomeName = YES_NO_YES_OUTCOME_NAME;
  }
  if (marketType === SCALAR) {
    outcomeName = scalarDenomination;
  }

  return outcomeName;
}
