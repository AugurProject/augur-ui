import React, { Component } from "react";
import PropTypes from "prop-types";

import OpenOrder from "modules/portfolio/components/common/open-order";
import FilledOrder from "modules/portfolio/components/common/filled-order";

import Styles from "modules/portfolio/components/common/order-market-row.styles";

export default class OrderMarketRow extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    filledOrders: PropTypes.bool,
  };

  render() {
    const { market, filledOrders } = this.props;

    let orders = [];
    if (!filledOrders) {
      orders = market.outcomes.reduce((p, outcome) => {
          if (outcome.userOpenOrders && outcome.userOpenOrders.length > 0) {
            outcome.userOpenOrders.forEach(order => p.push(order));
          }
          return p;
        }, []);
     } else {
       orders = market.filledOrders;
     }   

    return (
      <div className={Styles.OrderMarket}>
        <div className={Styles.OrderMarket__description}>
          {market.description}
        </div>
        <div>
          {orders.map(order => filledOrders ? 
            (
              <FilledOrder
                key={"filledOrder_" + order.id}
                filledOrder={order}
                className={Styles.OpenOrders__row}
                toggleClassName={Styles.Orders__orderSingle}
              />
            )
            : 
              (<OpenOrder
                key={"openOrder_" + order.id}
                openOrder={order}
                className={Styles.OpenOrders__row}
                toggleClassName={Styles.OrderMarket__order}
              />)
          )}
        </div>
      </div>
    );
  }
}


