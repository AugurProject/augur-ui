import React, { Component } from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import CustomPropTypes from "utils/custom-prop-types";
import Highcharts from "highcharts/highstock";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts-candlestick-highchart.styles";
import { each, isEqual, min, max } from "lodash";

const NumberOfPlotLines = 3;
export default class MarketOutcomeChartsCandlestickHighchart extends Component {
  static propTypes = {
    priceTimeSeries: PropTypes.array.isRequired,
    selectedRange: PropTypes.number.isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    updateHoveredPeriod: PropTypes.func.isRequired,
    marketMax: CustomPropTypes.bigNumber.isRequired,
    marketMin: CustomPropTypes.bigNumber.isRequired
  };

  static defaultProps = {};

  static buildTimePlotLines(periods) {
    if (periods.length === 0) return [];
    const plotLines = [];
    each(periods, period => {
      plotLines.push({
        id: "time-plot-line",
        value: period,
        width: 1,
        className:
          Styles.MarketOutcomeChartsCandlestickHighchart__timestamp_axis,
        color: "#ffffff",
        zIndex: -1
      });
    });

    return plotLines;
  }

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
                mouseOver: evt => this.displayCandleInfoAndPlotViz(evt),
                mouseOut: evt => this.clearCandleInfoAndPlotViz(evt)
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
        navigator: { enabled: true },
        xAxis: {
          labels: {
            style: {
              color: "#ffffff"
            }
          },
          crosshair: {
            width: 0
          },
          lineWidth: 1,
          minorGridLineWidth: 1,
          events: {
            afterSetExtremes: evt => this.buildPlotLinesAfterZoom(evt)
          },
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
            crosshair: {
              snap: false,
              className:
                Styles.MarketOutcomeChartsCandlestickHighchart__plotline_price,
              label: {
                enabled: true,
                backgroundColor: "#665789",
                color: "#ffffff",
                format: "{value:.4f}",
                align: "right",
                y: 12,
                x: 0
              }
            },
            plotLines: []
          },
          {
            min: 0,
            top: "85%",
            height: "15%",
            opposite: true,
            gridLineWidth: 0,
            className:
              Styles.MarketOutcomeChartsCandlestickHighchart__volume_bar,
            plotLines: []
          }
        ],
        tooltip: { enabled: false },
        rangeSelector: {
          enabled: false
        }
      }
    };
    this.buidOptions = this.buidOptions.bind(this);
    this.displayCandleInfoAndPlotViz = this.displayCandleInfoAndPlotViz.bind(
      this
    );
    this.clearCandleInfoAndPlotViz = this.clearCandleInfoAndPlotViz.bind(this);
    this.buildPlotLinesAfterZoom = this.buildPlotLinesAfterZoom.bind(this);
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

  displayCandleInfoAndPlotViz(evt) {
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
      this.updateVolumeBar(true, timestamp);
    }
  }

  clearCandleInfoAndPlotViz(evt) {
    const { updateHoveredPeriod } = this.props;
    const { x: timestamp } = evt.target;

    updateHoveredPeriod({
      open: "",
      close: "",
      high: "",
      low: "",
      volume: ""
    });

    this.chart.xAxis[0].removePlotBand("new-plot-band");
    this.updateVolumeBar(false, timestamp);
  }

  updateVolumeBar(isHover, timestamp) {
    const bar = this.chart.yAxis[1].series[0].data.find(
      d => d && d.x === timestamp
    );
    if (bar) {
      const currentColor = bar.color;
      const color = isHover ? "#665789" : "#161022";
      if (currentColor !== color) {
        bar.update({
          color
        });
      }
    }
  }

  buildPlotLinesAfterZoom(evt) {
    const { priceTimeSeries } = this.props;
    if (!priceTimeSeries || priceTimeSeries.length === 0) return;
    const { userMin, userMax, dataMax, dataMin } = evt;

    each(this.chart.yAxis[0].plotLinesAndBands, line => {
      this.chart.yAxis[0].removePlotLine("plot-line");
    });

    const inRangePriceTimeSeries = priceTimeSeries.filter(
      x =>
        createBigNumber(userMin || dataMin).lt(createBigNumber(x.period)) &&
        createBigNumber(x.period).lt(createBigNumber(userMax || dataMax))
    );

    const plotLines = this.buildPricePlotLines(
      min(inRangePriceTimeSeries.map(x => x.low)),
      max(inRangePriceTimeSeries.map(x => x.high))
    );

    each(plotLines, line => this.chart.yAxis[0].addPlotLine(line));
  }

  buildPricePlotLines(min, max) {
    if (!min || !max) return [];
    const { pricePrecision, marketMin, marketMax } = this.props;
    let minValue = createBigNumber(min);
    let maxValue = createBigNumber(max);
    if (min === max) {
      minValue = marketMin;
      maxValue = marketMax;
    }
    const range = maxValue.minus(minValue);
    const interval = range.dividedBy(NumberOfPlotLines);
    const plotLines = [];
    let startingValue = createBigNumber(minValue);
    for (let i = 0; i < NumberOfPlotLines; i++) {
      startingValue = startingValue.plus(interval);
      plotLines.push({
        id: "plot-line",
        value: startingValue.toFixed(pricePrecision).toString(),
        width: 1,
        className:
          Styles.MarketOutcomeChartsCandlestickHighchart__openClose_axis,
        color: "#ffffff",
        dashStyle: "dash",
        label: {
          color: "#ffffff",
          text: startingValue.toFixed(pricePrecision).toString(),
          align: "right",
          y: 12,
          x: 0
        }
      });
    }
    return plotLines;
  }

  buidOptions(priceTimeSeries, callback) {
    const { options } = this.state;
    const ohlc = [];
    const volume = [];
    each(priceTimeSeries, item => {
      const { period } = item;
      ohlc.push([period, item.open, item.high, item.low, item.close]);
      volume.push([period, item.volume]);
    });

    const plotLines = this.buildPricePlotLines(
      min(priceTimeSeries.map(x => x.low)),
      max(priceTimeSeries.map(x => x.high))
    );

    options.yAxis[0].plotLines = plotLines;

    options.yAxis[1].plotLines = MarketOutcomeChartsCandlestickHighchart.buildTimePlotLines(
      priceTimeSeries.map(x => x.period)
    );

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
          yAxis: 0
        },
        {
          type: "column",
          name: "volume",
          color: "#161022",
          data: volume,
          yAxis: 1
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
