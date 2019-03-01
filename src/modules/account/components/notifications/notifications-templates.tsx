import React from "react";

import MarketLink from "modules/market/components/market-link/market-link";
import { MarketProgress } from "modules/common-elements/progress";
import { Market } from "modules/account/constants";

import Styles from "modules/common-elements/notifications.styles";


export interface TemplateProps {
  message: string;
  market: Market;
  currentTime: number;
  reportingWindowEndtime: number;
}

export const Template = (props: TemplateProps) => {
  const { description, endTime, reportingState, marketStatus, id } = props.market;
  const parts: Array<string> = props.message.split(description);

  let body;
  if (parts.length > 1) {
    body = (
      <span>
        {parts[0]}
        <MarketLink id={id}>
          {wrapMarketName(description)}
        </MarketLink>
        {parts[1]}
      </span>
    );
  } else {
    body = <span>{props.message}</span>;
  }

  return (
    <React.Fragment>
      {body}
      {marketStatus === "reporting" && (
        <div className={Styles.NotificationCard__countdown}>
          <MarketProgress
            reportingState={reportingState}
            currentTime={props.currentTime}
            endTime={endTime}
            reportingWindowEndtime={props.reportingWindowEndtime}
          />
        </div>
      )}
    </React.Fragment>
  );
};


export const OpenOrdersResolvedMarketsTemplate = (props: TemplateProps) => {
  const  { description } = props.market;

  return (
    <Template
      message={`You have open orders in this resolved market: ${ description } Please review and cancel these orders to release your ETH.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={props.reportingWindowEndtime}
    />
  );
}

export const FinalizeTemplate = (props: TemplateProps) => {
  const  { description } = props.market;

  return (
    <Template
      message={`The following market is resolved and ready to be finalized: ${ description } Please finalize this market.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={props.reportingWindowEndtime}
    />
  );
}

export const ReportEndingSoonTemplate = (props: TemplateProps) => {
  const  { description } = props.market;

  return (
    <Template
      message={`Reporting ends Soon for this market: ${ description } Please submit a report.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={props.reportingWindowEndtime}
    />
  );
}

// Helper
const wrapMarketName = (marketName: string) => (
  <span className={Styles.NotificationCard__MarketName}>
    {`"${marketName}"`}
  </span>
);
