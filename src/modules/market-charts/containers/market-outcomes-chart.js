import { connect } from "react-redux";

import MarketOutcomesChartHighchart from "modules/market-charts/components/market-outcomes-chart/market-outcome-chart-highchart";

import { selectMarket } from "modules/markets/selectors/market";
import { selectCurrentTimestamp } from "src/select-state";
import { selectBucketedPriceTimeSeries } from "modules/markets/selectors/select-bucketed-price-time-series";
import { createBigNumber } from "src/utils/create-big-number";
import { convertUnixToFormattedDate } from "src/utils/format-date";

const mapStateToProps = (state, ownProps) => {
  const {
    creationTime = convertUnixToFormattedDate(),
    maxPrice = createBigNumber(1),
    minPrice = createBigNumber(0),
    outcomes = [],
    isYesNo,
    isScalar,
    scalarDenomination = "ETH",
    volume = { formatted: "0" }
  } = selectMarket(ownProps.marketId);

  // (minPrice + ((maxPrice - minPrice) / outcomes.length)
  const adjusted = createBigNumber(maxPrice)
    .minus(minPrice)
    .div(outcomes.length);
  const estimatedInitialPrice = createBigNumber(minPrice)
    .plus(adjusted)
    .toNumber();

  const creationTimestamp = creationTime.value.getTime();
  const currentTimestamp = selectCurrentTimestamp(state) || Date.now();
  const hasPriceHistory = volume.formatted !== "0";
  const bucketedPriceTimeSeries = selectBucketedPriceTimeSeries(
    creationTimestamp,
    currentTimestamp,
    outcomes
  );

  return {
    isMobileSmall: state.appStatus.isMobileSmall,
    creationTime: creationTimestamp,
    currentTimestamp,
    estimatedInitialPrice,
    maxPrice: maxPrice.toNumber(),
    minPrice: minPrice.toNumber(),
    fixedPrecision: 4,
    outcomes,
    hasPriceHistory,
    bucketedPriceTimeSeries,
    isYesNo,
    isScalar,
    scalarDenomination
  };
};

export default connect(mapStateToProps)(MarketOutcomesChartHighchart);
