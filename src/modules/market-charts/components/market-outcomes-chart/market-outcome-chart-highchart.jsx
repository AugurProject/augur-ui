import React, { Component } from "react";
import PropTypes from "prop-types";
import { createBigNumber } from "utils/create-big-number";
import Highcharts from "highcharts/highstock";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts-candlestick-highchart.styles";
import { isEqual, cloneDeep } from "lodash";

NoDataToDisplay(Highcharts);

const ShowNavigator = 350;
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
    pricePrecision: PropTypes.number.isRequired
  };

  static defaultProps = {
    isMobileSmall: false,
    isYesNo: false,
    isScalar: false
  };

  constructor(props) {
    super(props);
    this.state = {
      containerHeight: 400,
      options: {
        title: {
          text: ""
        },
        lang: {
          noData: "No Completed Trades"
        },
        chart: {
          type: "line",
          styledMode: false,
          animation: false
        },
        scrollbar: { enabled: false },
        navigator: { enabled: false },
        yAxis: {
          showEmpty: true,
          max: createBigNumber(props.maxPrice).toFixed(props.pricePrecision),
          min: createBigNumber(props.minPrice).toFixed(props.pricePrecision),
          showFirstLabel: true,
          showLastLabel: true,
          labels: {
            format: "{value:.4f} <span class='eth-label'>ETH</span>",
            align: "left",
            y: 0,
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
            label: {
              enabled: true,
              format: "{value:.4f} <span class='eth-label'>ETH</span>",
              align: "left",
              y: 0,
              x: 0
            }
          }
        },
        tooltip: { enabled: true },
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
      containerHeight: this.container.containerWidth
    });
  };

  buidOptions(outcomes, selectedOutcome, containerHeight, callback) {
    const { options } = this.state;
    options.height = containerHeight;
    // figure out why options has dropped properties
    if (containerHeight > 0) {
      options.navigator.enabled = containerHeight > ShowNavigator;
    }

    const data2 =
      outcomes &&
      outcomes.length > 0 &&
      outcomes[0].priceTimeSeries.map(pts => [
        pts.timestamp,
        createBigNumber(pts.price).toNumber()
      ]);

    const series = [
      {
        type: "line",
        name: "",
        data: data2.length > 0 ? data2 : []
      }
    ];

    /*
    const series = [];
    each(outcomes, outcome => {
      series.push({
        type: "line",
        name: outcome.name,
        data: outcome.priceTimeSeries.map(pts => [
          pts.timestamp,
          createBigNumber(pts.price).toNumber()
        ])
      });
    });
*/
    const newOptions = Object.assign(options, { series });

    const updatedObjects = cloneDeep(newOptions);
    this.setState({ options: updatedObjects });
    if (this.chart) {
      this.chart.update(updatedObjects);
    }
    if (callback) callback(updatedObjects);
  }

  render() {
    return (
      <div
        className={Styles.MarketOutcomeChartsCandlestickHighcharts}
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
