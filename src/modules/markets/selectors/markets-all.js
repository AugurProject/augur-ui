import store from "src/store";
import { selectMarket } from "modules/markets/selectors/market";
import { selectMarketsDataState } from "src/select-state";
import { createSelector } from "reselect";

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
