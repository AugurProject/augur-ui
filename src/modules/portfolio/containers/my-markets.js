import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MyMarkets from "modules/portfolio/components/markets/markets";
import { pick } from "lodash";

import { selectAuthorOwnedMarkets } from "modules/markets/selectors/user-markets";

import { collectMarketCreatorFees } from "modules/markets/actions/market-creator-fees-management";
import marketDisputeOutcomes from "modules/reports/selectors/select-market-dispute-outcomes";

import { createTabsInfo } from "modules/portfolio/helpers/create-tabs-info";
import { createMarketsStateObject } from "modules/portfolio/helpers/create-markets-state-object";

const mapStateToProps = state => {
  const createdMarkets = selectAuthorOwnedMarkets(state);

  const marketsPick = createdMarkets.map((
    market
  ) =>
    pick(market, [
      "id",
      "description",
      "reportingState",
      "recentlyTraded",
      "endTime"
    ])
  );

  const markets = createMarketsStateObject(marketsPick);

  const marketsObj = createdMarkets.reduce((obj, market) => {
    obj[market.id] = market;
    return obj;
  }, {});

  // getMyMarkets or it's equivalent will need a way of calculating the outstanding returns for a market and attaching it to each market object. Currently I've just added a key/value pair to the market objects im using below.
  return {
    isLogged: state.authStatus.isLogged,
    myMarkets: markets,
    transactionsLoading: state.appStatus.transactionsLoading,
    isMobile: state.appStatus.isMobile,
    pendingLiquidityOrders: state.pendingLiquidityOrders,
    outcomes: marketDisputeOutcomes() || {},
    tabsInfo: createTabsInfo(markets),
    currentAugurTimestamp: state.blockchain.currentAugurTimestamp,
    reportingWindowStatsEndTime: state.reportingWindowStats.endTime,
    marketsObj
  };
};

const mapDispatchToProps = dispatch => ({
  collectMarketCreatorFees: (getBalanceOnly, marketId, callback) =>
    dispatch(collectMarketCreatorFees(getBalanceOnly, marketId, callback))
});

const MyMarketsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyMarkets)
);

export default MyMarketsContainer;
