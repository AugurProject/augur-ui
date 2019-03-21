import { createSelector } from "reselect";
import store from "src/store";
import {
  selectMarketsDataState,
  selectFavoritesState,
  selectReportsState,
  selectOutcomesDataState,
  selectAccountTradesState,
  selectUniverseState,
  selectMarketTradingHistoryState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectSmallestPositionsState,
  selectLoginAccountState
} from "src/select-state";
import selectAccountPositions from "modules/orders/selectors/positions-plus-asks";

import { selectMarket } from "modules/markets/selectors/market";

export default function() {
  return selectMarkets(store.getState());
}

export const selectMarkets = createSelector(
  selectMarketsDataState,
  selectFavoritesState,
  selectReportsState,
  selectOutcomesDataState,
  selectAccountPositions,
  selectAccountTradesState,
  selectUniverseState,
  selectMarketTradingHistoryState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectSmallestPositionsState,
  selectLoginAccountState,
  (
    marketsData,
    favorites,
    reports,
    outcomesData,
    accountPositions,
    accountTrades,
    universe,
    selectedFilterSort,
    marketTradingHistory,
    orderBooks,
    orderCancellation,
    smallestPositions,
    loginAccount
  ) => {
    if (!marketsData) return [];
    return Object.keys(marketsData).map(marketId => {
      if (!marketId || !marketsData[marketId]) return {};
      return selectMarket(marketId);
    });
  }
);
