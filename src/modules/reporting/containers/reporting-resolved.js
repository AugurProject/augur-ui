import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { constants } from "services/augurjs";
import ReportingResolved from "modules/reporting/components/reporting-resolved/reporting-resolved";
import { selectMarketReportState } from "src/select-state";
import { loadReportingFinal } from "src/modules/reports/actions/load-reporting-final";
import { toggleFavorite } from "modules/markets/actions/update-favorites";
import { loadMarketsInfoIfNotLoaded } from "modules/markets/actions/load-markets-info";
import { selectMarkets } from "src/modules/markets/selectors/markets-all";
import { selectMarket } from "modules/markets/selectors/market";

const mapStateToProps = state => {
  const marketsData = selectMarkets(state);
  const markets = marketsData.filter(
    market =>
      market.reportingState === constants.REPORTING_STATE.FINALIZED ||
      market.reportingState === constants.REPORTING_STATE.AWAITING_FINALIZATION
  );
  const marketIds = selectMarketReportState(state).resolved || [];

  return {
    isConnected: !!state.universe.id,
    isLogged: state.authStatus.isLogged,
    isMobile: state.appStatus.isMobile,
    markets,
    marketIds,
    isForkingMarketFinalized: state.universe.isForkingMarketFinalized,
    forkingMarket: state.universe.isForking
      ? selectMarket(state.universe.forkingMarket)
      : null
  };
};

const mapDispatchToProps = dispatch => ({
  loadReporting: () => dispatch(loadReportingFinal()),
  loadMarketsInfoIfNotLoaded: marketIds =>
    dispatch(loadMarketsInfoIfNotLoaded(marketIds)),
  toggleFavorite: marketId => dispatch(toggleFavorite(marketId))
});

const ReportingResolvedContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReportingResolved)
);

export default ReportingResolvedContainer;
