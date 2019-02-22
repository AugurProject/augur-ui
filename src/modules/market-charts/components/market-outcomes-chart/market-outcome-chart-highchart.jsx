import React, { Component } from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import Highcharts from "highcharts/highstock";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import Styles from "modules/market-charts/components/market-outcomes-chart/market-outcomes-chart.styles";
import { filter, keys, each, isEqual, cloneDeep } from "lodash";

NoDataToDisplay(Highcharts);

const HIGHLIGHTED_LINE_WIDTH = 2;
const NORMAL_LINE_WIDTH = 1;
const NUM_DAYS_TO_USE_DAY_TIMEFRAME = 2;

export default class MarketOutcomesChartHighchart extends Component {
  static propTypes = {
    maxPrice: PropTypes.number.isRequired,
    minPrice: PropTypes.number.isRequired,
    bucketedPriceTimeSeries: PropTypes.object.isRequired,
    isScalar: PropTypes.bool,
    scalarDenomination: PropTypes.string,
    selectedOutcome: PropTypes.string.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    daysPassed: PropTypes.number
  };

  static defaultProps = {
    isScalar: false,
    daysPassed: 0,
    scalarDenomination: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      containerHeight: 0,
      options: {
        title: {
          text: "",
          y: 50
        },
        lang: {
          noData: "No Completed Trades"
        },
        chart: {
          type: "line",
          styledMode: false,
          animation: false,
          marginTop: 12
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          line: {
            dataGrouping: {
              forced: true,
              units: [["day", [1]]]
            }
          }
        },
        scrollbar: { enabled: false },
        navigator: { enabled: false },
        xAxis: {
          ordinal: false,
          showFirstLabel: true,
          showLastLabel: true,
          labels: {
            format: "{value:%b %d}"
          },
          crosshair: {
            snap: true,
            label: {
              enabled: true,
              format: "{value:%b %d}"
            }
          }
        },
        yAxis: {
          showEmpty: true,
          opposite: false,
          max: createBigNumber(props.maxPrice).toFixed(props.pricePrecision),
          min: createBigNumber(props.minPrice).toFixed(props.pricePrecision),
          showFirstLabel: true,
          showLastLabel: true,
          labels: {
            format: "{value:.4f} <span class='eth-label'>ETH</span>"
          },
          title: {
            text: ""
          },
          height: "100%",
          resize: {
            enabled: true
          },
          crosshair: {
            snap: true,
            label: {
              enabled: true,
              format: "{value:.4f} <span class='eth-label'>ETH</span>"
            }
          }
        },
        tooltip: { enabled: false },
        rangeSelector: {
          enabled: false
        }
      }
    };
    this.buidOptions = this.buidOptions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    const { bucketedPriceTimeSeries, selectedOutcome } = this.props;
    const { containerHeight } = this.state;
    this.buidOptions(
      bucketedPriceTimeSeries,
      selectedOutcome,
      containerHeight,
      options => {
        this.chart = Highcharts.stockChart(this.container, options);
      }
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      !isEqual(
        this.props.bucketedPriceTimeSeries,
        nextProps.bucketedPriceTimeSeries
      ) ||
      !isEqual(this.props.selectedOutcome, nextProps.selectedOutcome) ||
      !isEqual(this.state.containerHeight, nextState.containerHeight)
    ) {
      this.buidOptions(
        nextProps.bucketedPriceTimeSeries,
        nextProps.selectedOutcome,
        nextState.containerHeight
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  onResize = () => {
    this.setState({
      containerHeight: this.container.clientHeight
    });
  };

  getxAxisProperties = daysPassed => {
    const hours = "{value:%H:%M}";
    const days = "{value:%b %d}";
    let interval = 604800; // weekly
    if (daysPassed < 2) interval = 10800; // show every 3rd hour
    if (daysPassed > 14 && daysPassed < 30) interval = 86400;
    return {
      tickInterval: interval * 1000, // add milliseconds
      labels: {
        format: interval === 10800 ? hours : days
      },
      crosshair: {
        snap: true,
        label: {
          enabled: true,
          format: interval === 10800 ? hours : days
        }
      }
    };
  };

  buidOptions(
    bucketedPriceTimeSeries,
    selectedOutcome,
    containerHeight,
    callback
  ) {
    const { options } = this.state;
    const { daysPassed, isScalar, scalarDenomination } = this.props;
    const { priceTimeSeries } = bucketedPriceTimeSeries;
    const timeIncrement =
      daysPassed > NUM_DAYS_TO_USE_DAY_TIMEFRAME ? "day" : "hour";

    const xAxisProperties = this.getxAxisProperties(daysPassed);
    options.xAxis = Object.assign(options.xAxis, xAxisProperties);

    options.height = containerHeight;

    const useArea = priceTimeSeries && keys(priceTimeSeries).length === 1;
    const hasData =
      priceTimeSeries &&
      keys(priceTimeSeries) &&
      filter(keys(priceTimeSeries), key => priceTimeSeries[key].length > 0)
        .length;

    const series = [];
    each(keys(priceTimeSeries), id => {
      series.push({
        type: useArea ? "area" : "line",
        lineWidth:
          selectedOutcome && selectedOutcome === id.toString()
            ? HIGHLIGHTED_LINE_WIDTH
            : NORMAL_LINE_WIDTH,
        data: priceTimeSeries[id].map(pts => [
          pts.timestamp,
          createBigNumber(pts.price).toNumber()
        ])
      });
    });

    if (isScalar && hasData) {
      options.title.text = scalarDenomination;
    }
    options.plotOptions.line.dataGrouping = {
      ...options.plotOptions.line.dataGrouping,
      forced: true,
      units: [[timeIncrement, [1]]]
    };

    const newOptions = Object.assign(options, { series });

    const updatedObjects = cloneDeep(newOptions);
    this.setState({ options: updatedObjects });
    if (this.chart && hasData) {
      this.chart.update(updatedObjects);
    }
    if (callback) callback(updatedObjects);
  }

  render() {
    return (
      <div
        className={Styles.MarketOutcomeChartsHighcharts}
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
