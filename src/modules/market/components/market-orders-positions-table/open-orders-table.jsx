/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";

import MarketPositionsListOrphanedOrder from "modules/market/components/market-positions-list--orphaned-order/market-positions-list--orphaned-order";
import OpenOrdersOrder from "modules/market/components/market-orders-positions-table/open-orders-table--orders";

import Styles from "modules/market/components/market-orders-positions-table/open-orders-table.style";

const OpenOrdersTable = ({
  openOrders,
  orphanedOrders,
  cancelOrphanedOrder, 
  isMobile
}) => (
  <div>
    <div className={Styles.MarketOpenOrdersList__table}>
      <ul className={Styles["MarketOpenOrdersList__table-header"]}>
        {!isMobile && <li>Outcome</li>}
        <li>Type</li>
        <li>
          <span>Quantity</span>
        </li>
        <li>Price</li>
        <li>Escrowed ETH</li>
        <li>Escrowed Shares</li>
        <li>
          <span>Action</span>
        </li>
      </ul>
      {openOrders.length === 0 &&
        orphanedOrders.length === 0 && (
          <div className={Styles.MarketOpenOrdersList__empty} />
        )}
      <div className={Styles.MarketOpenOrdersList__scrollContainer}>
        {(openOrders.length > 0 || orphanedOrders.length > 0) && (
          <div className={Styles["MarketOpenOrdersList__table-body"]}>
            {openOrders.map((order, i) => (
              <OpenOrdersOrder
                key={i}
                outcomeName={order.name}
                order={order}
                pending={order.pending}
                isExtendedDisplay={false}
                isMobile={false}
              />
            ))}
            {(orphanedOrders || []).map(order => (
              <MarketPositionsListOrphanedOrder
                key={order.orderId}
                outcomeName={order.outcomeName || order.outcome}
                order={order}
                pending={false}
                isExtendedDisplay={false}
                outcome={order}
                cancelOrphanedOrder={cancelOrphanedOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    <div className={Styles.MarketOpenOrdersList__footer} />
  </div>
);

OpenOrdersTable.propTypes = {
  openOrders: PropTypes.array,
  orphanedOrders: PropTypes.array.isRequired,
  cancelOrphanedOrder: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

OpenOrdersTable.defaultProps = {
  openOrders: [],
  isMobile: false
};

export default OpenOrdersTable;
