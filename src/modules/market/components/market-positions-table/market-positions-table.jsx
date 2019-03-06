/* eslint-disable react/no-array-index-key */

import React, { Component } from "react";
import PropTypes from "prop-types";

import MarketPositionsListPosition from "modules/market/components/market-positions-table/market-positions-table--position";
import { AWAITING_SIGNATURE, PENDING } from "modules/common-elements/constants";

import SharedStyles from "modules/market/components/market-orders-positions-table/open-orders-table.style";
import Styles from "modules/market/components/market-positions-table/market-positions-table.styles";
import { CompactButton } from "modules/common-elements/buttons";

export default class MarketPositionsList extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    numCompleteSets: PropTypes.object,
    transactionsStatus: PropTypes.object.isRequired,
    sellCompleteSets: PropTypes.func.isRequired,
    marketId: PropTypes.string.isRequired,
    isMobile: PropTypes.bool
  };

  static defaultProps = {
    numCompleteSets: null,
    isMobile: false
  };

  render() {
    const {
      positions,
      numCompleteSets,
      transactionsStatus,
      sellCompleteSets,
      marketId,
      isMobile
    } = this.props;

    const pendingCompleteSetsHash = `pending-${marketId}-${numCompleteSets &&
      numCompleteSets.fullPrecision}`;
    const pendingCompleteSetsInfo = transactionsStatus[pendingCompleteSetsHash];
    const status = pendingCompleteSetsInfo && pendingCompleteSetsInfo.status;
    let completeSetButtonText = "Sell Complete Sets";
    switch (status) {
      case AWAITING_SIGNATURE:
        completeSetButtonText = "Awaiting Signature...";
        break;
      case PENDING:
        completeSetButtonText = "Pending transaction...";
        break;
      default:
        completeSetButtonText = "Sell Complete Sets";
        break;
    }

    return (
      <section>
        <div
          ref={outcomeList => {
            this.outcomeList = outcomeList;
          }}
        >
          <div className={SharedStyles.MarketOpenOrdersList__table}>
            <ul className={SharedStyles["MarketOpenOrdersList__table-header"]}>
              {!isMobile && <li>Outcome</li>}
              <li>Type</li>
              <li>Quantity</li>
              <li>Average Price</li>
              <li>Unrealized P/L</li>
              <li>Realized P/L</li>
            </ul>
            {positions.length === 0 && (
              <div className={SharedStyles.MarketOpenOrdersList__empty} />
            )}
            <div className={SharedStyles.MarketOpenOrdersList__scrollContainer}>
              {positions.length > 0 && (
                <div
                  className={SharedStyles["MarketOpenOrdersList__table-body"]}
                >
                  {positions &&
                    positions.map((position, i) => (
                      <MarketPositionsListPosition
                        key={i}
                        outcomeName={position.outcomeName}
                        position={position}
                        isExtendedDisplay={false}
                        isMobile={false}
                        marketId={marketId}
                        oddNumber={positions.length % 2 !== 0}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
          {numCompleteSets &&
            numCompleteSets.value > 0 && (
              <div className={Styles.MarketPositionsList__completeSets}>
                <span>{`You currently have ${
                  numCompleteSets.full
                } of all outcomes.`}</span>
                <CompactButton
                  disabled={!!pendingCompleteSetsInfo}
                  text={completeSetButtonText}
                  action={e => {
                    sellCompleteSets(marketId, numCompleteSets, () => {});
                  }}
                />
              </div>
            )}
        </div>
      </section>
    );
  }
}
