export const UPDATE_MARKETS_DATA = "UPDATE_MARKETS_DATA";
export const CLEAR_MARKETS_DATA = "CLEAR_MARKETS_DATA";
export const UPDATE_MARKET_FROZEN_SHARES_VALUE =
  "UPDATE_MARKET_FROZEN_SHARES_VALUE";
export const UPDATE_MARKETS_DISPUTE_INFO = "UPDATE_MARKETS_DISPUTE_INFO";
export const REMOVE_MARKET = "REMOVE_MARKET";

export const updateMarketsData = marketsData => ({
  type: UPDATE_MARKETS_DATA,
  data: { marketsData }
});
export const clearMarketsData = () => ({ type: CLEAR_MARKETS_DATA });

export const updateMarketFrozenSharesValue = (marketId, frozenSharesValue) => ({
  type: UPDATE_MARKET_FROZEN_SHARES_VALUE,
  data: {
    marketId,
    frozenSharesValue
  }
});
export const updateMarketsDisputeInfo = marketsDisputeInfo => ({
  type: UPDATE_MARKETS_DISPUTE_INFO,
  data: { marketsDisputeInfo }
});
export const removeMarket = marketId => ({
  type: REMOVE_MARKET,
  data: { marketId }
});
