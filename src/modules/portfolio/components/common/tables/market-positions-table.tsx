import React, { Component } from "react";
import PropTypes from "prop-types";

import PositionsHeader from "modules/portfolio/components/common/headers/positions-header";
import PositionRow from "modules/portfolio/components/common/rows/position-row";
import { Market, Position } from "modules/portfolio/constants";

import Styles from "modules/portfolio/components/common/tables/market-positions-table.styles";

export interface MarketPositionsTableProps {
  market: Market;
}

const MarketPositionsTable = (props: MarketPositionsTableProps) => {
  const { market } = props;
  
  return (
    <div className={Styles.MarketPositionsTable}>
      <PositionsHeader />
      {market.userPositions.map((position: Position, index: number) => (
        <PositionRow
          key={"positionRow_" + position.marketId + position.outcomeId}
          isFirst={index === 0}
          position={position}
        />
      ))}
    </div>
  );
}

export default MarketPositionsTable;