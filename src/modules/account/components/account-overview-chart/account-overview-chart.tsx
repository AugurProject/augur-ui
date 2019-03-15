import React from "react";

import * as constants from "modules/common-elements/constants";
import { createBigNumber } from "utils/create-big-number";
import { EthIcon } from "modules/common-elements/icons";
import AccountProfitLossChart from "modules/account/components/account-overview-chart/account-profit-loss-chart";
import { MovementLabel } from "modules/common-elements/labels";
import Styles from "modules/account/components/account-overview-chart/account-overview-chart.styles";
import { formatEther } from "utils/format-number";

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
  profitLossData: Array<Array<number>>;
  profitLossChange: string | null;
  profitLossValue: string | null;
  profitLossChangeHasValue: boolean;
}

export default class AccountOverviewChart extends React.Component<
  AccountOverviewChartProps,
  AccountOverviewChartState
> {
  state: AccountOverviewChartState = {
    profitLossData: [],
    profitLossChange: null,
    profitLossValue: null,
    profitLossChangeHasValue: false
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
        const profitLossChange = "0.0000";
        const profitLossChangeHasValue = !createBigNumber(profitLossChange).eq(
          constants.ZERO
        );
        this.setState({
          profitLossData,
          profitLossChange,
          profitLossChangeHasValue,
          profitLossValue: formatEther("0.0000").formatted
        });
      }
    );
  };

  container: Object | null = null;

  render() {
    const {
      profitLossData,
      profitLossChange,
      profitLossValue,
      profitLossChangeHasValue
    } = this.state;
    let content = null;

    if (profitLossData.length === 0) {
      content = (
        <div>
          <div>{constants.PROFIT_LOSS_CHART_TITLE}</div>
          <span>No Trading Activity to date</span>
        </div>
      );
    } else {
      content = (
        <React.Fragment>
          <div>{constants.PROFIT_LOSS_CHART_TITLE}</div>
          <div>
            <MovementLabel
              showColors
              showIcon={profitLossChangeHasValue}
              showPlusMinus
              value={profitLossChange}
              size="medium"
            />
          </div>
          <div>
            {profitLossValue}
            {EthIcon}
          </div>
          <AccountProfitLossChart
            data={profitLossData}
            width={this.container.clientWidth}
          />
        </React.Fragment>
      );
    }
    return (
      <div
        className={Styles.AccountOverviewChart}
        ref={container => {
          this.container = container;
        }}
      >
        {content}
      </div>
    );
  }
}
