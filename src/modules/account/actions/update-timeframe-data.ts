// import { augur } from "services/augurjs";
import { updateLoginAccount } from "modules/auth/actions/update-login-account";
import logError from "utils/log-error";

import * as constants from "modules/common-elements/constants";

const timeframeData = {
  [constants.TIMEFRAMES.DAY]: {
    positions: 2,
    marketsTraded: 5,
    successfulDisputes: 9,
    numberOfTrades: 50,
    marketsCreated: 3,
    redeemedPositions: 5,
  },
  [constants.TIMEFRAMES.WEEK]: {
    positions: 5,
    marketsTraded: 10,
    successfulDisputes: 19,
    numberOfTrades: 67,
    marketsCreated: 3,
    redeemedPositions: 6,
  },
  [constants.TIMEFRAMES.MONTH]: {
    positions: 24,
    marketsTraded: 31,
    successfulDisputes: 20,
    numberOfTrades: 100,
    marketsCreated: 9,
    redeemedPositions: 10,
  },
  [constants.TIMEFRAMES.ALL]: {
    positions: 100,
    marketsTraded: 120,
    successfulDisputes: 90,
    numberOfTrades: 372,
    marketsCreated: 39,
    redeemedPositions: 51,
  },
};

export const updateTimeframeData = (options = {}, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();
  if (loginAccount.address == null || universe.id == null)
    return callback(null);
 
   // todo: add augur-node call here
  dispatch(
    updateLoginAccount({
      timeframeData: timeframeData,
    })
  );
};
