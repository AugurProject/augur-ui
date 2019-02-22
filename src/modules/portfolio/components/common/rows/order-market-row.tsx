import React, { Component } from "react";
import PropTypes from "prop-types";

import OpenOrder from "modules/portfolio/components/common/rows/open-order";
import FilledOrder from "modules/portfolio/components/common/rows/filled-order";
import MarketLink from "modules/market/components/market-link/market-link";

import Styles from "modules/portfolio/components/common/rows/order-market-row.styles";

import { NameValuePair, Market, Tab, Outcome, Order} from "modules/portfolio/constants";

export interface OrderMarketRowProps {
  market: Market,
  filledOrders: Boolean
}

const OrderMarketRow = (props: OrderMarketRowProps) => {
  const { market, filledOrders } = props;

  let orders = [];
  if (!filledOrders) {
    orders = market.outcomes.reduce((p: Array<Order>, outcome: Outcome) => {
      if (outcome.userOpenOrders && outcome.userOpenOrders.length > 0) {
        outcome.userOpenOrders.forEach((order: Order) => p.push(order));
      }
      return p;
    }, []);
  } else {
    orders = market.filledOrders;
  }

  return (
    <div className={Styles.OrderMarket}>
      <div className={Styles.OrderMarket__description}>
        <MarketLink id={market.marketId}>
          {market.description}
        </MarketLink>
      </div>
      <div>
        {orders.map(
          (order: Order) =>
            filledOrders ? (
              <FilledOrder
                key={"sFilledOrder_" + order.id}
                filledOrder={order}
                className={Styles.OpenOrders__row}
                toggleClassName={Styles.OrderMarket__order}
              />
            ) : (
              <OpenOrder
                key={"sOpenOrder_" + order.id}
                openOrder={order}
                className={Styles.OpenOrders__row}
                toggleClassName={Styles.OrderMarket__order}
              />
            )
        )}
      </div>
    </div>
  );
};

export default OrderMarketRow; 
