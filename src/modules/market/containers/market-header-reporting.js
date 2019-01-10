import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectMarket } from "modules/markets/selectors/market";
import MarketHeaderReporting from "modules/market/components/market-header/market-header-reporting";
import { sendFinalizeMarket } from "modules/markets/actions/finalize-market";
import marketDisputeOutcomes from "modules/reports/selectors/select-market-dispute-outcomes";
import { selectCurrentTimestamp } from "src/select-state";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/modal/constants/modal-types";
import { getWinningBalance } from "modules/reports/actions/get-winning-balance";

const mapStateToProps = (state, ownProps) => {
  const market = selectMarket(ownProps.marketId);
  const disputeOutcomes = marketDisputeOutcomes() || {};
  return {
    currentTimestamp: selectCurrentTimestamp(state),
    market,
    isLogged: state.authStatus.isLogged,
    isDesignatedReporter:
      market.designatedReporter === state.loginAccount.address,
    tentativeWinner:
      disputeOutcomes[ownProps.marketId] &&
      disputeOutcomes[ownProps.marketId].find(o => o.tentativeWinning)
  };
};

const mapDispatchToProps = dispatch => ({
  finalizeMarket: (marketId, cb) => dispatch(sendFinalizeMarket(marketId, cb)),
  claimTradingProceeds: (marketId, cb) =>
    dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId, cb })),
  getWinningBalances: marketId => dispatch(getWinningBalance([marketId]))
});

const MarketHeaderReportingContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketHeaderReporting)
);

export default MarketHeaderReportingContainer;
