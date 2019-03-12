/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";

import FilledOrder from "modules/portfolio/components/common/rows/filled-order";
import FilledOrdersHeader from "modules/portfolio/components/common/headers/filled-orders-header";

import Styles from "modules/market/components/market-orders-positions-table/open-orders-table.style";

const FilledOrdersTable = ({ filledOrders, isMobile, scalarDenomination }) => (
  <div>
    <div className={Styles.MarketOpenOrdersList__table}>
      <FilledOrdersHeader extendedView />
      {filledOrders.length === 0 && (
        <div className={Styles.MarketOpenOrdersList__empty} />
      )}
      <div className={Styles.MarketOpenOrdersList__scrollContainer}>
        {filledOrders.length > 0 && (
          <div className={Styles["MarketOpenOrdersList__table-body"]}>
            {filledOrders.map((order, i) => (
              <FilledOrder key={i} filledOrder={order} extendedView />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

FilledOrdersTable.propTypes = {
  filledOrders: PropTypes.array,
  isMobile: PropTypes.bool,
  scalarDenomination: PropTypes.string
};

FilledOrdersTable.defaultProps = {
  filledOrders: [],
  isMobile: false,
  scalarDenomination: ""
};

export default FilledOrdersTable;
