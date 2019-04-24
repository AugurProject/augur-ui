import { createSelector } from "reselect";
import store from "src/store";
import * as constants from "src/modules/common-elements/constants";
import {
  selectMarketReportState,
  selectLoginAccountAddress,
  selectFilledOrders
} from "src/select-state";
import { selectMarket } from "modules/markets/selectors/market";
import { differenceBy } from "lodash";
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
    const nonFinalizedMarketFilledOrders = differenceBy(
      userFilledOrders,
      resolvedMarkets,
      "marketId"
    );

    const groupedFilledOrders = keyArrayBy(
      nonFinalizedMarketFilledOrders,
      "marketId"
    );

    const marketIds = Object.keys(groupedFilledOrders);
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
      (p, marketId) => [...p, selectMarket(marketId).filledOrders],
      []
    );

    const marketsObj = markets.reduce((obj, market) => {
      obj[market.id] = market;
      return obj;
    }, {});

    const ordersObj = allFilledOrders.reduce((obj, order) => {
      obj[order.id] = order;
      return obj;
    }, {});

    return {
      markets,
      marketsObj,
      ordersObj,
      filledOrders: allFilledOrders
    };
  }
);
