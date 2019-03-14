import { connect } from "react-redux";

import OverviewFunds from "modules/account/components/overview-funds/overview-funds";
import { formatAttoRep } from "utils/format-number";
import { selectLoginAccount } from "modules/auth/selectors/login-account";
import { selectLoginAccountState } from "select-state";

const mapStateToProps = (state: any) => {
  const loginAccount = selectLoginAccount(state);
  const { totalFrozenFunds } = selectLoginAccountState(state) || "0";

  return {
    repStaked:
      formatAttoRep(state.reportingWindowStats.stake, {
        decimals: 4,
        denomination: " REP"
      }).formattedValue || 0,
    repBalance: loginAccount.rep.formatted || "0",
    totalFrozenFunds
  };
};

export default connect(mapStateToProps)(OverviewFunds);
