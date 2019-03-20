import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "utils/custom-prop-types";
import {
  PERIODS,
  VOLUME_ETH_SHARES,
  ETH
} from "modules/common-elements/constants";
import {
  SquareDropdown,
  StaticLabelDropdown
} from "modules/common-elements/selection";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick.styles";
import MarketOutcomeChartsCandlestickHighchart from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts-candlestick-highchart";
import { CandlestickOchl } from "modules/market-charts/components/market-outcome-charts--candlestick/candlestick-ochl";

class MarketOutcomeCandlestick extends React.PureComponent {
  static propTypes = {
    fixedPrecision: PropTypes.number.isRequired,
    isMobile: PropTypes.bool,
    marketMax: CustomPropTypes.bigNumber.isRequired,
    marketMin: CustomPropTypes.bigNumber.isRequired,
    priceTimeSeries: PropTypes.array.isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    updateSelectedPeriod: PropTypes.func.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    currentTimeInSeconds: PropTypes.number.isRequired
  };

  static defaultProps = {
    isMobile: false
  };

  constructor(props) {
    super(props);

    this.state = {
      containerHeight: 0,
      hoveredPeriod: {},
      volumeType: ETH,
      defaultCandlePeriod: props.selectedPeriod
    };

    this.getContainerWidths = this.getContainerWidths.bind(this);
    this.updateContainerWidths = this.updateContainerWidths.bind(this);
    this.updateHoveredPeriod = this.updateHoveredPeriod.bind(this);
    this.updateVolumeType = this.updateVolumeType.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateContainerWidths);
  }

  componentWillReceiveProps(nextProps) {
    const containerWidths = this.getContainerWidths();

    this.setState({
      ...containerWidths
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateContainerWidths);
  }

  getContainerWidths() {
    return {
      containerWidth: this.drawContainer.clientWidth,
      containerHeight: this.drawContainer.clientHeight
    };
  }

  updateVolumeType(value) {
    this.setState({
      volumeType: value
    });
  }

  updateContainerWidths() {
    this.setState(this.getContainerWidths());
  }

  updateHoveredPeriod(hoveredPeriod) {
    this.setState({
      hoveredPeriod
    });
  }

  render() {
    const {
      fixedPrecision,
      pricePrecision,
      isMobile,
      priceTimeSeries,
      selectedPeriod,
      updateSelectedPeriod,
      marketMin,
      marketMax,
      currentTimeInSeconds
    } = this.props;

    const {
      hoveredPeriod,
      volumeType,
      containerHeight,
      defaultCandlePeriod
    } = this.state;

    return (
      <section className={Styles.MarketOutcomeCandlestick}>
        <div className={Styles.MarketOutcomeChartsHeader__chart__interaction}>
          <div
            className={classNames({
              [Styles.MarketOutcomeChartsHeader__selector__mobile]: isMobile
            })}
          >
            <SquareDropdown
              defaultValue={defaultCandlePeriod}
              options={PERIODS}
              onChange={updateSelectedPeriod}
              sortByStyles={{ minWidth: "78px" }}
            />
          </div>
          <CandlestickOchl
            hoveredPeriod={hoveredPeriod}
            pricePrecision={pricePrecision}
          />
          <div
            className={classNames(
              Styles.MarketOutcomeChartsHeader__label_container,
              {
                [Styles.MarketOutcomeChartsHeader__label_hover]: !!hoveredPeriod.volume
              }
            )}
          >
            <StaticLabelDropdown
              options={VOLUME_ETH_SHARES}
              sortByStyles={{ minWidth: "150px" }}
              staticLabel={
                hoveredPeriod.volume
                  ? `V: ${hoveredPeriod.volume
                      .toFixed(fixedPrecision)
                      .toString()}`
                  : "Show Volume in "
              }
              onChange={this.updateVolumeType}
            />
          </div>
        </div>
        <div
          ref={drawContainer => {
            this.drawContainer = drawContainer;
          }}
          className={Styles.MarketOutcomeCandlestick__container}
        >
          <MarketOutcomeChartsCandlestickHighchart
            priceTimeSeries={priceTimeSeries}
            selectedPeriod={selectedPeriod}
            pricePrecision={pricePrecision}
            updateHoveredPeriod={this.updateHoveredPeriod}
            marketMin={marketMin}
            marketMax={marketMax}
            volumeType={volumeType}
            containerHeight={containerHeight}
            currentTimeInSeconds={currentTimeInSeconds}
          />
        </div>
      </section>
    );
  }
}

export default MarketOutcomeCandlestick;
