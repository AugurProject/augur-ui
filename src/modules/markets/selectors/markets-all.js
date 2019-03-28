import { createSelector } from "reselect";
import store from "src/store";
import {
  selectMarketsDataState,
  selectReportsState,
  selectOutcomesDataState,
  selectAccountTradesState,
  selectUniverseState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectLoginAccountState
} from "src/select-state";
import selectAccountPositions from "modules/orders/selectors/positions-plus-asks";

import { selectMarket } from "modules/markets/selectors/market";

export default function() {
  return selectMarkets(store.getState());
}

export const selectMarkets = createSelector(
  selectMarketsDataState,
  selectReportsState,
  selectOutcomesDataState,
  selectAccountPositions,
  selectAccountTradesState,
  selectUniverseState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectLoginAccountState,
  (
    marketsData,
    reports,
    outcomesData,
    accountPositions,
    accountTrades,
    universe,
    orderBooks,
    orderCancellation,
    loginAccount
  ) => {
    if (!marketsData) return [];
    return Object.keys(marketsData).map(marketId => {
      if (!marketId || !marketsData[marketId]) return {};
      return selectMarket(marketId);
    });
  }
);
