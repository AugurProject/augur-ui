import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { LONG } from "modules/common-elements/constants";

import { LinearPropertyLabel } from "modules/common-elements/labels";
import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { Order } from "modules/portfolio/constants";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface PositionRowProps {
  position: Order,
  isFirst: Boolean
}

const PositionRow = (props: PositionRowProps) => {
  const { position, isFirst } = props;

  return (
    <ToggleRow
      className={classNames(Styles.Order__single, Styles.Position__single)}
      innerClassName={classNames(Styles.Position__innerSingle, {[Styles.Position__border]: !isFirst})}
      arrowClassName={Styles.Position__arrow}
      rowContent={
        <ul className={classNames(Styles.Order, Styles.Position)}>
          <li>{position.outcomeName}</li>
          <li className={classNames(Styles.Order__type, {
            [Styles.Order__typeSell]: position.type !== LONG
          })}>{position.type}</li>
          <li>{position.quantity.formatted}</li>
          <li>{position.purchasePrice.formatted}</li>
          <li>{position.totalCost.formatted}</li>
          <li>{position.totalValue.formatted}</li>
          <li>{position.lastPrice.formatted}</li>
          <li>{position.totalReturns.formatted}</li>
        </ul>
      }
      toggleContent={
        <div className={Styles.Position_infoContainer}>
          <div className={Styles.Position__info}>
            <LinearPropertyLabel
              label="Realized P/L"
              value={`${position.realizedNet.formatted}`}
            />
            <LinearPropertyLabel
              label="Unrealized P/L"
              value={`${position.unrealizedNet.formatted}`}
            />
          </div>
        </div>
      }
    />
  );
};

export default PositionRow;

