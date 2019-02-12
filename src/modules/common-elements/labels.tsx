import React from "react";
import classNames from "classnames";
import * as constants from "./constants";
import Styles from "./labels.styles";
import { ClipLoader } from "react-spinners";

export interface MarketTypeProps {
  marketType: string
}

export interface MarketStatusProps {
  marketStatus: string,
  mini?: boolean
}

export const MarketTypeLabel = (props: MarketTypeProps) => 
  <span
    className={Styles.MarketTypeLabel}
  >
    {props.marketType === constants.YES_NO ? "Yes/No" : props.marketType}
  </span>;

export const MarketStatusLabel = (props: MarketStatusProps) => {
  const { marketStatus, mini } = props;
  let open: boolean = false;
  let resolved: boolean = false;
  let reporting: boolean = false;
  let text: string;
  switch (marketStatus) {
    case constants.MARKET_OPEN:
      open = true;
      text = constants.MARKET_STATUS_MESSAGES.OPEN;
      break;
    case constants.MARKET_CLOSED:
      resolved = true;
      text = constants.MARKET_STATUS_MESSAGES.RESOLVED;
      break;
    default:
      reporting = true;
      text = constants.MARKET_STATUS_MESSAGES.IN_REPORTING;
      break;
  }
  return (
  <span
    className={classNames(Styles.MarketStatus, {
      [Styles.MarketStatus_mini]: mini,
      [Styles.MarketStatus_open]: open,
      [Styles.MarketStatus_resolved]: resolved,
      [Styles.MarketStatus_reporting]: reporting
    })}
  >
    {text}
  </span>
  );
};

export const PendingLabel = () => 
  <span
    className={Styles.PendingLabel}
  >
    Pending <ClipLoader size={8} color="#ffffff" />
  </span>;