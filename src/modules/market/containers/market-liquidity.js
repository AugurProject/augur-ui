import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MarketLiquidity from 'modules/market/components/market-liquidity/market-liquidity'

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.isLogged,
  isMobile: state.isMobile,
  isMobileSmall: state.isMobileSmall,
  loginAccount: state.loginAccount,
})

const mapDispatchToProps = dispatch => ({
})

const MarketLiquidityContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketLiquidity))

export default MarketLiquidityContainer
