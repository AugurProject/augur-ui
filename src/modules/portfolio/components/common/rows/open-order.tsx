import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { Order } from "modules/portfolio/constants";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface OpenOrderProps {
  openOrder: Order,
  className: string,
  toggleClassName: string,
}

const OpenOrder = (props: OpenOrderProps) => {
  const { openOrder, className, toggleClassName } = props;

  return (
    <ToggleRow
      className={toggleClassName}
      rowContent={
        <ul className={classNames(Styles.Order, className)}>
          <li>{openOrder.description || openOrder.name}</li>
          <li>{openOrder.type}</li>
          <li>{openOrder.unmatchedShares.formatted}</li>
          <li>{openOrder.avgPrice.formatted}</li>
          <li>cancel</li>
        </ul>
      }
      toggleContent={<div>info</div>}
    />
  );
};

export default OpenOrder;

