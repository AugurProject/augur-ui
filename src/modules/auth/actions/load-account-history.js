import { parallel } from "async";
import { loadAccountTrades } from "modules/positions/actions/load-account-trades";
import { loadCreateMarketHistory } from "modules/markets/actions/load-create-market-history";
import { loadReportingHistory } from "modules/reports/actions/load-reporting-history";
import {
  TRANSACTIONS_LOADING,
  updateAppStatus
} from "modules/app/actions/update-app-status";
import { clearTransactions } from "modules/transactions/actions/update-transactions-data";
import { loadAlerts } from "modules/alerts/actions/alerts";
import { augur } from "services/augurjs";

export const loadAccountHistory = () => (dispatch, getState) => {
  const options = {};

  loadTransactions(dispatch, getState, options, () => {
    dispatch(updateAppStatus(TRANSACTIONS_LOADING, false));
    dispatch(loadAlerts());
  });
};

function loadTransactions(dispatch, getState, options, cb) {
  const allOptions = Object.assign(options, {
    orderState: augur.constants.ORDER_STATE.ALL
  });
  dispatch(updateAppStatus(TRANSACTIONS_LOADING, true));
  dispatch(clearTransactions());
  parallel(
    [
      next => dispatch(loadAccountTrades(allOptions, next)),
      next => dispatch(loadCreateMarketHistory(options, next)),
      next => dispatch(loadReportingHistory(options, next))
    ],
    err => {
      if (err) return console.error("ERROR loadTransactions: ", err);
      cb();
    }
  );
}
