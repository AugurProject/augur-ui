import React, { Component } from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import Highcharts from "highcharts/highstock";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import Styles from "modules/market-charts/components/market-outcomes-chart/market-outcomes-chart.styles";
import { each, isEqual, cloneDeep } from "lodash";

NoDataToDisplay(Highcharts);

const NUM_DAYS_TO_USE_DAY_TIMEFRAME = 2;
const LINE_COLORS = [
  "#fadca2",
  "#f3a2fa",
  "#ffffff",
  "#fd6266",
  "#a5a5a5",
  "#665cdf",
  "#09cfe1",
  "#5cdf88"
];
export default class MarketOutcomesChartHighchart extends Component {
  static propTypes = {
    creationTime: PropTypes.number.isRequired,
    currentTimestamp: PropTypes.number.isRequired,
    estimatedInitialPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    minPrice: PropTypes.number.isRequired,
    outcomes: PropTypes.array.isRequired,
    hasPriceHistory: PropTypes.bool.isRequired,
    bucketedPriceTimeSeries: PropTypes.object.isRequired,
    isMobileSmall: PropTypes.bool,
    isYesNo: PropTypes.bool,
    isScalar: PropTypes.bool,
    scalarDenomination: PropTypes.string.isRequired,
    selectedOutcome: PropTypes.string.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    daysPassed: PropTypes.number
  };

  static defaultProps = {
    isMobileSmall: false,
    isYesNo: false,
    isScalar: false,
    daysPassed: 0
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
          animation: false
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
    const { outcomes, selectedOutcome } = this.props;
    const { containerHeight } = this.state;
    this.buidOptions(outcomes, selectedOutcome, containerHeight, options => {
      this.chart = Highcharts.stockChart(this.container, options);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      !isEqual(this.props.outcomes, nextProps.outcomes) ||
      !isEqual(this.props.selectedOutcome, nextProps.selectedOutcome) ||
      !isEqual(this.state.containerHeight, nextState.containerHeight)
    ) {
      this.buidOptions(
        nextProps.outcomes,
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

  getTickInterval = daysPassed => {
    let interval = 604800;
    if (daysPassed < 2) interval = 3600;
    if (daysPassed > 14 && daysPassed < 30) interval = 86400;
    return interval * 1000; // add milliseconds
  };

  buidOptions(outcomes, selectedOutcome, containerHeight, callback) {
    const { options } = this.state;
    const { daysPassed, isScalar, scalarDenomination } = this.props;
    const timeIncrement =
      daysPassed > NUM_DAYS_TO_USE_DAY_TIMEFRAME ? "day" : "hour";

    const tickInterval = this.getTickInterval(daysPassed);
    if (tickInterval) {
      options.xAxis = {
        ...options.xAxis,
        tickInterval
      };
    }
    options.height = containerHeight;

    const useArea = outcomes && outcomes.length === 1;

    const hasData =
      outcomes &&
      outcomes.length > 0 &&
      outcomes[0].priceTimeSeries &&
      outcomes[0].priceTimeSeries.length > 0;

    const series = [];
    each(outcomes, outcome => {
      series.push({
        type: useArea ? "area" : "line",
        name: outcome.name,
        color: LINE_COLORS[outcome.id],
        lineWidth: selectedOutcome && selectedOutcome === outcome.id ? 3 : 1,
        data: outcome.priceTimeSeries.map(pts => [
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
