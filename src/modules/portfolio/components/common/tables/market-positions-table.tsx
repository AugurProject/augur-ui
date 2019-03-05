import React, { Component } from "react";
import PropTypes from "prop-types";

import PositionsHeader from "modules/portfolio/components/common/headers/positions-header";
import PositionRow from "modules/portfolio/components/common/rows/position-row";
import { Market, Position } from "modules/portfolio/types";

import Styles from "modules/portfolio/components/common/tables/market-positions-table.styles";

export interface MarketPositionsTableProps {
  market: Market;
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
   
    const { market } = this.props;
    const { showPercent } = this.state;
  
    return (
      <div className={Styles.MarketPositionsTable}>
        <PositionsHeader showPercent={showPercent} updateShowPercent={this.updateShowPercent} />
        {market.userPositions.map((position: Position, index: number) => (
          <PositionRow
            key={"positionRow_" + position.marketId + position.outcomeId}
            isFirst={index === 0}
            position={position}
            showPercent={showPercent}
          />
        ))}
      </div>
    );
  }
}
