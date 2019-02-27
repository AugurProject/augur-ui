import { createSelector } from "reselect";
import { selectMarkets } from "src/modules/markets/selectors/markets-all";
import * as constants from "src/modules/common-elements/constants";

// Get all the users CLOSED markets with OPEN ORDERS
export const selectResolvedMarketsOpenOrders = createSelector(
  selectMarkets,
  markets => {
    if (markets.length > 0) {
      return markets
        .filter(market => market.marketStatus === constants.MARKET_CLOSED)
        .filter(market => market.userOpenOrders.length > 0)
        .map(market => ({
          marketId: market.id,
          marketName: market.description
        }));
    }
    return [];
  }
);
