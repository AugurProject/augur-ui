import React from "react";
import classNames from "classnames";

import { LinearPropertyLabel, PendingLabel, PositionTypeLabel } from "modules/common-elements/labels";
import ToggleRow from "modules/portfolio/components/common/rows/toggle-row";
import { Order } from "modules/portfolio/types";
import { CancelTextButton } from "modules/common-elements/buttons";
import MarketLink from "modules/market/components/market-link/market-link";
import getValue from "utils/get-value";

import Styles from "modules/portfolio/components/common/rows/open-order.styles";

export interface OpenOrderProps {
  openOrder: Order,
  isSingle?: Boolean,
  extendedView?: Boolean,
}

const OpenOrder = (props: OpenOrderProps) => {
  const { openOrder, isSingle, extendedView } = props;

  if (!openOrder) {
    return null;
  }

  const tokensEscrowed = getValue(openOrder, "tokensEscrowed.formatted");
  const sharesEscrowed = getValue(openOrder, "sharesEscrowed.formatted");
  const creationTime = getValue(openOrder, "creationTime.formattedShort");

  const rowContent = (
  <ul className={classNames(Styles.Order, {
    [Styles.Order__row]: !isSingle || extendedView,
    [Styles.Order__extendedView]: extendedView,
  })}>
      <li>{openOrder.description || openOrder.name}</li>
      <li>
        <PositionTypeLabel type={openOrder.type} />
        {(openOrder.pending || openOrder.pendingOrder) && <span><PendingLabel /></span>}
      </li>
      <li>{openOrder.unmatchedShares && openOrder.unmatchedShares.formatted}</li>
      <li>{openOrder.avgPrice && openOrder.avgPrice.formatted}</li>
      {extendedView && <li>{tokensEscrowed}</li>}
      {extendedView && <li>{sharesEscrowed}</li>}
      <li>
        {openOrder.cancelOrder &&
          <CancelTextButton disabled={openOrder.pending} action={e => {
            e.stopPropagation();
            openOrder.cancelOrder(openOrder);
          }} text='Cancel' />
        }
      </li>
    </ul>
  );

  if (extendedView) {
    return (
      <div className={classNames(Styles.Order__single, Styles.Order__border)}>
        {rowContent}
      </div>
    )
  }

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
        arrowClassName={Styles.Order__arrow}
        rowContent={rowContent}
        toggleContent={
          <div className={Styles.OpenOrder_infoContainer}>
            <div className={classNames(Styles.OpenOrder_innerInfoContainer, {
              [Styles.OpenOrder_innerInfoContainerSingle]: isSingle
            })}>
              <div className={Styles.OpenOrder__info}>
                {isSingle &&
                  <span>
                    <MarketLink id={openOrder.marketId}>
                      {openOrder.marketDescription}
                    </MarketLink>
                  </span>
                }
                <div className={Styles.OpenOrder__labels}>
                  <LinearPropertyLabel
                    label="Total Cost (ETH)"
                    value={tokensEscrowed || 0}
                  />
                  <LinearPropertyLabel
                    label="Total Cost (Shares)"
                    value={sharesEscrowed || 0}
                  />
                  <LinearPropertyLabel
                    label="Date"
                    value={creationTime}
                  />
                </div>
              </div>
              <div className={Styles.OpenOrder__timestamp}>
                {creationTime}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default OpenOrder;

