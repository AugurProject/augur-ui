export const UPDATE_MARKETS_AT_RISK_SEEN_MODAL =
  "UPDATE_MARKETS_AT_RISK_SEEN_MODAL";

export function setMarketsAtRiskModalAsSeen(flag) {
  return { type: UPDATE_MARKETS_AT_RISK_SEEN_MODAL, flag };
}
