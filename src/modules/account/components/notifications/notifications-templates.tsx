import React from "react";

import Styles from "modules/common-elements/notifications.styles";

export interface TemplateProps {
  countDown?: Date; // TODO
  marketName: string;
  message: string;
  amount?: number;
  round?: number;
}

export const Template = (props: TemplateProps) => {
  const parts: Array<string> = props.message.split(props.marketName);

  let body;
  if (parts.length > 1) {
    body = (
      <span>
        {parts[0]} {wrapMarketName(props.marketName)} {parts[1]}
      </span>
    );
  } else {
    body = <span>{props.message}</span>;
  }

  return (
    <React.Fragment>
      {body}
      {props.countDown && (
        <div className={Styles.NotificationCard__countdown}>
          <div className={Styles.NotificationCard__countdown__title}>
            {props.round ? "Disputing Ends" : "Reporting Ends"}
          </div>
          <div className={Styles.NotificationCard__countdown__timer}>
            {props.countDown}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

// Generate Templates to attach to notification cards
export const OpenOrdersResolvedMarketsTemplate = (props: TemplateProps) => (
  <Template
    message={`You have open orders in this resolved market: ${
      props.marketName
    } Please review and cancel these orders to release your ETH.`}
    marketName={props.marketName}
  />
);

// Helper
const wrapMarketName = (marketName: string) => (
  <span
    className={Styles.NotificationCard__MarketName}
  >{`"${marketName}"`}</span>
);
