// import { augur } from "services/augurjs";
import { updateUniverse } from "modules/universe/actions/update-universe";
import logError from "utils/log-error";

import * as constants from "modules/common-elements/constants";

const timeframeData = {
  [constants.TIMEFRAMES.DAY]: {
    activeUsers: 10,
    openInterest: 105,
    volume: 910,
    numberOfTrades: 5010,
    marketsCreated: 310,
    moneyStaked: 510
  },
  [constants.TIMEFRAMES.WEEK]: {
    activeUsers: 40,
    openInterest: 1005,
    volume: 1010,
    numberOfTrades: 8010,
    marketsCreated: 510,
    moneyStaked: 550
  },
  [constants.TIMEFRAMES.MONTH]: {
    activeUsers: 1000,
    openInterest: 5005,
    volume: 1050,
    numberOfTrades: 5010,
    marketsCreated: 310,
    moneyStaked: 10010
  },
  [constants.TIMEFRAMES.ALL]: {
    activeUsers: 5000,
    openInterest: 105,
    volume: 9010,
    numberOfTrades: 6010,
    marketsCreated: 6010,
    moneyStaked: 100010
  }
};

export const updateUniverseTimeframeData = (
  options = {},
  callback = logError
) => (dispatch, getState) => {
  const { universe } = getState();
  if (universe.id == null) return callback(null);

  // todo: add augur-node call here
  dispatch(
    updateUniverse({
      timeframeData
    })
  );
};
