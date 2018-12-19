import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Styles from "modules/market-charts/components/market-outcome--header-orders/market-outcome--header-orders.styles";
import StylesHeader from "modules/market/components/market-outcomes-list/market-outcomes-list.styles";

const MarketOutcomeChartsHeaderOrders = ({
  updatePrecision,
  isMobile,
  headerHeight
}) => (
  <section
    className={Styles.MarketOutcomeChartsHeader__orders}
    style={{ minHeight: isMobile && headerHeight }}
  >
    {isMobile || (
      <div className={StylesHeader.MarketOutcomesList__heading}>
        Order Book
      </div>
    )}
    <div
      className={classNames(
        Styles.MarketOutcomeChartsHeader__stats,
        Styles["MarketOutcomeChartsHeader__stats--orders"]
      )}
    >
      <div className={Styles["MarketOutcomeChartsHeader__stat--right"]} style={{justifyContent: 'flex-start'}}>
        <span className={Styles["MarketOutcomeChartsHeader__stat-title"]}>
          quantity
        </span>
      </div>
      <div className={Styles["MarketOutcomeChartsHeader__stat--right"]} style={{justifyContent: 'center'}}>
        <span className={Styles["MarketOutcomeChartsHeader__stat-title"]}>
          price
        </span>
      </div>
      <div className={Styles["MarketOutcomeChartsHeader__stat--right"]}>
        <span className={Styles["MarketOutcomeChartsHeader__stat-title"]}>
          my quantity
        </span>
      </div>
    </div>
  </section>
);

export default MarketOutcomeChartsHeaderOrders;

MarketOutcomeChartsHeaderOrders.propTypes = {
  updatePrecision: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  headerHeight: PropTypes.number.isRequired
};
