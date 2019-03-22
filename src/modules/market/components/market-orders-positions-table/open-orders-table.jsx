/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";

import MarketPositionsListOrphanedOrder from "modules/market/components/market-positions-table--orphaned-order/market-positions-table--orphaned-order";
import OpenOrder from "modules/portfolio/containers/open-order";
import OpenOrdersHeader from "modules/portfolio/components/common/headers/open-orders-header";

import Styles from "modules/market/components/market-orders-positions-table/open-orders-table.style";

const OpenOrdersTable = ({
  openOrders,
  orphanedOrders,
  cancelOrphanedOrder,
  isMobile,
  market
}) => (
  <div>
    <div className={Styles.MarketOpenOrdersList__table}>
      <OpenOrdersHeader extendedView />
      {openOrders.length === 0 &&
        orphanedOrders.length === 0 && (
          <div className={Styles.MarketOpenOrdersList__empty} />
        )}
      <div className={Styles.MarketOpenOrdersList__scrollContainer}>
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
        {(openOrders.length > 0 || orphanedOrders.length > 0) && (
          <div className={Styles["MarketOpenOrdersList__table-body"]}>
            {openOrders.map((order, i) => (
              <OpenOrder
                key={"openOrder_" + i}
                openOrder={order}
                extendedView={!isMobile}
                isSingle={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

OpenOrdersTable.propTypes = {
  openOrders: PropTypes.array,
  orphanedOrders: PropTypes.array.isRequired,
  cancelOrphanedOrder: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  market: PropTypes.object.isRequired
};

OpenOrdersTable.defaultProps = {
  openOrders: [],
  isMobile: false
};

export default OpenOrdersTable;
