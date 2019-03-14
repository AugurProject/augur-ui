import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AccountOverviewStats from "modules/account/components/account-overview-stats/account-overview-stats";
import getValue from "utils/get-value";

const mapStateToProps = state => ({
  timeframeData: state.loginAccount.timeframeData
});

const mapDispatchToProps = dispatch => ({});

const mergeProps = (sP, dP, oP) => {
  const properties = [
    {
      key: 0,
      label: "Positions",
      value: getValue(sP.timeframeData, "positions")
    },
    {
      key: 1,
      label: "Number of Trades",
      value: getValue(sP.timeframeData, "marketsTraded")
    },
    {
      key: 2,
      label: "Markets Traded",
      value: getValue(sP.timeframeData, "successfulDisputes")
    },
    {
      key: 3,
      label: "Markets Created",
      value: getValue(sP.timeframeData, "numberOfTrades")
    },
    {
      key: 4,
      label: "Successful Disputes",
      value: getValue(sP.timeframeData, "marketsCreated")
    },
    {
      key: 5,
      label: "Redeemed Positions",
      value: getValue(sP.timeframeData, "redeemedPositions")
    }
  ];

  return {
    ...oP,
    ...sP,
    ...dP,
    properties
  };
};

const AccountOverviewStatsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(AccountOverviewStats)
);

export default AccountOverviewStatsContainer;
