import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MarketView from "modules/market/components/market-view/market-view";
import { loadFullMarket } from "modules/markets/actions/load-full-market";
import { selectMarket } from "modules/markets/selectors/market";
import parseQuery from "modules/routes/helpers/parse-query";
import { MARKET_ID_PARAM_NAME } from "modules/routes/constants/param-names";
import getPrecision from "utils/get-number-precision";
import { selectCurrentTimestampInSeconds } from "src/select-state";
import { createBigNumber } from "src/utils/create-big-number";
import { updateModal } from "modules/modal/actions/update-modal";
import { loadMarketTradingHistory } from "modules/markets/actions/market-trading-history-management";

const mapStateToProps = (state, ownProps) => {
  const {
    marketsData,
    authStatus,
    appStatus,
    connection,
    universe,
    orderBooks
  } = state;
  const marketId = parseQuery(ownProps.location.search)[MARKET_ID_PARAM_NAME];
  const market = selectMarket(marketId);
  const pricePrecision = market && getPrecision(market.tickSize, 4);

  return {
    availableFunds: createBigNumber(state.loginAccount.eth || 0),
    currentTimestamp: selectCurrentTimestampInSeconds(state),
    outcomes: market.outcomes || [],
    isConnected: connection.isConnected && universe.id != null,
    marketType: market.marketType,
    description: market.description || "",
    isLogged: authStatus.isLogged,
    market,
    minPrice: market.minPrice || createBigNumber(0),
    maxPrice: market.maxPrice || createBigNumber(0),
    universe,
    orderBooks,
    isMobile: appStatus.isMobile,
    marketId,
    marketsData,
    pricePrecision
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFullMarket: marketId => dispatch(loadFullMarket(marketId)),
  updateModal: modal => dispatch(updateModal(modal)),
  loadMarketTradingHistory: marketId =>
    dispatch(loadMarketTradingHistory({ marketId }))
});

const Market = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketView)
);

export default Market;
