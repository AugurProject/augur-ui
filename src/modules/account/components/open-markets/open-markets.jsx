import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterSwitchBox from "modules/portfolio/components/common/quads/filter-switch-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";
import EmptyDisplay from "modules/portfolio/components/common/tables/empty-display";
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

    this.state = {
      filteredMarkets: props.markets
    };

    this.updateFilteredMarkets = this.updateFilteredMarkets.bind(this);
  }

  updateFilteredMarkets(filteredMarkets) {
    this.setState({ filteredMarkets });
  }

  render() {
    const { markets, marketsObj } = this.props;

    const { filteredMarkets } = this.state;

    console.log(marketsObj);

    return (
      <FilterSwitchBox
        title="Open Markets"
        showFilterSearch
        updateFilteredData={this.updateFilteredMarkets}
        data={markets}
        filterComp={filterComp}
        bottomBarContent={<div />}
        label="Open Markets"
        noSwitch
        rows={
          <div className={Styles.Quad__container}>
            {filteredMarkets.length === 0 && (
              <EmptyDisplay title="No available markets" />
            )}
            {filteredMarkets.length > 0 &&
              filteredMarkets.map(market => (
                <MarketRow
                  key={"position_" + market.id}
                  market={marketsObj[market.id]}
                  showState={false}
                  rightContent={
                    <MovementLabel
                      showColors
                      showIcon
                      value={
                        marketsObj[market.id].myPositionsSummary.valueChange
                          .formatted
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
              ))}
          </div>
        }
      />
    );
  }
}
