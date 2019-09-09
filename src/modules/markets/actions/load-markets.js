import { augur } from "services/augurjs";
import { constants } from "services/constants";
import logError from "utils/log-error";
import loadCategories from "modules/categories/actions/load-categories";
import { CUTOFF } from "modules/markets/constants/cutoff-date";
import {
  MARKET_CREATION_TIME,
  MARKET_END_DATE,
  MARKET_RECENTLY_TRADED,
  MARKET_FEE,
  MARKET_OPEN_INTEREST,
  MARKET_LIQUIDITY_10,
  MARKET_LIQUIDITY_15,
  MARKET_LIQUIDITY_20,
  MARKET_LIQUIDITY_100
} from "modules/filter-sort/constants/market-sort-params";
import {
  MARKET_REPORTING,
  MARKET_CLOSED
} from "modules/filter-sort/constants/market-states";
import { updateMarketsData } from "modules/markets/actions/update-markets-data";
import {
  updateAppStatus,
  HAS_LOADED_MARKETS
} from "modules/app/actions/update-app-status";

const { REPORTING_STATE } = constants;

// NOTE -- We ONLY load the market ids during this step.
// From here we populate the marketsData
export const loadMarkets = (type, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe } = getState();
  const params = { universe: universe.id };

  augur.markets.getMarkets(params, (err, marketsArray) => {
    if (err) return callback(err);

    const marketsData = marketsArray.reduce(
      (p, id) => ({
        ...p,
        [id]: { id }
      }),
      {}
    );

    dispatch(updateAppStatus(HAS_LOADED_MARKETS, true));
    dispatch(updateMarketsData(marketsData));
    callback(null, marketsArray);
  });
};

// NOTE -- We ONLY load the market ids during this step.
export const loadUserMarkets = (callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();

  augur.markets.getMarkets(
    { universe: universe.id, creator: loginAccount.address },
    (err, marketsArray) => {
      if (err || !marketsArray) return callback(err);

      const marketsData = marketsArray.reduce(
        (p, id) => ({
          ...p,
          [id]: { id, author: loginAccount.address }
        }),
        {}
      );
      dispatch(updateMarketsData(marketsData));
      callback(null, marketsArray);
    }
  );
};

export const loadMarketsByFilter = (filterOptions, cb = () => {}) => (
  dispatch,
  getState
) => {
  const { universe } = getState();
  const sort = {};
  switch (filterOptions.sort) {
    case MARKET_RECENTLY_TRADED: {
      // Sort By Recently Traded:
      sort.sortBy = "lastTradeTime";
      sort.isSortDescending = true;
      break;
    }
    case MARKET_END_DATE: {
      // Sort By End Date (soonest first):
      sort.sortBy = "endTime";
      sort.isSortDescending = false;
      break;
    }
    case MARKET_CREATION_TIME: {
      // Sort By Creation Date (most recent first):
      sort.sortBy = "creationBlockNumber";
      sort.isSortDescending = true;
      break;
    }
    case MARKET_FEE: {
      // Sort By Fee (lowest first):
      sort.sortBy = "marketCreatorFeeRate";
      sort.isSortDescending = false;
      break;
    }
    case MARKET_OPEN_INTEREST: {
      sort.sortBy = "openInterest";
      sort.isSortDescending = true;
      break;
    }
    case MARKET_LIQUIDITY_10: {
      sort.sortBy = "liquidityTokens";
      sort.isSortDescending = true;
      sort.liquiditySortSpreadPercent = 0.1;
      break;
    }
    case MARKET_LIQUIDITY_15: {
      sort.sortBy = "liquidityTokens";
      sort.isSortDescending = true;
      sort.liquiditySortSpreadPercent = 0.15;
      break;
    }
    case MARKET_LIQUIDITY_20: {
      sort.sortBy = "liquidityTokens";
      sort.isSortDescending = true;
      sort.liquiditySortSpreadPercent = 0.2;
      break;
    }
    case MARKET_LIQUIDITY_100: {
      sort.sortBy = "liquidityTokens";
      sort.isSortDescending = true;
      sort.liquiditySortSpreadPercent = 1.0;
      break;
    }
    default: {
      // Sort By Volume:
      // leave defaults
      break;
    }
  }

  dispatch(updateAppStatus(HAS_LOADED_MARKETS, false));

  let params = {
    universe: universe.id,
    category: filterOptions.category,
    search: filterOptions.search,
    maxFee: parseFloat(filterOptions.maxFee),
    hasOrders: false,
    ...sort
  };

  if (filterOptions.experimentalInvalid) {
    params.enableInvalidFilter = true;
  }

  if (filterOptions.hideInsecureMarkets) {
    params.minInitialRep = true;
  }

  if (filterOptions.hidePostV2Markets) {
    params = Object.assign({}, params, { maxEndTime: CUTOFF / 1000 });
  }

  switch (filterOptions.filter) {
    case MARKET_REPORTING: {
      // reporting markets only:
      params.reportingState = [
        REPORTING_STATE.DESIGNATED_REPORTING,
        REPORTING_STATE.OPEN_REPORTING,
        REPORTING_STATE.CROWDSOURCING_DISPUTE,
        REPORTING_STATE.AWAITING_NEXT_WINDOW
      ];
      break;
    }
    case MARKET_CLOSED: {
      // resolved markets only:
      params.reportingState = [
        REPORTING_STATE.AWAITING_FINALIZATION,
        REPORTING_STATE.FINALIZED
      ];
      break;
    }
    default: {
      // open markets only:
      params.reportingState = [REPORTING_STATE.PRE_REPORTING];
      break;
    }
  }

  augur.markets.getMarkets(params, (err, filteredMarkets) => {
    if (err) return cb(err);

    setTimeout(() => {
      dispatch(updateAppStatus(HAS_LOADED_MARKETS, true));
    }, 2000);

    // load categories here
    dispatch(loadCategories(params, !params.category));
    return cb(null, filteredMarkets);
  });
};
