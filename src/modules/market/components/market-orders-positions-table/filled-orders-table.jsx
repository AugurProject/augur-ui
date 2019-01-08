/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MarketPositionsListOrphanedOrder from "modules/market/components/market-positions-list--orphaned-order/market-positions-list--orphaned-order";
import FilledOrdersOrder from "modules/market/components/market-orders-positions-table/filled-orders-table--orders";

import Styles from "modules/market/components/market-orders-positions-table/open-orders-table.style";

const FilledOrdersTable = ({ filledOrders, isMobile }) => (
  <div>
    <div className={Styles.MarketOpenOrdersList__table}>
      <ul
        className={classNames(
          Styles["MarketOpenOrdersList__table-header"],
          Styles["MarketFilledOrdersList__table-header"]
        )}
      >
        {!isMobile && <li>Outcome</li>}
        <li>Type</li>
        <li>
          <span>Quantity</span>
        </li>
        <li>Price</li>
        <li>Fill Date</li>
        <li>No. of Fills</li>
      </ul>
      {filledOrders.length === 0 && (
        <div className={Styles.MarketOpenOrdersList__empty} />
      )}
      <div className={Styles.MarketOpenOrdersList__scrollContainer}>
        {filledOrders.length > 0 && (
          <div className={Styles["MarketOpenOrdersList__table-body"]}>
            {filledOrders.map((order, i) => (
              <FilledOrdersOrder key={i} order={order} isMobile={isMobile} />
            ))}
          </div>
        )}
      </div>
    </div>
    <div className={Styles.MarketOpenOrdersList__footer} />
  </div>
);

FilledOrdersTable.propTypes = {
  filledOrders: PropTypes.array,
  isMobile: PropTypes.bool,
};

FilledOrdersTable.defaultProps = {
  filledOrders: [],
  isMobile: false,
};

export default FilledOrdersTable;
