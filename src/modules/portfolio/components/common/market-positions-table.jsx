import React, { Component } from "react";
import PropTypes from "prop-types";

import PositionsHeader from "modules/portfolio/components/common/headers/positions-header";
import PositionRow from "modules/portfolio/components/common/rows/position-row";

import { ALL_MARKETS } from "modules/common-elements/constants";

import Styles from "modules/portfolio/components/common/market-positions-table.styles";

export default class MarketPositionsTable extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
  };

  render() {
  	const { market } = this.props;

  	return (
  		<div className={Styles.MarketPositionsTable}>
  			<PositionsHeader />
  			{market.userPositions.map((position, index) => (
  				<PositionRow key={'positionRow_'+position.marketId+position.outcomeId} isFirst={index === 0} position={position} />
  			))}
  		</div>
  	);
  }
}