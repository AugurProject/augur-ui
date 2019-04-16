import { augur } from "services/augurjs";
import logError from "utils/log-error";
import { loadReportingFinal } from "src/modules/reports/actions/load-reporting-final";

export const UPDATE_MARKET_TRADING_HISTORY = "UPDATE_MARKET_TRADING_HISTORY";
export const UPDATE_USER_TRADING_HISTORY = "UPDATE_USER_TRADING_HISTORY";

export function updateMarketTradingHistory(marketId, marketTradingHistory) {
  return {
    type: UPDATE_MARKET_TRADING_HISTORY,
    data: {
      marketId,
      marketTradingHistory
    }
  };
}

export function updateUserTradingHistory(account, userFilledOrders) {
  return {
    type: UPDATE_USER_TRADING_HISTORY,
    data: {
      account,
      userFilledOrders
    }
  };
}

export const loadMarketTradingHistory = (options, callback = logError) => (
  dispatch,
  getState
) => {
  if (options === null || !options.marketId) return callback(null);
  getTradingHistory(options, (err, tradingHistory) => {
    if (err) return callback(err);
    if (tradingHistory == null) return callback(null);
    dispatch(updateMarketTradingHistory(options.marketId, tradingHistory));
    callback(null, tradingHistory);
  });
};

export const loadUserMarketTradingHistory = (options, callback = logError) => (
  dispatch,
  getState
) => {
  const { loginAccount, universe } = getState();
  if (!loginAccount.address) return callback(null, []);
  const allOptions = Object.assign(
    { account: loginAccount.address, universe: universe.id },
    options
  );
  getTradingHistory(allOptions, (err, tradingHistory) => {
    if (err) return callback(err);
    if (tradingHistory == null) return callback(null, []);
    dispatch(
      loadReportingFinal((err, finalizedMarkets) => {
        // ignore err
        // filter out finalized markets
        // we need to get markets trading history for all markets user has traded
        const marketIds = [
          ...new Set(tradingHistory.reduce((p, t) => [...p, t.marketId], []))
        ];
        const filteredMarketIds = [marketIds, finalizedMarkets].reduce((a, b) =>
          a.filter(c => !b.includes(c))
        );
        filteredMarketIds.map(marketId =>
          dispatch(loadMarketTradingHistory({ marketId }))
        );
      })
    );

    dispatch(updateUserTradingHistory(loginAccount.address, tradingHistory));
    callback(null, tradingHistory);
  });
};

const getTradingHistory = (options, callback) => {
  const allOptions = Object.assign(
    { sortBy: "timestamp", isSortDescending: true },
    options
  );
  augur.augurNode.submitRequest(
    "getTradingHistory",
    {
      ...allOptions
    },
    (err, tradingHistory) => {
      if (err) return callback(err);
      if (tradingHistory == null) return callback(null);
      callback(null, tradingHistory);
    }
  );
};
