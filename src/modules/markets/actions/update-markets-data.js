export const UPDATE_MARKETS_DATA = 'UPDATE_MARKETS_DATA'
export const CLEAR_MARKETS_DATA = 'CLEAR_MARKETS_DATA'
export const UPDATE_MARKETS_LOADING_STATUS = 'UPDATE_MARKETS_LOADING_STATUS'
export const UPDATE_MARKET_CATEGORY = 'UPDATE_MARKET_CATEGORY'
export const UPDATE_MARKET_REP_BALANCE = 'UPDATE_MARKET_REP_BALANCE'
export const UPDATE_MARKET_FROZEN_SHARES_VALUE = 'UPDATE_MARKET_FROZEN_SHARES_VALUE'

export const updateMarketsData = marketsData => ({ type: UPDATE_MARKETS_DATA, marketsData })
export const clearMarketsData = () => ({ type: CLEAR_MARKETS_DATA })
export const updateMarketsLoadingStatus = (marketIDs, isLoading) => ({ type: UPDATE_MARKETS_LOADING_STATUS, marketIDs, isLoading })
export const updateMarketCategory = (marketID, category) => ({ type: UPDATE_MARKET_CATEGORY, marketID, category })
export const updateMarketRepBalance = (marketID, repBalance) => ({ type: UPDATE_MARKET_REP_BALANCE, marketID, repBalance })
export const updateMarketFrozenSharesValue = (marketID, frozenSharesValue) => ({ type: UPDATE_MARKET_FROZEN_SHARES_VALUE, marketID, frozenSharesValue })
