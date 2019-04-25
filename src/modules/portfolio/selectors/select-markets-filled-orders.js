import { createSelector } from "reselect";
import store from "src/store";
import * as constants from "src/modules/common-elements/constants";
import {
  selectMarketReportState,
  selectLoginAccountAddress,
  selectFilledOrders
} from "src/select-state";
import { selectMarket } from "modules/markets/selectors/market";
import { keyArrayBy } from "utils/key-by";

export default function() {
  return marketsFilledOrders(store.getState());
}

export const marketsFilledOrders = createSelector(
  selectMarketReportState,
  selectLoginAccountAddress,
  selectFilledOrders,
  (marketReportState, loginAccountAddress, filledOrders) => {
    const resolvedMarkets = marketReportState.resolved;
    const account = loginAccountAddress;
    const userFilledOrders = filledOrders[account] || [];

    const marketIds = Object.keys(
      keyArrayBy(
        userFilledOrders.reduce(
          (p, m) =>
            resolvedMarkets.indexOf(m.marketId) === -1 ? [...p, m] : p,
          []
        ),
        "marketId"
      )
    );

    const markets = marketIds
      .map(m => selectMarket(m))
      .map(item => {
        if (Object.keys(item).length === 0) return null;
        return item;
      })
      .filter(
        market => market && market.marketStatus !== constants.MARKET_CLOSED
      );

    const allFilledOrders = marketIds.reduce(
      (p, marketId) => [...p, ...selectMarket(marketId).filledOrders],
      []
    );

    return {
      markets,
      marketsObj: markets.reduce((obj, market) => {
        obj[market.id] = market;
        return obj;
      }, {}),
      ordersObj: allFilledOrders.reduce((obj, order) => {
        obj[order.id] = order;
        return obj;
      }, {}),
      filledOrders: allFilledOrders
    };
  }
);
