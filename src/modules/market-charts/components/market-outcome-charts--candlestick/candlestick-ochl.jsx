import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StylesHeader from "modules/market-charts/components/market-outcome-charts--header/market-outcome-charts--header.styles";
import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick.styles";

export const CandlestickOchl = ({ hoveredPeriod, pricePrecision }) => (
  <div
    className={classNames(
      StylesHeader.MarketOutcomeChartsHeader__stats,
      Styles.MarketOutcomeChartsHeader__stats
    )}
  >
    <span
      className={classNames(
        StylesHeader.MarketOutcomeChartsHeader__stat,
        Styles.MarketOutcomeChartsHeader__stat
      )}
    >
      {hoveredPeriod.open && (
        <>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
            o:
          </span>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
            {hoveredPeriod.open.toFixed(pricePrecision).toString()}
          </span>
        </>
      )}
    </span>
    <span
      className={classNames(
        StylesHeader.MarketOutcomeChartsHeader__stat,
        Styles.MarketOutcomeChartsHeader__stat
      )}
    >
      {hoveredPeriod.close && (
        <>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
            c:
          </span>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
            {hoveredPeriod.close.toFixed(pricePrecision).toString()}
          </span>
        </>
      )}
    </span>
    <span
      className={classNames(
        StylesHeader.MarketOutcomeChartsHeader__stat,
        Styles.MarketOutcomeChartsHeader__stat
      )}
    >
      {hoveredPeriod.high && (
        <>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
            h:
          </span>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
            {hoveredPeriod.high.toFixed(pricePrecision).toString()}
          </span>
        </>
      )}
    </span>
    <span
      className={classNames(
        StylesHeader.MarketOutcomeChartsHeader__stat,
        Styles.MarketOutcomeChartsHeader__stat
      )}
    >
      {hoveredPeriod.low && (
        <>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-title`]}>
            l:
          </span>
          <span className={Styles[`MarketOutcomeChartsHeader__stat-value`]}>
            {hoveredPeriod.low.toFixed(pricePrecision).toString()}
          </span>
        </>
      )}
    </span>
  </div>
);

CandlestickOchl.propTypes = {
  hoveredPeriod: PropTypes.object,
  pricePrecision: PropTypes.number.isRequired
};

CandlestickOchl.defaultProps = {
  hoveredPeriod: {}
};
