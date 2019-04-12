import { augur } from "services/augurjs";
import logError from "utils/log-error";
import { formatGasCostToEther } from "utils/format-number";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import {
  CLAIM_STAKE_FEES,
  PENDING,
  SUCCESS,
  UNIVERSE_ID
} from "modules/common-elements/constants";
import {
  addPendingData,
  removePendingData
} from "modules/pending-queue/actions/pending-queue-management";

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

export function redeemStake(options, callback = logError) {
  return (dispatch, getState) => {
    const { loginAccount, universe } = getState();
    const universeID = universe.id || UNIVERSE_ID;

    const {
      pendingId,
      onSent,
      onSuccess,
      onFailed,
      nonforkedMarkets,
      feeWindows
    } = options;

    pendingId && dispatch(addPendingData(pendingId, CLAIM_STAKE_FEES, PENDING));

    const reportingParticipants = [];
    nonforkedMarkets.forEach(nonforkedMarket => {
      if (nonforkedMarket.initialReporter) {
        reportingParticipants.push(nonforkedMarket.initialReporter);
      }
      nonforkedMarket.crowdsourcers.forEach(crowdsourcer => {
        reportingParticipants.push(crowdsourcer);
      });
    });

    const payload = {
      _feeWindows: feeWindows,
      _reportingParticipants: reportingParticipants,
      onSent: () => {
        onSent && onSent();
      },
      onSuccess: gas => {
        if (!!options.estimateGas && onSuccess) {
          const gasValue = gas || CLAIM_FEES_GAS_COST;
          const gasPrice = getGasPrice(getState());
          const gasCost = formatGasCostToEther(
            gasValue,
            { decimalsRounded: 4 },
            gasPrice
          );
          return onSuccess(gasCost);
        }
        pendingId &&
          dispatch(addPendingData(pendingId, CLAIM_STAKE_FEES, SUCCESS));
        onSuccess && onSuccess();
      },
      onFailed: () => {
        if (!!options.estimateGas && onFailed) {
          const gasPrice = getGasPrice(getState());
          return onFailed(
            formatGasCostToEther(0, { decimalsRounded: 4 }, gasPrice)
          );
        }
        pendingId && dispatch(removePendingData(pendingId, CLAIM_STAKE_FEES));
        onFailed && onFailed();
      },
      tx: {
        to: universeID,
        estimateGas: !!options.estimateGas
      },
      meta: loginAccount.meta
    };
    augur.api.Universe.redeemStake(payload, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
}
