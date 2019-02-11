/* eslint react/no-array-index-key: 0 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MarketPositionsListOrphanedOrder from "modules/market/components/market-positions-table--orphaned-order/market-positions-table--orphaned-order";
import OpenOrdersOrder from "modules/market/components/market-orders-positions-table/open-orders-table--orders";
import { SCALAR } from "modules/common-elements/constants";

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
      <ul
        className={classNames(
          Styles["MarketOpenOrdersList__table-header"],
          Styles["MarketOpenOrdersList__order-header"]
        )}
      >
        {!isMobile && <li>Outcome</li>}
        <li>Type</li>
        <li>
          <span>Quantity</span>
        </li>
        <li>Price</li>
        <li>Escrowed ETH</li>
        <li>Escrowed Shares</li>
        {!isMobile && (
          <li>
            <span>Action</span>
          </li>
        )}
      </ul>
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
              <OpenOrdersOrder
                key={i}
                outcomeName={
                  market.marketType === SCALAR
                    ? market.scalarDenomination
                    : order.name
                }
                order={order}
                pending={order.pending}
                isExtendedDisplay={false}
                isMobile={isMobile}
                oddNumber={openOrders.length % 2 !== 0}
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
