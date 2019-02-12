import { augur, constants } from "services/augurjs";
import logError from "utils/log-error";
import { loadMarketsInfoIfNotLoaded } from "modules/markets/actions/load-markets-info";
import { each } from "lodash";
import {
  updateDesignatedReportingMarkets,
  updateUpcomingDesignatedReportingMarkets,
  updateOpenMarkets
} from "modules/reports/actions/update-markets-in-reporting-state";

export const loadReporting = (marketIdsParam, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();
  const designatedReportingParams = {
    universe: universe.id,
    designatedReporter: loginAccount.address
  };

  if (marketIdsParam) {
    dispatch(
      loadMarketsInfoIfNotLoaded(marketIdsParam, (err, marketData) => {
        if (err) return logError(err);
        const preReporting = [];
        const designatedReporting = [];
        const openReporting = [];
        if (marketData) {
          Object.keys(marketData).forEach(marketId => {
            const state = marketData[marketId].reportingState;
            if (state === constants.REPORTING_STATE.PRE_REPORTING) {
              preReporting.push(marketId);
            }
            if (state === constants.REPORTING_STATE.DESIGNATED_REPORTING) {
              designatedReporting.push(marketId);
            }
            if (state === constants.REPORTING_STATE.OPEN_REPORTING) {
              openReporting.push(marketId);
            }
          });
          dispatch(updateUpcomingDesignatedReportingMarkets(preReporting));
          dispatch(updateDesignatedReportingMarkets(designatedReporting));
          dispatch(updateOpenMarkets(openReporting));
        }
      })
    );
    return;
  }

  let prePromise = null;
  let designatedPromise = null;
  if (loginAccount.address) {
    prePromise = new Promise(resolve => {
      augur.augurNode.submitRequest(
        "getMarkets",
        {
          reportingState: constants.REPORTING_STATE.PRE_REPORTING,
          sortBy: "endTime",
          ...designatedReportingParams
        },
        (err, marketIds) => {
          if (err) return resolve(err);
          if (!marketIds || marketIds.length === 0 || !loginAccount.address) {
            dispatch(updateUpcomingDesignatedReportingMarkets([]));
            return resolve(null);
          }
          dispatch(
            dispatch(updateUpcomingDesignatedReportingMarkets(marketIds))
          );
          resolve(null);
        }
      );
    });

    designatedPromise = new Promise(resolve => {
      augur.augurNode.submitRequest(
        "getMarkets",
        {
          reportingState: constants.REPORTING_STATE.DESIGNATED_REPORTING,
          sortBy: "endTime",
          ...designatedReportingParams
        },
        (err, marketIds) => {
          if (err) return resolve(err);
          if (
            !marketIds ||
            marketIds.length === 0 ||
            isNaN(loginAccount.address)
          ) {
            dispatch(updateDesignatedReportingMarkets([]));
            return resolve(null);
          }
          dispatch(dispatch(updateDesignatedReportingMarkets(marketIds)));
          resolve(null);
        }
      );
    });
  }

  const openPromise = new Promise(resolve => {
    augur.augurNode.submitRequest(
      "getMarkets",
      {
        reportingState: constants.REPORTING_STATE.OPEN_REPORTING,
        sortBy: "endTime",
        universe: universe.id
      },
      (err, marketIds) => {
        if (err) return resolve(err);
        if (!marketIds || marketIds.length === 0) {
          dispatch(updateOpenMarkets([]));
          return resolve(null);
        }
        dispatch(dispatch(updateOpenMarkets(marketIds)));
        resolve(null);
      }
    );
  });

  Promise.all([openPromise, prePromise, designatedPromise]).then(errors => {
    each(errors, err => {
      if (err !== null) return callback(err);
    });
    callback(null);
  });
};
