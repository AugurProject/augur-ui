import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { find } from "lodash";

import * as constants from "modules/common-elements/constants";

import OverviewStats from "modules/account/components/overview-stats/overview-stats";

const mapStateToProps = state => ({
  timeframeData: state.universe.timeframeData
});

const mapDispatchToProps = dispatch => ({});

const mergeProps = (sP, dP, oP) => {
  const timeframe = find(constants.TIMEFRAME_OPTIONS, { id: oP.timeframe })
    .label;

  const properties = [
    {
      key: 0,
      label: "Active Users",
      value: sP.timeframeData[timeframe].activeUsers
    },
    {
      key: 1,
      label: "Open Interest",
      value: sP.timeframeData[timeframe].openInterest
    },
    {
      key: 2,
      label: "Volume",
      value: sP.timeframeData[timeframe].volume
    },
    {
      key: 3,
      label: "Trades",
      value: sP.timeframeData[timeframe].numberOfTrades
    },
    {
      key: 4,
      label: "Markets Created",
      value: sP.timeframeData[timeframe].marketsCreated
    },
    {
      key: 5,
      label: "Money at Stake",
      value: sP.timeframeData[timeframe].moneyStaked
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
