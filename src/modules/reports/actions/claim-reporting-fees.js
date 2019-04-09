import { augur } from "services/augurjs";
import logError from "utils/log-error";
import { UNIVERSE_ID } from "modules/common-elements/constants";
import { updateReportingWindowStats } from "modules/reports/actions/update-reporting-window-stats";

export const CLAIM_FEES_GAS_COST = 3000000;

export function claimReportingFeesForkedMarket(options, callback = logError) {
  return (dispatch, getState) => {
    const { loginAccount } = getState();
    const payload = {
      ...options,
      meta: loginAccount.meta,
      redeemer: loginAccount.address
    };

     

    augur.reporting.claimReportingFeesForkedMarket(payload, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
}

export function claimReportingFeesNonforkedMarkets(
  options,
  callback = logError
) {
  return (dispatch, getState) => {
    const { loginAccount, reportingWindowStats } = getState();
    const payload = {
      ...options,
      meta: loginAccount.meta,
      redeemer: loginAccount.address
    };

    delete payload.marketIndex;
    const { reportingFees } = reportingWindowStats;
    const nonforkedMarkets = reportingFees.nonforkedMarkets;
    nonforkedMarkets[options.marketIndex].status = "PENDING";
    reportingFees.nonforkedMarkets = nonforkedMarkets;
    dispatch(updateReportingWindowStats({reportingFees}));

    augur.reporting.claimReportingFeesNonforkedMarkets(
      payload,
      (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      }
    );
  };
}

export function redeemStake(options, callback = logError) {
  return (dispatch, getState) => {
    const { loginAccount, universe } = getState();
    const universeID = universe.id || UNIVERSE_ID;
    const payload = {
      ...options,
      tx: {
        to: universeID,
        estimateGas: false
      },
      meta: loginAccount.meta
    };
    augur.api.Universe.redeemStake(payload, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
}
