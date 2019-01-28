import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MarketTradingForm from "modules/market/components/market-trading-form/market-trading-form";
import { createBigNumber } from "src/utils/create-big-number";
import { getGasPrice } from "modules/auth/selectors/get-gas-price";
import { handleFilledOnly } from "modules/notifications/actions/notifications";
import {
  updateTradeCost,
  updateTradeShares
} from "modules/trades/actions/update-trade-cost-shares";

const mapStateToProps = (state, ownProps) => {
  const { authStatus, appStatus } = state;

  return {
    gasPrice: getGasPrice(state),
    availableFunds: createBigNumber(state.loginAccount.eth || 0),
    isLogged: authStatus.isLogged,
    isMobile: appStatus.isMobile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleFilledOnly: trade => dispatch(handleFilledOnly(trade)),
  updateTradeCost: (marketId, outcomeId, order, callback) =>
    dispatch(updateTradeCost({ marketId, outcomeId, ...order, callback })),
  updateTradeShares: (marketId, outcomeId, order, callback) =>
    dispatch(updateTradeShares({ marketId, outcomeId, ...order, callback }))
});

const mergeProps = (sP, dP, oP) => ({
  ...oP,
  ...sP,
  ...dP
});

const MarketTradingFormContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(MarketTradingForm)
);

export default MarketTradingFormContainer;
