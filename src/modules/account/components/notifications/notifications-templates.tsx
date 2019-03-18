import React from "react";

import MarketLink from "modules/market/components/market-link/market-link";
import {
  CountdownProgress,
  MarketProgress
} from "modules/common-elements/progress";
import { formatTime } from "modules/common-elements/progress";
import { MARKET_STATUS_MESSAGES } from "modules/common-elements/constants";

import Styles from "modules/account/components/notifications/notification-card.styles";

export interface DisputeInfo {
  disputeRound: number;
}

export interface MyPositionsSummary {
  currentValue: any;
  numCompleteSets: any;
  totalPercent: any;
  totalReturns: any;
}

export interface Market {
  id: string;
  description: string;
  reportingState: string;
  endTime: number;
  marketStatus: string;
  disputeInfo?: DisputeInfo;
  myPositionsSummary?: MyPositionsSummary;
  outstandingReturns?: string;
  finalizationTimeWithHold?: number;
}

export interface TemplateProps {
  message: string;
  claimReportingFees: any;
  totalProceeds: number;
  markets: Array<string> | null;
  market: Market;
  currentTime: Date,
  reportingWindowStatsEndTime: number;
}

export interface TemplateProps2 {
  message: string;
  market: Market;
  currentTime: Date,
  reportingWindowStatsEndTime: number | null;
}

export interface TemplateBodyProps {
  market?: Market;
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

export const Template = (props: TemplateProps2) => {
  if (!props.market) {
    return <TemplateBody market={props.market} message={props.message} />;
  }

  const { marketStatus, endTime, reportingState } = props.market;
  return (
    <React.Fragment>
      <TemplateBody market={props.market} message={props.message} />
      {marketStatus === "reporting" &&
        props.reportingWindowStatsEndTime && (
          <div className={Styles.NotificationCard__countdown}>
            <MarketProgress
              reportingState={reportingState}
              currentTime={props.currentTime}
              endTime={endTime}
              reportingWindowEndtime={props.reportingWindowStatsEndTime}
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
      reportingWindowStatsEndTime={null}
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
      reportingWindowStatsEndTime={null}
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
      reportingWindowStatsEndTime={props.reportingWindowStatsEndTime}
    />
  );
};

export const DisputeTemplate = (props: TemplateProps) => {
  const { description, disputeInfo } = props.market;

  if (!disputeInfo) {
    return null;
  }

  return (
    <Template
      message={`Dispute round ${
        disputeInfo.disputeRound
      } for the market ${description} is ending soon.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowStatsEndTime={props.reportingWindowStatsEndTime}
    />
  );
};

export const SellCompleteSetTemplate = (props: TemplateProps) => {
  const { description, myPositionsSummary } = props.market;

  if (!myPositionsSummary) {
    return null;
  }

  const { numCompleteSets } = myPositionsSummary;


  return (
    <Template
      message={`You currently have ${
        numCompleteSets.full
      } of all outcomes for market: ${description}. Please sell these complete sets.`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowStatsEndTime={null}
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
      reportingWindowStatsEndTime={null}
    />
  );
};

export const ClaimReportingFeesTemplate = (props: TemplateProps) => {
  const { claimReportingFees } = props;
  const unclaimedREP = claimReportingFees.unclaimedRep.formattedValue || 0;
  const unclaimedETH = claimReportingFees.unclaimedEth.formattedValue || 0;

  return (
    <Template
      message={`You have ${unclaimedREP} REP available to claim back from your Reporting Stake and ${unclaimedETH} ETH of available Reporting Fees to collect from markets that have resolved. Please collect your Stake and Fees`}
      market={props.market}
      currentTime={props.currentTime}
      reportingWindowStatsEndTime={null}
    />
  );
};

export const ProceedsToClaimTemplate = (props: TemplateProps) => {
  const { totalProceeds } = props;

  return (
    <TemplateBody
      message={`You have ${totalProceeds} ETH available to be claimed. Please review and claim your winnings.`}
    />
  );
};

export const ProceedsToClaimOnHoldTemplate = (props: TemplateProps) => {
  const { market, currentTime } = props;
  const { finalizationTimeWithHold, outstandingReturns, description } = market;
  const label = MARKET_STATUS_MESSAGES.WAITING_PERIOD_ENDS;

  return (
    <React.Fragment>
      <TemplateBody
        market={market}
        message={`${outstandingReturns} ETH will be available to claim when the waiting period ends for market: ${description}.`}
      />
      <div className={Styles.NotificationCard__countdown}>
        <CountdownProgress
          label={label}
          time={formatTime(finalizationTimeWithHold)}
          currentTime={formatTime(currentTime)}
        />
      </div>
    </React.Fragment>
  );
};

// Helper
const wrapMarketName = (marketName: string) => (
  <span className={Styles.NotificationCard__MarketName}>
    {`"${marketName}"`}
  </span>
);
