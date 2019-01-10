import React from "react";

import * as PropTypes from "prop-types";
import { loadCandleStickData } from "src/modules/markets/actions/load-candlestick-data";
import logError from "src/utils/log-error";
import { checkPropsChange } from "src/utils/check-props-change";
import {
  clampPeriodByRange,
  defaultRangePeriodDurations
} from "src/modules/markets/helpers/range";
import MarketOutcomeCandlestick from "src/modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick";
import { BigNumber } from "bignumber.js";

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
        period: selectedPeriod,
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
    const { maxPrice, minPrice } = this.props;
    const { priceTimeSeries, selectedPeriod, selectedRange } = this.state;
    return (
      <div>
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
        />
      </div>
    );
  }
}
