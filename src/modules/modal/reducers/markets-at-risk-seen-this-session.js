import { UPDATE_MARKETS_AT_RISK_SEEN_MODAL } from "modules/modal/actions/update-markets-at-risk-seen-modal";
import { CLEAR_LOGIN_ACCOUNT } from "modules/auth/actions/update-login-account";
import { RESET_STATE } from "modules/app/actions/reset-state";

const DEFAULT_STATE = false;

export default function(
  marketsAtRiskModalSeenThisSession = DEFAULT_STATE,
  { type, flag }
) {
  switch (type) {
    case UPDATE_MARKETS_AT_RISK_SEEN_MODAL:
      return flag;
    case RESET_STATE:
    case CLEAR_LOGIN_ACCOUNT:
      return DEFAULT_STATE;
    default:
      return marketsAtRiskModalSeenThisSession;
  }
}
