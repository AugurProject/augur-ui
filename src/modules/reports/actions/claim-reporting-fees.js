import { augur } from "services/augurjs";
import logError from "utils/log-error";
import { UNIVERSE_ID } from "modules/common-elements/constants";

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
    const { loginAccount } = getState();
    const payload = {
      ...options,
      meta: loginAccount.meta,
      redeemer: loginAccount.address
    };
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
