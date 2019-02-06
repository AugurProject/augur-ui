import React from "react";

import * as PropTypes from "prop-types";
import { loadCandleStickData } from "src/modules/markets/actions/load-candlestick-data";
import logError from "src/utils/log-error";
import { checkPropsChange } from "src/utils/check-props-change";
import {
  clampPeriodByRange,
  defaultRangePeriodDurations
} from "src/modules/markets/helpers/range";
// import MarketOutcomeCandlestick from "src/modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick";
import { BigNumber } from "bignumber.js";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export class Candlestick extends React.Component {
  static propTypes = {
    currentTimeInSeconds: PropTypes.number.isRequired,
    marketId: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    selectedOutcome: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    const { range, period } = defaultRangePeriodDurations;
    this.state = {
      priceTimeSeries: [],
      selectedPeriod: period,
      selectedRange: range
    };

    this.getData = this.getData.bind(this);
    this.updateSelectedPeriod = this.updateSelectedPeriod.bind(this);
    this.updateSelectedRange = this.updateSelectedRange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      checkPropsChange(prevProps, this.props, [
        "currentTimeInSeconds",
        "selectedOutcome",
        "marketId"
      ]) ||
      checkPropsChange(prevState, this.state, ["selectedPeriod"])
    ) {
      this.getData();
    }
  }

  getData() {
    const { currentTimeInSeconds, marketId, selectedOutcome } = this.props;
    const { selectedPeriod } = this.state;

    loadCandleStickData(
      {
        marketId,
        period: 3600,
        end: currentTimeInSeconds,
        outcome: selectedOutcome
      },
      (err, data) => {
        if (err) return logError(err);

        const priceTimeSeries = data[selectedOutcome] || [];
        this.setState({
          priceTimeSeries
        });
      }
    );
  }

  updateSelectedPeriod(selectedPeriod) {
    this.setState({
      selectedPeriod
    });
  }

  updateSelectedRange(selectedRange) {
    const selectedPeriod = clampPeriodByRange(
      selectedRange,
      this.state.selectedPeriod
    );
    this.setState({
      selectedPeriod,
      selectedRange
    });
  }

  render() {
    const { maxPrice, minPrice, currentTimeInSeconds } = this.props;
    const { priceTimeSeries, selectedPeriod, selectedRange } = this.state;
    const groupingUnits = [
      ["minute", [1]],
      ["hour", [1]],
      ["day", [1]],
      ["week", [1]],
      ["month", [1]]
    ];
    const options = {
      title: {
        text: ""
      },
      chart: {
        zoomType: "x"
      },
      yAxis: [
        {
          labels: {
            align: "right",
            x: -3
          },
          title: {
            text: ""
          },
          height: "60%",
          lineWidth: 2,
          resize: {
            enabled: true
          }
        },
        {
          // volume
          labels: {
            align: "right",
            x: -3
          },
          title: {
            text: ""
          },
          top: "65%",
          height: "35%",
          offset: 0,
          lineWidth: 2
        }
      ],
      tooltip: { split: true },
      rangeSelector: {
        selected: 1
      },
      series: [
        {
          type: "candlestick",
          name: "Market",
          data: priceTimeSeries.map(item => [
            item.period,
            item.open,
            item.high,
            item.low,
            item.close
          ]),
          dataGrouping: {
            units: groupingUnits,
            dateTimeLabelFormats: {
              minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
              hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
              day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
              week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
              month: ["%B %Y", "%B", "-%B %Y"],
              year: ["%Y", "%Y", "-%Y"]
            }
          }
        },
        {
          type: "column",
          name: "Volume",
          data: priceTimeSeries.map(i => [i.period, i.volume]),
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        }
      ]
    };

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
      /*
      <MarketOutcomeCandlestick
        priceTimeSeries={priceTimeSeries}
        isMobile={false}
        isMobileSmall={false}
        fixedPrecision={4}
        pricePrecision={4}
        selectedPeriod={selectedPeriod}
        selectedRange={selectedRange}
        updateSelectedPeriod={this.updateSelectedPeriod}
        updateSelectedRange={this.updateSelectedRange}
        updateSelectedOrderProperties={() => {}}
        marketMax={maxPrice}
        marketMin={minPrice}
        outcomeName="someanem"
        currentTimeInSeconds={currentTimeInSeconds}
      />
      */
    );
  }
}
