import { connect } from "react-redux";

import AccountOverviewChartCmp from "modules/account/components/account-overview-chart/account-overview-chart";
import getProfitLoss from "modules/positions/actions/get-profit-loss";

const mapStateToProps = state => {
  const { loginAccount, filledOrders, blockchain } = state;
  const { currentAugurTimestamp } = blockchain;

  const allTimeStart = (filledOrders[loginAccount.address] || []).reduce(
    (p, f) => (f.timestamp < p ? f.timestamp : p),
    currentAugurTimestamp
  );

  return {
    universe: state.universe.id,
    currentAugurTimestamp,
    allTimeStart
  };
};

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
