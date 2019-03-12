import React, { Component } from "react";
import PropTypes from "prop-types";

import PositionsHeader from "modules/portfolio/components/common/headers/positions-header";
import PositionRow from "modules/portfolio/components/common/rows/position-row";
import { Market, Position } from "modules/portfolio/types";
import { AWAITING_SIGNATURE, PENDING } from "modules/common-elements/constants";
import { CompactButton } from "modules/common-elements/buttons";
import classNames from "classnames";

import SharedStyles from "modules/market/components/market-orders-positions-table/open-orders-table.style";
import Styles from "modules/portfolio/components/common/tables/market-positions-table.styles";

export interface MarketPositionsTableProps {
  isMobile: Boolean;
  positions: Array<Position>,
  numCompleteSets: any,
  transactionsStatus: any,
  sellCompleteSets: Function,
  extendedView: Boolean,
}

export interface MarketPositionsTableState {
  showPercent: boolean;
}

export class MarketPositionsTable extends React.Component<MarketPositionsTableProps, MarketPositionsTableState> {

  state: MarketPositionsTableState = {
    showPercent: true
  };

  updateShowPercent = () => {
    this.setState({showPercent: !this.state.showPercent});
  }

  render() {
   
    const {
      positions,
      numCompleteSets,
      transactionsStatus,
      sellCompleteSets,
      marketId,
      isMobile,
      extendedView
    } = this.props;
    const { showPercent } = this.state;

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
      <div className={classNames(Styles.MarketPositionsTable, {[SharedStyles.MarketOpenOrdersList__table]: extendedView})}>
        <PositionsHeader showPercent={showPercent} updateShowPercent={this.updateShowPercent} extendedView={extendedView}/>
        <div className={classNames({[SharedStyles.MarketOpenOrdersList__scrollContainer]: extendedView})}>
          {positions.map((position: Position, index: number) => (
            <PositionRow
              key={"positionRow_" + position.marketId + position.outcomeId}
              isFirst={index === 0}
              position={position}
              showPercent={showPercent}
              isMobile={isMobile}
              extendedView={extendedView}
            />
          ))}
        </div>
        {extendedView && positions.length === 0 && (
          <div className={SharedStyles.MarketOpenOrdersList__empty} />
        )}
        {extendedView && numCompleteSets &&
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
    );
  }
}
