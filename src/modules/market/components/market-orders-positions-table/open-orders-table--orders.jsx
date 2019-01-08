/* eslint-disable jsx-a11y/no-static-element-interactions */ // needed because <button> cannot take the place <ul> in the table structure

import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";

import getValue from "utils/get-value";
import { SELL } from "modules/trades/constants/types";

import SharedStyles from "modules/market/components/market-positions-table/market-positions-table--position.styles";
import Styles from "modules/market/components/market-orders-positions-table/open-orders-table--orders.style";

export default class OpenOrdersOrder extends Component {
  static propTypes = {
    isExtendedDisplay: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    outcomeName: PropTypes.string.isRequired,
    order: PropTypes.shape({
      type: PropTypes.string.isRequired,
      orderCancellationStatus: PropTypes.string,
      avgPrice: PropTypes.object,
      unmatchedShares: PropTypes.object,
      tokensEscrowed: PropTypes.object,
      sharesEscrowed: PropTypes.object,
      cancelOrder: PropTypes.func.isRequired
    }).isRequired,
    pending: PropTypes.bool.isRequired,
    outcome: PropTypes.object
  };

  static defaultProps = {
    outcome: null
  };

  render() {
    const {
      isExtendedDisplay,
      isMobile,
      outcomeName,
      order,
      pending,
      outcome
    } = this.props;
    const orderPrice = getValue(order, "avgPrice.formatted");
    const orderShares = getValue(order, "unmatchedShares.formatted");
    const orderType = getValue(order, "type");

    return (
      <ul
        ref={order => {
          this.order = order;
        }}
        className={
          !isMobile
            ? classNames(SharedStyles.Order, {
                [SharedStyles["Order-not_extended"]]: isExtendedDisplay,
                [SharedStyles.Negative]: orderType === SELL
              })
            : SharedStyles.PortMobile
        }
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
        {isExtendedDisplay &&
          !isMobile &&
          outcome && <li>{getValue(outcome, "lastPrice.formatted")}</li>}
        {!isMobile && <li>{getValue(order, "tokensEscrowed.formatted")}</li>}
        {!isMobile && <li>{getValue(order, "sharesEscrowed.formatted")}</li>}
        {isExtendedDisplay && <li />}
        <li>
          {pending ? (
            <button className={Styles.Order__cancel} disabled>
              PENDING
            </button>
          ) : (
            <button
              className={Styles.Order__cancel}
              onClick={e => {
                order.cancelOrder(order);
              }}
            >
              Cancel
            </button>
          )}
        </li>
      </ul>
    );
  }
}
