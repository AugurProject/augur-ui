import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/components/common/quads/filter-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";
import { CompactButton } from "modules/common-elements/buttons";
import { MovementLabel } from "modules/common-elements/labels";
import { MarketPositionsTable } from "modules/portfolio/components/common/tables/market-positions-table";
import EmptyDisplay from "modules/portfolio/components/common/tables/empty-display";

import { ALL_MARKETS } from "modules/common-elements/constants";

import Styles from "modules/portfolio/components/common/quads/quad.styles";

const sortByOptions = [
  {
    label: "Sort by Most Recently Traded",
    value: "recentlyTraded",
    comp(marketA, marketB) {
      return marketB.recentlyTraded.timestamp - marketA.recentlyTraded.timestamp;
    }
  },
  {
    label: "Sort by Current Value",
    value: "currentValue",
    comp(marketA, marketB) {
      return marketB.myPositionsSummary.currentValue.formatted- marketA.myPositionsSummary.currentValue.formatted;
    }
  },
  {
    label: "Sort by Total Returns",
    value: "totalReturns",
    comp(marketA, marketB) {
      return marketB.myPositionsSummary.totalReturns.formatted- marketA.myPositionsSummary.totalReturns.formatted;
    }
  },
  {
    label: "Sort by Expiring Soonest",
    value: "endTime",
    comp(marketA, marketB) {
      return marketB.endTime.timestamp - marketA.endTime.timestamp;
    }
  },
  
];

function filterComp(input, market) {
  return market.description.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export default class Positions extends Component {
  static propTypes = {
    markets: PropTypes.object.isRequired,
    tabsInfo: PropTypes.array.isRequired,
    marketsObj: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      filteredMarkets: props.markets[ALL_MARKETS],
      tab: ALL_MARKETS,
      showCurrentValue: true
    };

    this.updateFilteredMarkets = this.updateFilteredMarkets.bind(this);
    this.updateRightContentValue = this.updateRightContentValue.bind(this);
  }

  updateFilteredMarkets(filteredMarkets, tab) {
    this.setState({ filteredMarkets });
    if (tab) {
      this.setState({ tab });
    }
  }

  updateRightContentValue() {
    this.setState({ showCurrentValue: !this.state.showCurrentValue });
  }

  render() {
    const { markets, tabsInfo, marketsObj } = this.props;
    const { filteredMarkets, tab, showCurrentValue } = this.state;
   // console.log(markets);

    return (
      <FilterBox
        title="Positions"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredData={this.updateFilteredMarkets}
        filteredData={filteredMarkets}
        data={markets}
        filterComp={filterComp}
        bottomTabs
        tabs={tabsInfo}
        label="Positions"
        bottomRightContent={
          <CompactButton
            text={showCurrentValue ? "Current Value (ETH)" : "Total Returns"}
            action={this.updateRightContentValue}
          />
        }
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
                  showState={tab === ALL_MARKETS}
                  toggleContent={<MarketPositionsTable market={marketsObj[market.id]} />}
                  rightContent={
                    showCurrentValue ? (
                      marketsObj[market.id].myPositionsSummary.currentValue.formatted
                    ) : (
                      <div className={Styles.Quad__column}>
                        <span>
                          {marketsObj[market.id].myPositionsSummary.totalReturns.formatted}
                        </span>
                        <MovementLabel
                          showPercent
                          showPlusMinus
                          showColors
                          size="small"
                          value={
                            marketsObj[market.id].myPositionsSummary.totalReturnsPercent
                              .formatted
                          }
                        />
                      </div>
                    )
                  }
                />
              ))}
          </div>
        }
      />
    );
  }
}
