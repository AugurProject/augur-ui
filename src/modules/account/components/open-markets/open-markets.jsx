import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterSwitchBox from "modules/portfolio/components/common/quads/filter-switch-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";
import { MovementLabel } from "modules/common-elements/labels";

import Styles from "modules/portfolio/components/common/quads/quad.styles";

function filterComp(input, market) {
  return market.description.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export default class OpenMarkets extends Component {
  static propTypes = {
    markets: PropTypes.array.isRequired,
    marketsObj: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.renderRows = this.renderRows.bind(this);
  }

  renderRows(market) {
    const { marketsObj } = this.props;

    return (
      <MarketRow
        key={"position_" + market.id}
        market={marketsObj[market.id]}
        showState={false}
        rightContent={
          <MovementLabel
            showColors
            showIcon
            value={
              marketsObj[market.id].myPositionsSummary.valueChange.formatted
            }
            size="medium"
          />
        }
        toggleContent={
          <div className={Styles.ExpandedContent}>
            {marketsObj[market.id].userPositions.map(position => (
              <div key={position.outcomeId}>
                <span>{position.outcomeName}</span>
                <MovementLabel
                  showColors
                  showIcon
                  value={position.valueChange.formatted}
                  size="small"
                />
              </div>
            ))}
          </div>
        }
      />
    );
  }

  render() {
    const { markets } = this.props;

    return (
      <FilterSwitchBox
        title="Open Markets"
        showFilterSearch
        data={markets}
        filterComp={filterComp}
        bottomBarContent={<div className={Styles.BottomBar}>24hr Change</div>}
        label="Open Markets"
        noSwitch
        renderRows={this.renderRows}
      />
    );
  }
}
