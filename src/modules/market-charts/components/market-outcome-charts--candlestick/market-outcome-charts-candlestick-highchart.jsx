import React, { Component } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts/highstock";
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
          backgroundColor: "#211a32",
          zoomType: "x",
          className: Styles.MarketOutcomeChartsCandlestickHighchart
        },
        xAxis: {
          labels: {
            style: {
              color: "#E0E0E3"
            }
          },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
          tickColor: "#707073"
        },
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
        }
      }
    };
    this.buidOptions = this.buidOptions.bind(this);
  }

  componentDidMount() {
    const { priceTimeSeries } = this.props;
    this.buidOptions(priceTimeSeries, options => {
      this.chart = Highcharts.stockChart(this.container, options);
    });
  }

  componentWillUpdate(nextProps) {
    if (!isEqual(this.props.priceTimeSeries, nextProps.priceTimeSeries)) {
      this.buidOptions(nextProps.priceTimeSeries);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  buidOptions(priceTimeSeries, callback) {
    const { options } = this.state;

    // set the allowed units for data grouping
    const groupingUnits = [
      ["minute", [30]],
      ["hour", [1, 2, 3, 4, 6, 8, 12]],
      ["day", [1]],
      ["week", [1]],
      ["month", [1, 3, 6]],
      ["year", [1]]
    ];
    const ohlc = [];
    const volume = [];
    each(priceTimeSeries, item => {
      const { period } = item;
      ohlc.push([period, item.open, item.high, item.low, item.close]);
      volume.push([period, item.volume]);
    });

    const newOptions = Object.assign(options, {
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

    this.setState({ options: newOptions });
    if (this.chart) {
      this.chart.update(newOptions);
    }
    if (callback) callback(newOptions);
  }

  render() {
    return (
      <div
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
