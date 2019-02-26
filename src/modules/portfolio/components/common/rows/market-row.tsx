import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ToggleRow from "modules/portfolio/components/common/rows/toggle-row.tsx";
import { MarketStatusLabel } from "modules/common-elements/labels";
import MarketLink from "modules/market/components/market-link/market-link";
import Styles from "modules/portfolio/components/common/rows/market-row.styles";
// todo: MarketRow__time will end up being a passed in prop
// info toggle content will be passed in as a child
// maybe will have a boolean for whether it is extendable because the watchlist one is different

export interface TimeObject {
  formattedShortDate: string;
}
export interface FormatObject {
  formatted: string;
}

export interface Market {
  id: string;
  description: string;
  reportingState: string;
  marketStatus: string;
  creationTime: number;
  endTime: number;
  volume: FormatObject;
  openInterest: FormatObject;
  marketStatus: string;
}

export interface MarketRowProps {
  market: Market;
  showState: boolean;
  toggleContent: ReactNode;
  rightContent: ReactNode;
}

const MarketRow = (props: MarketRowProps) => (
  <div className={Styles.MarketRow__container}>
    <ToggleRow
      arrowClassName={classNames({[Styles.MarketRow__Arrow]: props.showState})}
      rowContent={
        <div className={classNames(Styles.MarketRow__content, {[Styles.MarketRow__contentShow]: props.showState})}>
          {props.showState && (
            <div className={Styles.MarketRow__firstRow}>
              <MarketStatusLabel
                marketStatus={props.market.marketStatus}
                alternate
                mini
              />
            </div>
          )}
          <div className={Styles.MarketRow__row}>
            <div className={Styles.MarketRow__rowContainer}>
              <span className={Styles.MarketRow__description}>
                <MarketLink id={props.market.id}>
                  {props.market.description}
                </MarketLink>
              </span>
            </div>
            <span className={classNames(Styles.MarketRow__time, {[Styles.MarketRow__timeShow]: props.showState})}>
              {props.rightContent || <div>right content</div>}
            </span>
          </div>

        </div>
      }
      toggleContent={
        props.toggleContent || <div>info</div>
      }
    />
  </div>
);

export default MarketRow;
