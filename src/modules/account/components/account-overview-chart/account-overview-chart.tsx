import React from "react";

import * as constants from "modules/common-elements/constants";
import { createBigNumber } from "utils/create-big-number";
import { EthIcon } from "modules/common-elements/icons";
import AccountProfitLossChart from "modules/account/components/account-overview-chart/account-profit-loss-chart";
import { MovementLabel } from "modules/common-elements/labels";
import Styles from "modules/account/components/account-overview/account-overview.styles";

export interface AccountOverviewChartProps {
  universe: string;
  currentAugurTimestamp: number;
  timeframe: number;
  getProfitLoss: Function;
}

interface TimeFrameOption {
  label: string;
  periodInterval: number;
  id: number;
}

export interface UserTimeRangeData {
  timestamp: number;
  total: number;
}

interface AccountOverviewChartState {
  timeRangeDataConfig: TimeFrameOption;
  profitLossData: Array<Array<number>>;
  profitLossPercentage: string | null;
  profitLossValue: string | null;
}

export default class AccountOverviewChart extends React.Component<
  AccountOverviewChartProps,
  AccountOverviewChartState
> {
  state: AccountOverviewChartState = {
    timeRangeDataConfig: constants.TIMEFRAME_OPTIONS[this.props.timeframe],
    profitLossData: [],
    profitLossPercentage: null,
    profitLossValue: null
  };

  componentDidMount = () => {
    if (this.props.timeframe !== undefined) {
      // not sure why this prop is undefined
      const timeRangeDataConfig =
        constants.TIMEFRAME_OPTIONS[this.props.timeframe];
      this.getChartData(timeRangeDataConfig);
    }
  };

  componentDidUpdate = (nextProps: AccountOverviewChartProps) => {
    if (nextProps.timeframe !== this.props.timeframe) {
      const timeRangeDataConfig =
        constants.TIMEFRAME_OPTIONS[nextProps.timeframe];
      this.getChartData(timeRangeDataConfig);
    }
  };

  getChartData = (timeRangeDataConfig: TimeFrameOption) => {
    const { universe, currentAugurTimestamp } = this.props;
    const startTime =
      currentAugurTimestamp - timeRangeDataConfig.periodInterval;
    const endTime = currentAugurTimestamp;
    this.props.getProfitLoss(
      universe,
      startTime,
      endTime,
      null,
      null,
      (err: string, data: Array<UserTimeRangeData>) => {
        if (err) return console.log("Error:", err);
        let profitLossData: Array<Array<number>> = [];
        const chartValues = data.map(d => [
          d.timestamp * 1000,
          createBigNumber(d.total).toNumber()
        ]);
        profitLossData = profitLossData.concat(chartValues);
        profitLossData.push([
          endTime * 1000,
          createBigNumber(data[data.length - 1].total).toNumber()
        ]);
        // todo: get percentage and value
        this.setState({
          profitLossData,
          profitLossPercentage: "33.33",
          profitLossValue: "10"
        });
      }
    );
  };

  render() {
    const {
      profitLossData,
      profitLossPercentage,
      profitLossValue
    } = this.state;
    return (
      <div className={Styles.AccountOverviewChart}>
        <div>{constants.PROFIT_LOSS_CHART_TITLE}</div>
        {profitLossData.length === 0 && (
          <span>No Trading Activity to date</span>
        )}
        {profitLossData.length > 0 && (
          <div>
            <div>
              <MovementLabel
                showColors
                showIcon
                value={profitLossPercentage}
                size="medium"
              />
              <div>
                {profitLossValue}
                {EthIcon}
              </div>
            </div>
            <AccountProfitLossChart data={profitLossData} />
          </div>
        )}
      </div>
    );
  }
}
