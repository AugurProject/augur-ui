import React, { Component } from "react";
import PropTypes from "prop-types";

import OpenOrder from "modules/portfolio/components/common/open-order";

import Styles from "modules/portfolio/components/common/order-market-row.styles";

export default class OrderMarketRow extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired
  };

  render() {
    const { market } = this.props;

    const openOrders = market.outcomes.reduce((p, outcome) => {
      if (outcome.userOpenOrders && outcome.userOpenOrders.length > 0) {
        outcome.userOpenOrders.forEach(order => p.push(order));
      }
      return p;
    }, []);

    return (
      <div className={Styles.OrderMarket}>
        <div className={Styles.OrderMarket__description}>
          {market.description}
        </div>
        <div>
          {openOrders.map(openOrder => (
            <OpenOrder
              key={"openOrder_" + openOrder.id}
              openOrder={openOrder}
              className={Styles.OpenOrders__row}
              toggleClassName={Styles.OrderMarket__order}
            />
          ))}
        </div>
      </div>
    );
  }
}
