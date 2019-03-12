import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import getValue from "utils/get-value";

import { SELL, BOUGHT, SOLD } from "modules/common-elements/constants";
import { formatEther, formatShares } from "utils/format-number";
import { PositionTypeLabel } from "modules/common-elements/labels";

import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { FilledOrderInterface } from "modules/portfolio/types";
import FilledOrdersTable from "modules/portfolio/components/common/tables/filled-orders-table";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface FilledOrderProps {
  filledOrder: FilledOrderInterface,
  isSingle?: Boolean,
  extendedView?: Boolean,
}

const FilledOrder = (props: FilledOrderProps) => {
  const { filledOrder, isSingle, extendedView } = props;

  const orderQuantity = formatShares(getValue(filledOrder, "amount"))
    .formatted;
  const orderPrice = formatEther(getValue(filledOrder, "price")).formatted;
  const orderType = getValue(filledOrder, "type");

  const originalQuantity = formatShares(getValue(filledOrder, "originalQuantity"))
    .formatted;

  return (
    <div className={classNames({
          [Styles.Order__parentSingle]: isSingle,
        })}>
      <ToggleRow
          className={classNames({
            [Styles.Order__single]: isSingle,
            [Styles.Order__group]: !isSingle,
            [Styles.Order__extended]: extendedView,
          })}
          innerClassName={classNames({
            [Styles.Order__innerGroup]: !isSingle,
            [Styles.Order__innerGroupExtended]: extendedView,
          })}
          arrowClassName={Styles.Order__arrow}
          rowContent={
            <ul
              className={classNames(Styles.Order, Styles.FilledOrder, {
                [Styles.Orders__row]: !isSingle,
                [Styles.FilledOrder__extendedView]: extendedView,
              })}
            >
              <li>{filledOrder.outcome}</li>
              <li><PositionTypeLabel type={orderType} pastTense /></li>
              {!extendedView && <li>{originalQuantity}</li>}
              <li>{orderQuantity}</li>
              <li>{orderPrice}</li>
              <li>{filledOrder.timestamp.formattedShortDate}</li>
              <li>{filledOrder.trades.length}</li>
            </ul>
          }
          toggleContent={
            <FilledOrdersTable filledOrder={filledOrder} showMarketInfo={isSingle} />
          }
        />
    </div>
  );
};

export default FilledOrder;
