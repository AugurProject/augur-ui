import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MarketHeaderBar from "modules/market/components/market-header/market-header-bar";
import { sendFinalizeMarket } from "modules/markets/actions/finalize-market";
import { toggleFavorite } from "modules/markets/actions/update-favorites";

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.authStatus.isLogged,
  isFavorite: !!state.favorites[ownProps.marketId]
});

const mapDispatchToProps = dispatch => ({
  finalizeMarket: (marketId, cb) => dispatch(sendFinalizeMarket(marketId, cb)),
  toggleFavorite: marketId => dispatch(toggleFavorite(marketId))
});

const MarketHeaderContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketHeaderBar)
);

export default MarketHeaderContainer;
