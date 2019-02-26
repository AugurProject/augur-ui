import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import getValue from "utils/get-value";

import { SELL, BOUGHT, SOLD } from "modules/common-elements/constants";
import { formatEther, formatShares } from "utils/format-number";

import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { FilledOrderInterface } from "modules/portfolio/constants";
import FilledOrdersTable from "modules/portfolio/components/common/tables/filled-orders-table";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface FilledOrderProps {
  filledOrder: FilledOrderInterface,
  isSingle?: Boolean,
}

const FilledOrder = (props: FilledOrderProps) => {
  const { filledOrder, isSingle } = props;

  const orderQuantity = formatShares(getValue(filledOrder, "amount"))
    .formatted;
  const orderPrice = formatEther(getValue(filledOrder, "price")).formatted;
  const orderType = getValue(filledOrder, "type");
  const orderDisplay = orderType !== SELL ? BOUGHT : SOLD;

  return (
    <div className={classNames({
          [Styles.Order__parentSingle]: isSingle,
        })}>
      <ToggleRow
          className={classNames({
            [Styles.Order__single]: isSingle,
            [Styles.Order__group]: !isSingle,
          })}
          innerClassName={classNames({
            [Styles.Order__innerGroup]: !isSingle,
          })}
          arrowClassName={Styles.Position__arrow}
          rowContent={
            <ul
              className={classNames(Styles.Order, Styles.FilledOrder, {
                [Styles.Orders__row]: !isSingle,
              })}
            >
              <li>{filledOrder.outcome}</li>
              <li className={classNames(Styles.Order__type, {
                [Styles.Order__typeSell]: orderType === SELL
              })}>{orderDisplay}</li>
              <li>{orderQuantity}</li>
              <li>{orderPrice}</li>
              <li>{filledOrder.timestamp.formattedShortDate}</li>
              <li>{filledOrder.trades.length}</li>
            </ul>
          }
          toggleContent={
            <FilledOrdersTable filledOrder={filledOrder} />
          }
        />
    </div>
  );
};

export default FilledOrder;
