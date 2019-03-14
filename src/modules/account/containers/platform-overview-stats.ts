import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import getValue from "utils/get-value";
import OverviewStats from "modules/account/components/overview-stats/overview-stats";

const mapStateToProps = state => ({
  timeframeData: state.universe.timeframeData
});

const mapDispatchToProps = dispatch => ({});

const mergeProps = (sP, dP, oP) => {
  const properties = [
    {
      key: 0,
      label: "Active Users",
      value: getValue(sP.timeframeData, "activeUsers")
    },
    {
      key: 1,
      label: "Open Interest",
      value: getValue(sP.timeframeData, "openInterest")
    },
    {
      key: 2,
      label: "Volume",
      value: getValue(sP.timeframeData, "volume")
    },
    {
      key: 3,
      label: "Trades",
      value: getValue(sP.timeframeData, "numberOfTrades")
    },
    {
      key: 4,
      label: "Markets Created",
      value: getValue(sP.timeframeData, "marketsCreated")
    },
    {
      key: 5,
      label: "Money at Stake",
      value: getValue(sP.timeframeData, "moneyAtStake")
    }
  ];

  return {
    ...oP,
    ...sP,
    ...dP,
    properties
  };
};

const PlatformtOverviewStatsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(OverviewStats)
);

export default PlatformtOverviewStatsContainer;
