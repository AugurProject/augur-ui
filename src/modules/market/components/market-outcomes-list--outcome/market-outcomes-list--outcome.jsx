/* eslint-disable jsx-a11y/no-static-element-interactions */ // needed because <button> cannot take the place <ul> in the table structure

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ValueDenomination from "modules/common/components/value-denomination/value-denomination";
import { RightChevron } from "modules/common/components/icons";

import getValue from "utils/get-value";
import MarketOutcomeTradingIndicator from "modules/market/containers/market-outcome-trading-indicator";
import Styles from "modules/market/components/market-outcomes-list--outcome/market-outcomes-list--outcome.styles";
import SharedStyles from "modules/market/components/market-positions-table/market-positions-table--position.styles";

const Outcome = ({
  outcome,
  selectedOutcome,
  updateSelectedOutcome,
  scalarDenomination,
  isMobile
}) => {
  const outcomeName = getValue(outcome, "name");

  const topBidShares = getValue(outcome, "topBid.shares.formatted");
  const topAskShares = getValue(outcome, "topAsk.shares.formatted");

  const topBidPrice = getValue(outcome, "topBid.price.formatted");
  const topAskPrice = getValue(outcome, "topAsk.price.formatted");

  const lastPrice = getValue(outcome, "lastPrice.formatted");
  const lastPricePercent = getValue(outcome, "lastPricePercent.full");

  return (
    <ul
      className={classNames(SharedStyles.Outcome, Styles.Outcome, {
        [`${Styles.active}`]: selectedOutcome === outcome.id
      })}
      onClick={e => updateSelectedOutcome(outcome.id)}
      role="menu"
    >
      <li>
        <div>
          <span className={Styles.Outcome__name}>
            {outcomeName || (scalarDenomination && scalarDenomination)}{" "}
          </span>
        </div>
        <div>
          <span className={Styles.Outcome__percent}>{lastPricePercent}</span>
        </div>
      </li>
      <li>
        <ValueDenomination formatted={topBidShares} />
      </li>
      <li>
        <ValueDenomination formatted={topBidPrice} />
      </li>
      <li>
        <ValueDenomination formatted={topAskPrice} />
      </li>
      <li>
        <ValueDenomination formatted={topAskShares} />
      </li>
      <li style={{ position: "relative" }}>
        <ValueDenomination formatted={lastPrice} />
        <MarketOutcomeTradingIndicator
          outcome={outcome}
          location="tradingPage"
          style={isMobile ? { bottom: "32%" } : null}
        />
      </li>
      {isMobile && <div>{RightChevron}</div>}
    </ul>
  );
};

Outcome.propTypes = {
  outcome: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    topBid: PropTypes.shape({
      shares: PropTypes.object,
      price: PropTypes.object
    }),
    topAsk: PropTypes.shape({
      shares: PropTypes.object,
      price: PropTypes.object
    }),
    lastPrice: PropTypes.object,
    lastPricePercent: PropTypes.object
  }).isRequired,
  selectedOutcome: PropTypes.string,
  updateSelectedOutcome: PropTypes.func.isRequired,
  scalarDenomination: PropTypes.string,
  isMobile: PropTypes.bool
};

Outcome.defaultProps = {
  selectedOutcome: null,
  scalarDenomination: null,
  isMobile: false
};

export default Outcome;
