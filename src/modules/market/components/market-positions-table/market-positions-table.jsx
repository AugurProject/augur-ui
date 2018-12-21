/* eslint-disable react/no-array-index-key */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MarketPositionsListPosition from "modules/market/components/market-positions-table/market-positions-table--position";

import Styles from "modules/market/components/market-positions-table/market-positions-table.styles";
import {
  AWAITING_SIGNATURE,
  PENDING
} from "modules/transactions/constants/statuses";

export default class MarketPositionsList extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    numCompleteSets: PropTypes.object,
    transactionsStatus: PropTypes.object.isRequired,
    sellCompleteSets: PropTypes.func.isRequired,
    marketId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    openOrders: [],
    numCompleteSets: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };
  }

  render() {
    const {
      openOrders,
      positions,
      numCompleteSets,
      transactionsStatus,
      sellCompleteSets,
      marketId,
      orphanedOrders,
      cancelOrphanedOrder
    } = this.props;
    const s = this.state;

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
      <section className={Styles.MarketPositionsList}>
        <div
          ref={outcomeList => {
            this.outcomeList = outcomeList;
          }}
        >
          <div className={Styles.MarketPositionsList__table}>
            <ul className={Styles["MarketPositionsList__table-header"]}>
              <li>Outcome</li>
              <li>
                <span>Net Position</span>
              </li>
              <li>
                <span>Quantity</span>
              </li>
              <li>
                <span>Price</span>
              </li>
              <li>
                <span>
                  Unrealized <span />
                  P/L
                </span>
              </li>
              <li>
                <span>
                  Realized <span />
                  P/L
                </span>
              </li>
            </ul>
            {positions.length === 0 && (
              <div className={Styles.MarketPositionsList__empty} />
            )}
            {positions.length > 0 && (
              <div className={Styles["MarketPositionsList__table-body"]}>
                {positions &&
                  positions.map((position, i) => (
                    <MarketPositionsListPosition
                      key={i}
                      outcomeName={position.name}
                      position={position}
                      openOrders={openOrders.filter(
                        order =>
                          order.id === position.id && order.pending === true
                      )}
                      isExtendedDisplay={false}
                      isMobile={false}
                      marketId={marketId}
                    />
                  ))}
              </div>
            )}
          </div>
          {numCompleteSets &&
            numCompleteSets.value > 0 && (
              <div className={Styles.MarketPositionsList__completeSets}>
                <span>{`You currently have ${
                  numCompleteSets.full
                } of all outcomes.`}</span>
                <button
                  onClick={e => {
                    sellCompleteSets(marketId, numCompleteSets, () => {});
                  }}
                  disabled={!!pendingCompleteSetsInfo}
                >
                  {completeSetButtonText}
                </button>
              </div>
            )}
        </div>
        <div className={Styles.MarketPositionsList__footer} />
      </section>
    );
  }
}
