import React from "react";

import MarketLink from "modules/market/components/market-link/market-link";
import { MarketProgress } from "modules/common-elements/progress";
import { Market } from "modules/account/types";

import Styles from "modules/common-elements/notifications.styles";

export interface TemplateProps {
  message: string;
  market: Market | null;
  currentTime: number;
  reportingWindowEndtime?: number | null;
}

export interface TemplateBodyProps {
  market: Market | null;
  message: string;
}

const TemplateBody = (props: TemplateBodyProps) => {
  if (!props.market) {
    return <span>{props.message}</span>;
  }

  const { description, id } = props.market;
  const parts: Array<string> = props.message.split(description);

  if (parts.length > 1) {
    return (
      <span>
        {parts[0]}
        <MarketLink id={id}>{wrapMarketName(description)}</MarketLink>
        {parts[1]}
      </span>
    );
  }

  return <span>{props.message}</span>;
};

export const Template = (props: TemplateProps) => {
  if (!props.market) {
    return <TemplateBody market={props.market} message={props.message} />;
  }

  const { marketStatus, endTime, reportingState } = props.market;
  return (
    <React.Fragment>
      <TemplateBody market={props.market} message={props.message} />
      {marketStatus === "reporting" &&
        props.reportingWindowEndtime && (
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
  const { description } = props.market;

  return (
    <Template
      message={`You have open orders in this resolved market: ${description} Please review and cancel these orders to release your ETH.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={null}
    />
  );
};

export const FinalizeTemplate = (props: TemplateProps) => {
  const { description } = props.market;

  return (
    <Template
      message={`The following market is resolved and ready to be finalized: ${description} Please finalize this market.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={null}
    />
  );
};

export const ReportEndingSoonTemplate = (props: TemplateProps) => {
  const { description } = props.market;

  return (
    <Template
      message={`Reporting ends Soon for this market: ${description} Please submit a report.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={props.reportingWindowEndtime}
    />
  );
};

export const DisputeTemplate = (props: TemplateProps) => {
  const { description, disputeInfo } = props.market;

  return (
    <Template
      message={`Dispute round ${
        disputeInfo.disputeRound
      } for the market ${description} is ending soon.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={props.reportingWindowEndtime}
    />
  );
};

export const SellCompleteSetTemplate = (props: TemplateProps) => {
  const { description, myPositionsSummary } = props.market;
  const { numCompleteSets } = myPositionsSummary;

  return (
    <Template
      message={`You currently have ${
        numCompleteSets.full
      } of all outcomes for market: ${description}. Please sell these complete sets.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={null}
    />
  );
};

export const UnsignedOrdersTemplate = (props: TemplateProps) => {
  const { description } = props.market;

  return (
    <Template
      message={`You have unsigned orders pending for the following market’s initial liquidity: ${description} Please submit or cancel these orders.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={null}
    />
  );
};

export const ClaimReportingFeesTemplate = (props: any) => {
  const { claimReportingFees } = props;
  const unclaimedREP = claimReportingFees.unclaimedRep.formattedValue;
  const unclaimedETH = claimReportingFees.unclaimedEth.formattedValue;

  return (
    <Template
      message={`You have ${unclaimedREP ||
        0} REP available to claim back from your Reporting Stake and ${unclaimedETH ||
        0} ETH of available Reporting Fees to collect from markets that have resolved. Please collect your Stake and Fees`}
      market={null}
      currentTime={props.currentTime}
      reportingWindowEndtime={null}
    />
  );
};

export const ProceedsToClaimTemplate = (props: any) => {
  const { outstandingReturns, description } = props.market;
  return (
    <Template
      message={`You currently have ${outstandingReturns} ETH available to be claimed. for the market: ${description}. Please review and claim your winnings.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowEndtime={null}
    />
  );
};

// Helper
const wrapMarketName = (marketName: string) => (
  <span className={Styles.NotificationCard__MarketName}>
    {`"${marketName}"`}
  </span>
);
