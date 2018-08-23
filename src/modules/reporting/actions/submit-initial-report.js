import { augur } from "services/augurjs";
import { REPORTING_REPORT_MARKETS } from "modules/routes/constants/views";
import makePath from "modules/routes/helpers/make-path";
import logError from "utils/log-error";
import { getPayoutNumerators } from "modules/reporting/selectors/get-payout-numerators";

<<<<<<< HEAD
import { updateNotification, addNotification } from 'modules/notifications/actions'
import { selectCurrentTimestampInSeconds } from 'src/select-state'

export const submitInitialReport = (estimateGas, marketId, selectedOutcome, invalid, history, callback = logError) => (dispatch, getState) => {
  const { loginAccount, marketsData } = getState()
  const outcome = parseFloat(selectedOutcome)
=======
export const submitInitialReport = (
  estimateGas,
  marketId,
  selectedOutcome,
  invalid,
  history,
  callback = logError
) => (dispatch, getState) => {
  const { loginAccount, marketsData } = getState();
  const outcome = parseFloat(selectedOutcome);
>>>>>>> ee59e41c7295965e1185233dc18c9ef2096bdefa

  if (!marketId || (isNaN(outcome) && !invalid)) return callback(null);

  const market = marketsData[marketId];
  if (!market) return callback("Market not found");
  const payoutNumerators = getPayoutNumerators(
    market,
    selectedOutcome,
    invalid
  );

  augur.api.Market.doInitialReport({
    meta: loginAccount.meta,
    tx: { to: marketId, estimateGas },
    _invalid: invalid,
    _payoutNumerators: payoutNumerators,
    onSent: (res) => {
      if (!estimateGas) {
<<<<<<< HEAD
        dispatch(addNotification({
          id: res.hash,
          market: marketId,
          status: 'Pending',
          timestamp: selectCurrentTimestampInSeconds(getState()),
          type: 'doInitialReport',
        }))
        history.push(makePath(REPORTING_REPORT_MARKETS))
      }
    },
    onSuccess: (res) => {
      if (estimateGas) {
        callback(null, res)
      } else {
        dispatch(updateNotification(res.hash, {
          status: 'Success',
          timestamp: selectCurrentTimestampInSeconds(getState()),
        }))
        callback(null)
=======
        history.push(makePath(REPORTING_REPORT_MARKETS));
      }
    },
    onSuccess: gasCost => {
      if (estimateGas) {
        callback(null, gasCost);
      } else {
        callback(null);
>>>>>>> ee59e41c7295965e1185233dc18c9ef2096bdefa
      }
    },
    onFailed: err => callback(err)
  });
};
