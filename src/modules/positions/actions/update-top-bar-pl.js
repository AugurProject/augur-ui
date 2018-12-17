import { augur } from "services/augurjs";
import { updateLoginAccount } from "modules/auth/actions/update-login-account";
import logError from "utils/log-error";

export const updateTopBarPL = (options = {}, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();
  if (loginAccount.address == null || universe.id == null)
    return callback(null);
  // make sure we have a timestamp
  augur.augurNode.submitRequest(
    "getProfitLossSummary",
    {
      universe: universe.id,
      account: loginAccount.address,
      marketId: null
    },
    (err, ProfitLossData) => {
      console.log(err, ProfitLossData);
      if (err) return callback(err);
      dispatch(
        updateLoginAccount({
          totalPLMonth: ProfitLossData[30].total,
          totalPLDay: ProfitLossData[1].total
        })
      );
    }
  );
};
