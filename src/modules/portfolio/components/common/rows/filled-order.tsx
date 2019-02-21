import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import getValue from "utils/get-value";

import { SELL, BOUGHT, SOLD } from "modules/common-elements/constants";
import { formatEther, formatShares } from "utils/format-number";

import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { FilledOrderInterface } from "modules/portfolio/constants";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface FilledOrderProps {
  filledOrder: FilledOrderInterface,
  className: string,
  toggleClassName: string,
}

export const FilledOrder = (props: FilledOrderProps) => {
  const { filledOrder, className, toggleClassName } = props;

  const orderQuantity = formatShares(getValue(filledOrder, "amount"))
    .formatted;
  const orderPrice = formatEther(getValue(filledOrder, "price")).formatted;
  const orderType = getValue(filledOrder, "type");
  const orderDisplay = orderType !== SELL ? BOUGHT : SOLD;

  return (
    <ToggleRow
        className={toggleClassName}
        rowContent={
          <ul
            className={classNames(Styles.Order, Styles.FilledOrder, className)}
          >
            <li>{filledOrder.outcome}</li>
            <li>{orderDisplay}</li>
            <li>{orderQuantity}</li>
            <li>{orderPrice}</li>
            <li>{filledOrder.timestamp.formattedShortDate}</li>
            <li>{filledOrder.trades.length}</li>
          </ul>
        }
        toggleContent={<div>info</div>}
      />
  );
};

