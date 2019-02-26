import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { LinearPropertyLabel } from "modules/common-elements/labels";
import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { Order } from "modules/portfolio/constants";
import { CancelTextButton } from "modules/common-elements/buttons";
import { SELL } from "modules/common-elements/constants";
import MarketLink from "modules/market/components/market-link/market-link";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface OpenOrderProps {
  openOrder: Order,
  isSingle?: Boolean,
}

// todo: do actualy frozen funds

const OpenOrder = (props: OpenOrderProps) => {
  const { openOrder, isSingle } = props;

  console.log(openOrder)

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
          <ul className={classNames(Styles.Order, {
          [Styles.Orders__row]: !isSingle,
        })}>
            <li>{openOrder.description || openOrder.name}</li>
            <li className={classNames(Styles.Order__type, {
              [Styles.Order__typeSell]: openOrder.type === SELL
            })}>{openOrder.type}</li>
            <li>{openOrder.unmatchedShares.formatted}</li>
            <li>{openOrder.avgPrice.formatted}</li>
            <li><CancelTextButton text='Cancel' /></li>
          </ul>
        }
        toggleContent={
          <div className={Styles.OpenOrder_infoContainer}>
            <div className={Styles.OpenOrder_innerInfoContainer}>
              <div className={Styles.OpenOrder__info}>
                {isSingle && 
                  <span>
                    <span>Market:</span>
                    <MarketLink id={openOrder.marketId}>
                      {openOrder.markeDescription}
                    </MarketLink>
                  </span>
                }
                <div className={Styles.OpenOrder__labels}>
                  <LinearPropertyLabel
                    label="Frozen Funds (ETH)"
                    value={`${openOrder.unmatchedShares.formatted}`}
                  />
                  <LinearPropertyLabel
                    label="Total Cost (Shares)"
                    value={`${openOrder.unmatchedShares.formatted}`}
                  />
                </div>
              </div>
              <div className={Styles.OpenOrder__timestamp}>
                {openOrder.creationTime.formattedShort}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default OpenOrder;

