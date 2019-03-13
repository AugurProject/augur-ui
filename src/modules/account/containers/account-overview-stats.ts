import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { find } from "lodash";

import * as constants from "modules/common-elements/constants";

import AccountOverviewStats from "modules/account/components/account-overview-stats/account-overview-stats";

const mapStateToProps = state => ({
	timeframeData: state.loginAccount.timeframeData
});

const mapDispatchToProps = dispatch => ({});

const mergeProps = (sP, dP, oP) => {
	const timeframe = find(constants.TIMEFRAME_OPTIONS, { id: oP.timeframe }).label;

  	const properties = [
	  	{
	  		key: 0,
	  		label: "Positions",
	  		value: sP.timeframeData[timeframe].positions,
	  	},
	  	{
	  		key: 1,
	  		label: "Number of Trades",
	  		value: sP.timeframeData[timeframe].marketsTraded,
	  	},
	  	{
	  		key: 2,
	  		label: "Markets Traded",
	  		value: sP.timeframeData[timeframe].successfulDisputes,
	  	},
	  	{
	  		key: 3,
	  		label: "Markets Created",
	  		value: sP.timeframeData[timeframe].numberOfTrades,
	  	},
	  	{
	  		key: 4,
	  		label: "Successful Disputes",
	  		value: sP.timeframeData[timeframe].marketsCreated,
	  	},
	  	{
	  		key: 5,
	  		label: "Redeemed Positions",
	  		value: sP.timeframeData[timeframe].redeemedPositions,
	  	}
	];

  	return {
    	...oP,
    	...sP,
    	...dP,
    	properties: properties
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
