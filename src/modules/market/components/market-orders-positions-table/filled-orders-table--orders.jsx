/* eslint-disable jsx-a11y/no-static-element-interactions */ // needed because <button> cannot take the place <ul> in the table structure

import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";

import getValue from "utils/get-value";
import { SELL } from "modules/trades/constants/types";
import { formatNumber, formatDate } from "utils/format-number";

import SharedStyles from "modules/market/components/market-positions-table/market-positions-table--position.styles";
import Styles from "modules/market/components/market-orders-positions-table/open-orders-table--orders.style";

export default class FilledOrdersOrder extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    order: PropTypes.shape({
      type: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      price: PropTypes.object.isRequired,
      outcome: PropTypes.string.isRequired,
      trades: PropTypes.array.isRequired,
    }).isRequired,
  };

  render() {
    const {
      isMobile,
      order,
    } = this.props;

    const orderQuantity = formatNumber(order.amount).formatted;
    const orderPrice = formatNumber(order.price).formatted;
    const orderType = getValue(order, "type");

    return (
      <ul
        ref={order => {
          this.order = order;
        }}
        className={
          !isMobile
            ? classNames(SharedStyles.Order)
            : SharedStyles.PortMobile
        }
      >
        <li style={{ position: "relative" }}>
          <div
            className={classNames(SharedStyles.Order__typeIndicator, {
              [SharedStyles.Order__typeIndicatorSell]: orderType === SELL
            })}
          />
          {order.outcome || orderPrice}
        </li>
        <li
          className={classNames(SharedStyles.Order__type, {
            [SharedStyles.Order__typeSell]: orderType === SELL
          })}
          style={{ textTransform: "capitalize" }}
        >
          {orderType}
        </li>
        <li>{orderQuantity}</li>
        <li>{orderPrice}</li>
        <li>{order.timestamp}</li>
        <li>{order.trades.length}</li>
      </ul>
    );
  }
}
