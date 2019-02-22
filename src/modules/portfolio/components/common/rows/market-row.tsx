import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ToggleRow from "modules/portfolio/components/common/rows/toggle-row.tsx";
import { MarketStatusLabel } from "modules/common-elements/labels";
import MarketLink from "modules/market/components/market-link/market-link";
import Styles from "modules/portfolio/components/common/rows/market-row.styles";
import { MarketProgress } from "modules/common-elements/progress";
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
  creationTime: number;
  endTime: number;
  volume: FormatObject;
  openInterest: FormatObject;
  marketStatus: string;
}

export interface MarketRowProps {
  market: Market;
  showState: boolean;
  currentAugurTimestamp: number,
  reportingWindowStatsEndTime: number
  toggleContent: ReactNode;
}

const MarketRow = (props: MarketRowProps) => (
  <div className={Styles.MarketRow__container}>
    <ToggleRow
      expandedClassName={Styles.MarketRow__expanded}
      className={Styles.MarketRow}
      topRowContent={
        props.showState && (
          <div className={Styles.MarketRow__firstRow}>
            <MarketStatusLabel
              marketStatus={props.market.marketStatus}
              alternate
              mini
            />
          </div>
        )
      }
      rowContent={
        <div className={Styles.MarketRow__rowContainer}>
          <span className={Styles.MarketRow__description}>
            <MarketLink id={props.market.id}>
              {props.market.description}
            </MarketLink>
          </span>
          <span className={Styles.MarketRow__time}>
            <MarketProgress
              reportingState={props.market.reportingState}
              currentTime={props.currentAugurTimestamp}
              endTime={props.market.endTime}
              reportingWindowEndtime={props.reportingWindowStatsEndTime}
            />
          </span>
        </div>
      }
      toggleContent={
        props.toggleContent || <div>info</div>
      }
    />
  </div>
);

export default MarketRow;
