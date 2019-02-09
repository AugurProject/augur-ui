import React, { Component } from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import Highcharts from "highcharts/highstock";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts-candlestick-highchart.styles";
import { each, isEqual } from "lodash";

export default class MarketOutcomeChartsCandlestickHighchart extends Component {
  static propTypes = {
    priceTimeSeries: PropTypes.array.isRequired,
    selectedRange: PropTypes.number.isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    updateHoveredPeriod: PropTypes.func.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {
          text: ""
        },
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: evt => this.displayCandleInfo(evt),
                mouseOut: evt => this.clearCandleInfo(evt)
              }
            }
          }
        },
        chart: {
          type: "candlestick",
          styledMode: false,
          backgroundColor: "#211a32",
          zoomType: "x",
          style: {
            color: "#ffffff",
            fontFamily: "'Roboto Mono', monospace"
          }
        },
        scrollbar: { enabled: false },
        navigator: { enabled: false },
        xAxis: {
          labels: {
            style: {
              color: "#ffffff"
            }
          },
          lineWidth: 1,
          minorGridLineWidth: 1,
          plotBands: []
        },
        yAxis: [
          {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: "transparent",
            gridLineWidth: 0,
            minorTickLength: 0,
            tickLength: 0,
            showFirstLabel: true,
            showLastLabel: true,
            labels: {
              enabled: false
            },
            title: {
              text: ""
            },
            height: "100%",
            resize: {
              enabled: true
            },
            plotLines: [
              // to be dynamically created
              // https://www.highcharts.com/docs/chart-concepts/plot-bands-and-plot-lines
              {
                value: 0.2,
                width: 1,
                color: "#ffffff",
                dashStyle: "dash",
                label: {
                  text: "0.2000",
                  align: "right",
                  y: 12,
                  x: 0
                }
              },
              {
                value: 0.4,
                width: 1,
                color: "#ffffff",
                dashStyle: "dash",
                label: {
                  text: "0.4000",
                  align: "right",
                  y: 12,
                  x: 0
                }
              },
              {
                value: 0.6,
                width: 1,
                color: "#ffffff",
                dashStyle: "dash",
                label: {
                  text: "0.6000",
                  align: "right",
                  y: 12,
                  x: 0
                }
              },
              {
                value: 0.8,
                width: 1,
                color: "#ffffff",
                dashStyle: "dash",
                label: {
                  text: "0.8000",
                  align: "right",
                  y: 12,
                  x: 0
                }
              }
            ]
          },
          {
            min: 0,
            top: "85%",
            height: "15%",
            opposite: true,
            gridLineColor: "#211a32"
          }
        ],
        tooltip: { enabled: false },
        rangeSelector: {
          enabled: false
        }
      }
    };
    this.buidOptions = this.buidOptions.bind(this);
    this.displayCandleInfo = this.displayCandleInfo.bind(this);
    this.clearCandleInfo = this.clearCandleInfo.bind(this);
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

  displayCandleInfo(evt) {
    const { updateHoveredPeriod, priceTimeSeries } = this.props;
    const { x: timestamp } = evt.target;
    const { pointRange } = this.chart.axes[0];
    const pts = priceTimeSeries.find(p => p.period === timestamp);
    if (pts) {
      const range = pointRange / 4;
      updateHoveredPeriod({
        open: createBigNumber(pts.open),
        close: createBigNumber(pts.close),
        high: createBigNumber(pts.high),
        low: createBigNumber(pts.low),
        volume: pts && createBigNumber(pts.volume)
      });
      const plotBand = {
        id: "new-plot-band",
        from: timestamp - range,
        to: timestamp + range,
        className: Styles.MarketOutcomeChartsCandlestickHighchart__plot_band,
        color: "#C4C4C4",
        zIndex: -1
      };
      this.chart.xAxis[0].addPlotBand(plotBand);
    }
  }

  clearCandleInfo(evt) {
    const { updateHoveredPeriod } = this.props;
    updateHoveredPeriod({
      open: "",
      close: "",
      high: "",
      low: "",
      volume: ""
    });
    this.chart.xAxis[0].removePlotBand("new-plot-band");
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
      ohlc.push([
        period,
        item.open,
        item.high,
        item.low,
        item.close,
        item.volume
      ]);
      volume.push([period, item.volume]);
    });

    const newOptions = Object.assign(options, {
      series: [
        {
          type: "candlestick",
          upLineColor: "#00F1C4",
          upColor: "transparent",
          color: "#FF7D5E",
          lineColor: "#FF7D5E",
          lineWidth: "1",
          name: "ohlc",
          data: ohlc,
          yAxis: 0,
          dataGrouping: {
            units: groupingUnits
          }
        },
        {
          type: "column",
          name: "volume",
          color: "#161022",
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
