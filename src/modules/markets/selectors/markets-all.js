import { createSelector } from "reselect";
import store from "src/store";
import {
  selectMarketsDataState,
  selectOutcomesDataState,
  selectAccountTradesState,
  selectMarketTradingHistoryState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectPendingOrdersState,
  selectLoginAccountState,
  selectAccountShareBalance
} from "src/select-state";
import selectAccountPositions from "modules/orders/selectors/positions-plus-asks";

import { selectMarket } from "modules/markets/selectors/market";

export default function() {
  return selectMarkets(store.getState());
}

export const selectMarkets = createSelector(
  selectMarketsDataState,
  selectMarketTradingHistoryState,
  selectOutcomesDataState,
  selectAccountPositions,
  selectAccountTradesState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectLoginAccountState,
  selectAccountShareBalance,
  selectPendingOrdersState,
  (
    marketsData,
    marketPriceHistory,
    marketOutcomesData,
    marketAccountPositions,
    marketAccountTrades,
    orderBooks,
    orderCancellation,
    accountAddress,
    accountShareBalances,
    pendingOrders
  ) => {
    if (!marketsData) return [];
    return Object.keys(marketsData).map(marketId => {
      if (!marketId || !marketsData[marketId]) return {};
      return selectMarket(marketId);
    });
  }
);
