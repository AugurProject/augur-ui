import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { find } from "lodash";

import * as constants from "modules/common-elements/constants";

import AccountOverviewStats from "modules/account/components/account-overview-stats/account-overview-stats";

const timeframeData = {
	[constants.TIMEFRAMES.HOUR]: {
		positions: 2,
		marketsTraded: 5,
		successfulDisputes: 9,
		numberOfTrades: 50,
		marketsCreated: 3,
		redeemedPositions: 5,
	},
	[constants.TIMEFRAMES.DAY]: {
		positions: 5,
		marketsTraded: 10,
		successfulDisputes: 19,
		numberOfTrades: 67,
		marketsCreated: 3,
		redeemedPositions: 6,
	},
	[constants.TIMEFRAMES.WEEK]: {
		positions: 24,
		marketsTraded: 31,
		successfulDisputes: 20,
		numberOfTrades: 100,
		marketsCreated: 9,
		redeemedPositions: 10,
	},
	[constants.TIMEFRAMES.ALL]: {
		positions: 100,
		marketsTraded: 120,
		successfulDisputes: 90,
		numberOfTrades: 372,
		marketsCreated: 39,
		redeemedPositions: 51,
	},
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const mergeProps = (sP, dP, oP) => {
	const timeframe = find(constants.TIMEFRAME_OPTIONS, { id: oP.timeframe }).label;

  	const properties = [
	  	{
	  		key: 0,
	  		label: "Positions",
	  		value: timeframeData[timeframe].positions,
	  	},
	  	{
	  		key: 1,
	  		label: "Number of Trades",
	  		value: timeframeData[timeframe].marketsTraded,
	  	},
	  	{
	  		key: 2,
	  		label: "Markets Traded",
	  		value: timeframeData[timeframe].successfulDisputes,
	  	},
	  	{
	  		key: 3,
	  		label: "Markets Created",
	  		value: timeframeData[timeframe].numberOfTrades,
	  	},
	  	{
	  		key: 4,
	  		label: "Successful Disputes",
	  		value: timeframeData[timeframe].marketsCreated,
	  	},
	  	{
	  		key: 5,
	  		label: "Redeemed Positions",
	  		value: timeframeData[timeframe].redeemedPositions,
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
