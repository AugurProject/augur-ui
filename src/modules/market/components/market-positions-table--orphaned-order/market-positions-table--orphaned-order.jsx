/* eslint-disable jsx-a11y/no-static-element-interactions */ // needed because <button> cannot take the place <ul> in the table structure

import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";

import getValue from "utils/get-value";
import { SELL } from "modules/trades/constants/types";

import SharedStyles from "modules/market/components/market-positions-table/market-positions-table--position.styles";
import OrphanedStyles from "modules/market/components/market-positions-table--orphaned-order/market-positions-table--orphaned-order.styles";
import { formatEther, formatShares } from "utils/format-number";
import Styles from "modules/market/components/market-orders-positions-table/open-orders-table--orders.style";

export default class OrphanedOrder extends Component {
  static propTypes = {
    isExtendedDisplay: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    outcomeName: PropTypes.string,
    order: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    outcome: PropTypes.object.isRequired,
    cancelOrphanedOrder: PropTypes.func.isRequired
  };

  static defaultProps = {
    outcomeName: null,
    isMobile: false
  };

  constructor(props) {
    super(props);

    this.state = {
      disableCancel: false
    };

    this.cancelOrder = this.cancelOrder.bind(this);
  }

  cancelOrder() {
    this.setState({ disableCancel: true });
    this.props.cancelOrphanedOrder(this.props.order, () => {
      this.setState({ disableCancel: false });
    });
  }

  render() {
    const { outcomeName, order, pending } = this.props;
    const orderPrice = formatEther(getValue(order, "fullPrecisionPrice"))
      .formatted;
    const orderShares = formatShares(getValue(order, "amount")).formatted;
    const orderType = getValue(order, "orderTypeLabel");

    return (
      <ul
        ref={order => {
          this.order = order;
        }}
        className={classNames(SharedStyles.Order, OrphanedStyles.Order, {
          [SharedStyles.Negative]: orderType === SELL
        })}
      >
        <li>{outcomeName || orderPrice}</li>
        <li
          className={classNames(SharedStyles.Order__type, {
            [SharedStyles.Order__typeSell]: orderType === SELL
          })}
          style={{ textTransform: "capitalize" }}
        >
          {orderType}
        </li>
        <li>{orderShares}</li>
        <li>{orderPrice}</li>
        <li />
        <li />
        <li>
          {pending || this.state.disableCancel ? (
            <button className={Styles.Order__cancel} disabled>
              PENDING
            </button>
          ) : (
            <button
              className={Styles.Order__cancel}
              onClick={e => {
                this.cancelOrder(order);
              }}
            >
              Cancel
            </button>
          )}
        </li>
        <div className={classNames(OrphanedStyles.Order__learnMore)}>
          This is an orphaned order. Please cancel it.{" "}
          <span className={OrphanedStyles.Order__link}>
            <a
              href="http://docs.augur.net/#orphaned-order"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </span>
        </div>
      </ul>
    );
  }
}
