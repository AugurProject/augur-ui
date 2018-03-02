import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MarketView from 'modules/market/components/market-view/market-view'
import { loadFullMarket } from 'modules/market/actions/load-full-market'
import { selectMarket } from 'modules/market/selectors/market'

import parseQuery from 'modules/routes/helpers/parse-query'
import getValue from 'utils/get-value'

import { MARKET_ID_PARAM_NAME } from 'modules/routes/constants/param-names'

const mapStateToProps = (state, ownProps) => {
  const {
    marketsData,
    isLogged,
    connection,
    universe,
    orderBooks,
    isMobile,
    marketLoading,
  } = state
  const marketId = parseQuery(ownProps.location.search)[MARKET_ID_PARAM_NAME]
  const marketLoadingState = getValue(marketLoading, `${marketId}.state`)
  const market = selectMarket(marketId)

  return {
    isConnected: connection.isConnected && universe.id != null,
    marketType: getValue(market, `${marketId}.marketType`),
    description: market.description,
    marketLoadingState,
    isLogged,
    universe,
    orderBooks,
    isMobile,
    marketId,
    marketsData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFullMarket: marketId => dispatch(loadFullMarket(marketId)),
})

const Market = withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketView))

export default Market
