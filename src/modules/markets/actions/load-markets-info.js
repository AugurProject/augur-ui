import { augur } from 'services/augurjs'
import { updateMarketsData } from 'modules/markets/actions/update-markets-data'
import { updateMarketLoading, removeMarketLoading } from 'modules/market/actions/update-market-loading'
import isObject from 'utils/is-object'
import logError from 'utils/log-error'

import { MARKET_INFO_LOADING, MARKET_INFO_LOADED } from 'modules/market/constants/market-loading-states'

export const loadMarketsInfo = (marketIds, callback = logError) => (dispatch, getState) => {
  (marketIds || []).map(marketId => dispatch(updateMarketLoading({ marketId, state: MARKET_INFO_LOADING })))


  augur.markets.getMarketsInfo({ marketIds }, (err, marketsDataArray) => {
    if (err) {
      rollbackLoadingState(dispatch, marketIds)
      return callback(err)
    }

    const marketsData = marketsDataArray.filter(marketHasData => marketHasData).reduce((p, marketData) => ({
      ...p,
      [marketData.id]: marketData,
    }), {})

    if (marketsData == null || !isObject(marketsData)) {
      rollbackLoadingState(dispatch, marketIds)
      return callback(`no markets data received`)
    }

    if (!Object.keys(marketsData).length) {
      rollbackLoadingState(dispatch, marketIds)
      return callback(null)
    }

    Object.keys(marketsData).forEach(marketId => dispatch(updateMarketLoading({ marketId: marketsData.id, state: MARKET_INFO_LOADED })))
    dispatch(updateMarketsData(marketsData))
    callback(null, marketsData)
  })
}

export const loadMarketsInfoOnly = (marketIds, callback = logError) => (dispatch, getState) => {
  augur.markets.getMarketsInfo({ marketIds }, (err, marketsDataArray) => {
    if (err) return callback(err)
    const marketInfoIds = Object.keys(marketsDataArray)
    const marketsData = marketsDataArray.reduce((p, marketData) => ({
      ...p,
      [marketData.id]: marketData,
    }), {})
    if (!marketInfoIds.length) return callback(null)
    dispatch(updateMarketsData(marketsData))
    callback(null)
  })
}

function rollbackLoadingState(dispatch, marketIds) {
  (marketIds || []).map(marketId => dispatch(removeMarketLoading(marketId)))
}
