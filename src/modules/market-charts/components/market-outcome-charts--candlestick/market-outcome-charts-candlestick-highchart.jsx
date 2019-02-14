import React, { Component } from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import CustomPropTypes from "utils/custom-prop-types";
import Highcharts from "highcharts/highstock";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts-candlestick-highchart.styles";
import { each, isEqual, min, max } from "lodash";
import { PERIOD_RANGES } from "modules/common-elements/constants";

const NumberOfPlotLines = 3;
export default class MarketOutcomeChartsCandlestickHighchart extends Component {
  static propTypes = {
    priceTimeSeries: PropTypes.array.isRequired,
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
            },
            format: "{value:%b %d}"
          },
          range: 24 * 3600 * 1000, // day
          crosshair: {
            width: 0,
            snap: true,
            label: {
              enabled: true,
              className:
                Styles.MarketOutcomeChartsCandlestickHighchart__volume_axis,
              color: "#ffffff",
              backgroundColor: "#0F0A19",
              borderColor: "#ffffff",
              format: "{value:%b %d, %H:%M}",
              align: "center",
              y: 0,
              x: 0
            }
          },
          lineWidth: 1,
          minorGridLineWidth: 1,
          plotBands: []
        },
        yAxis: [
          {
            gridLineColor: "#666666",
            className:
              Styles.MarketOutcomeChartsCandlestickHighchart__plotline_price_lines,
            lineColor: "#666666",
            gridLineDashStyle: "dash",
            gridLineWidth: 1,
            minorTickLength: 0,
            tickLength: 0,
            showFirstLabel: true,
            showLastLabel: true,
            labels: {
              color: "#ffffff",
              format: "{value:.4f}",
              align: "right",
              y: 12,
              x: 0
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
              dashStyle: "dash",
              className:
                Styles.MarketOutcomeChartsCandlestickHighchart__openClose_axis,
              label: {
                enabled: true,
                backgroundColor: "#161022",
                color: "#ffffff",
                format: "{value:.4f}",
                align: "right",
                y: 12,
                x: 0
              }
            }
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
    const { priceTimeSeries, selectedPeriod } = this.props;
    this.buidOptions(priceTimeSeries, selectedPeriod, options => {
      this.chart = Highcharts.stockChart(this.container, options);
    });
  }

  componentWillUpdate(nextProps) {
    if (
      !isEqual(this.props.priceTimeSeries, nextProps.priceTimeSeries) ||
      !isEqual(this.props.selectedPeriod, nextProps.selectedPeriod)
    ) {
      this.buidOptions(nextProps.priceTimeSeries, nextProps.selectedPeriod);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  displayCandleInfoAndPlotViz(evt) {
    const { updateHoveredPeriod } = this.props;
    const { x: timestamp, open, close, high, low } = evt.target;
    const { closestPointRange } = evt.target.series.xAxis;
    const range = closestPointRange / 4;

    updateHoveredPeriod({
      open: open ? createBigNumber(open) : "",
      close: close ? createBigNumber(close) : "",
      high: high ? createBigNumber(high) : "",
      low: low ? createBigNumber(low) : "",
      volume: createBigNumber(0)
    });

    const plotBand = {
      id: "new-plot-band",
      from: timestamp - range,
      to: timestamp + range,
      className: Styles.MarketOutcomeChartsCandlestickHighchart__plot_band,
      color: "#C4C4C4",
      thickness: "100%",
      zIndex: -1
    };

    this.chart.xAxis[0].addPlotBand(plotBand);
    // this.updateVolumeBar(true, timestamp);
  }

  clearCandleInfoAndPlotViz(evt) {
    const { updateHoveredPeriod } = this.props;

    updateHoveredPeriod({
      open: "",
      close: "",
      high: "",
      low: "",
      volume: ""
    });

    this.chart.xAxis[0].removePlotBand("new-plot-band");
    // this.updateVolumeBar(false, timestamp);
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
    const { priceTimeSeries, marketMin, marketMax } = this.props;
    if (!priceTimeSeries || priceTimeSeries.length === 0) return;
    const { userMin, userMax, dataMax, dataMin } = evt;

    const inRangePriceTimeSeries = priceTimeSeries.filter(
      x =>
        createBigNumber(userMin || dataMin || marketMin).lt(
          createBigNumber(x.period)
        ) &&
        createBigNumber(x.period).lt(
          createBigNumber(userMax || dataMax || marketMax)
        )
    );

    const plotLines = this.buildPricePlotLines(
      min(inRangePriceTimeSeries.map(x => x.low)),
      max(inRangePriceTimeSeries.map(x => x.high))
    );

    if (plotLines && plotLines.length > 0) {
      each(this.chart.yAxis[0].plotLinesAndBands, line => {
        this.chart.yAxis[0].removePlotLine("plot-line");
      });
      each(plotLines, line => this.chart.yAxis[0].addPlotLine(line));
    }
  }

  buildPricePlotLines(min, max) {
    const { pricePrecision, marketMin, marketMax } = this.props;
    const minValue = createBigNumber(min || marketMin);
    const maxValue = createBigNumber(max || marketMax);
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

  buidOptions(priceTimeSeries, selectedPeriod, callback) {
    const { options } = this.state;
    const groupingUnits = [
      ["minute", [1]],
      ["hour", [1]],
      ["day", [1]],
      ["week", [1]],
      ["month", [1]],
      ["year", [1]]
    ];
    const ohlc = [];
    const volume = [];
    each(priceTimeSeries, item => {
      const { period } = item;
      ohlc.push([period, item.open, item.high, item.low, item.close]);
      volume.push([period, item.volume]);
    });

    const { range } = PERIOD_RANGES[selectedPeriod];
    if (Array.isArray(options.xAxis)) {
      options.xAxis[0].range = range;
    } else {
      options.xAxis.range = range;
    }

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
          color: "#665789",
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
