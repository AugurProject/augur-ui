import React from "react";

import * as PropTypes from "prop-types";
import { loadCandleStickData } from "src/modules/markets/actions/load-candlestick-data";
import logError from "src/utils/log-error";
import { checkPropsChange } from "src/utils/check-props-change";
import { head } from "lodash";
import {
  clampPeriodByRange,
  defaultRangePeriodDurations
} from "src/modules/markets/helpers/range";
import MarketOutcomeCandlestick from "src/modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick";
import { BigNumber } from "bignumber.js";
import { PERIODS } from "modules/common-elements/constants";

export class Candlestick extends React.Component {
  static propTypes = {
    currentTimeInSeconds: PropTypes.number.isRequired,
    marketId: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    selectedOutcome: PropTypes.string.isRequired,
    lastPrice: PropTypes.string
  };

  static defaultProps = {
    lastPrice: null
  };

  constructor(props) {
    super(props);
    this.state = {
      priceTimeSeries: [],
      selectedPeriod: head(PERIODS).value
    };

    this.getData = this.getData.bind(this);
    this.updateSelectedPeriod = this.updateSelectedPeriod.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      checkPropsChange(prevProps, this.props, [
        "currentTimeInSeconds",
        "selectedOutcome",
        "marketId",
        "lastPrice"
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

  render() {
    const { maxPrice, minPrice, currentTimeInSeconds } = this.props;
    const { priceTimeSeries, selectedPeriod } = this.state;

    return (
      <MarketOutcomeCandlestick
        priceTimeSeries={priceTimeSeries}
        isMobile={false}
        isMobileSmall={false}
        fixedPrecision={4}
        pricePrecision={4}
        selectedPeriod={selectedPeriod}
        updateSelectedPeriod={this.updateSelectedPeriod}
        updateSelectedOrderProperties={() => {}}
        marketMax={maxPrice}
        marketMin={minPrice}
        outcomeName="somename"
        currentTimeInSeconds={currentTimeInSeconds}
      />
    );
  }
}
