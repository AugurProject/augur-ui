import { createSelector } from "reselect";
import store from "src/store";
import { selectMarketsDataState } from "src/select-state";

import { selectMarket } from "modules/markets/selectors/market";

export default function() {
  return selectMarkets(store.getState());
}

export const selectMarkets = createSelector(
  selectMarketsDataState,
  marketsData => {
    if (!marketsData) return [];
    return Object.keys(marketsData).map(marketId => {
      if (!marketId || !marketsData[marketId]) return {};
      return selectMarket(marketId);
    });
  }
);
