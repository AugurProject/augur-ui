import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import getValue from 'utils/get-value'
import { removeLiquidityOrder, startOrderSending, clearMarketLiquidityOrders } from 'modules/create-market/actions/liquidity-management'

import MarketLiquidity from 'modules/market/components/market-liquidity/market-liquidity'

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.isLogged,
  isMobile: state.isMobile,
  isMobileSmall: state.isMobileSmall,
  availableEth: getValue(state, 'loginAccount.eth') || '0',
  loginAccount: state.loginAccount,
})

const mapDispatchToProps = dispatch => ({
  clearMarketLiquidityOrders: data => dispatch(clearMarketLiquidityOrders(data)),
  removeLiquidityOrder: data => dispatch(removeLiquidityOrder(data)),
  submitLiquidityOrders: data => dispatch(startOrderSending(data)),
})

const MarketLiquidityContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketLiquidity))

export default MarketLiquidityContainer
