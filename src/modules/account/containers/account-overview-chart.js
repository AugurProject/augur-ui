import { connect } from "react-redux";

import AccountOverviewChartCmp from "modules/account/components/account-overview-chart/account-overview-chart";
import getProfitLoss from "modules/positions/actions/get-profit-loss";

const mapStateToProps = state => ({
  universe: state.universe.id,
  currentAugurTimestamp: state.blockchain.currentAugurTimestamp
});

const mapDispatchToProps = dispatch => ({
  getProfitLoss: (
    universe,
    startTime,
    endTime,
    periodInterval,
    marketId,
    callback
  ) =>
    dispatch(
      getProfitLoss({
        universe,
        startTime,
        endTime,
        periodInterval,
        marketId,
        callback
      })
    )
});

const AccountOverviewChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountOverviewChartCmp);

export default AccountOverviewChart;
