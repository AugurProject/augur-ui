import React, { Component } from "react";
import PropTypes from "prop-types";
import HighchartsReact from "modules/common/components/highcharts/highcharts-react";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts-candlestic.-highchart.styles";
import { each, isEqual } from "lodash";

export default class MarketOutcomeChartsCandlestickHighchart extends Component {
  static propTypes = {
    priceTimeSeries: PropTypes.array.isRequired,
    selectedRange: PropTypes.number.isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    pricePrecision: PropTypes.number.isRequired
  };

  static defaultProps = {};

  static processArray(data) {
    const data2Price = [];
    const data2Volume = [];
    let i = 0;
    const dataLength = data.length;
    for (i; i < dataLength; i += 1) {
      data2Price.push([
        data[i][0], // the date
        data[i][1], // open
        data[i][2], // high
        data[i][3], // low
        data[i][4] // close
      ]);

      data2Volume.push([
        data[i][0], // the date
        data[i][5] // the volume
      ]);
    }
    return { ohlc: data2Price, volume: data2Volume };
  }
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {
          text: ""
        },
        chart: {
          type: "candlestick",
          styledMode: false,
          className: Styles.MarketOutcomeChartsCandlestickHighchart
        }
      }
    };
    this.buidOptions = this.buidOptions.bind(this);
  }

  componentWillMount() {
    const { priceTimeSeries } = this.props;
    this.buidOptions(priceTimeSeries);
  }

  componentWillUpdate(nextProps) {
    if (!isEqual(this.props.priceTimeSeries, nextProps.priceTimeSeries)) {
      this.buidOptions(nextProps.priceTimeSeries);
    }
  }

  buidOptions(priceTimeSeries) {
    const { options } = this.state;

    // set the allowed units for data grouping
    const groupingUnits = [
      [
        "hour", // unit name
        [1] // allowed multiples
      ],
      ["day", [1, 2, 3, 4, 5, 6, 7]]
    ];

    const ohlc = [];
    const volume = [];
    each(priceTimeSeries, item => {
      const { period } = item;
      ohlc.push([period, item.open, item.high, item.low, item.close]);
      volume.push([period, item.volume]);
    });

    const dataOptions = Object.assign(options, {
      yAxis: [
        {
          labels: {
            align: "right",
            x: -3
          },
          className:
            Styles.MarketOutcomeChartsCandlestickHighchart__openClose_axis,
          title: {
            text: ""
          },
          height: "60%",
          lineWidth: 1,
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
          className:
            Styles.MarketOutcomeChartsCandlestickHighchart__volume_axis,
          title: {
            text: ""
          },
          top: "65%",
          height: "35%",
          offset: 0,
          lineWidth: 1
        }
      ],
      tooltip: { enabled: false },
      rangeSelector: {
        enabled: false
      },
      series: [
        {
          type: "candlestick",
          upLineColor: "#00F1C4",
          downLineColor: "#FF7D5E",
          lineWidth: "1",
          name: "Market",
          data: ohlc,
          dataGrouping: {
            units: groupingUnits
          }
        },
        {
          type: "column",
          name: "Volume",
          data: volume,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        }
      ]
    });

    this.setState({ options: dataOptions });
  }
  render() {
    const { options } = this.state;

    return <HighchartsReact options={options} />;
  }
}
