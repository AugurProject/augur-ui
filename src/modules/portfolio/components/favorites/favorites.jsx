import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/components/common/quads/filter-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";
import { MarketPositionsTable } from "modules/portfolio/components/common/tables/market-positions-table";
import EmptyDisplay from "modules/portfolio/components/common/tables/empty-display";
import { MarketProgress } from "modules/common-elements/progress";
import { FavoritesButton } from "modules/common-elements/buttons";

import { ALL_MARKETS } from "modules/common-elements/constants";

import Styles from "modules/portfolio/components/common/quads/quad.styles";

const sortByOptions = [
  {
    label: "Sort by Most Recently Added",
    value: "recentlyTraded",
    comp(marketA, marketB) {
      return marketB.favoriteAddedData - marketA.favoriteAddedData;
    }
  },
  {
    label: "Sort by Market Creation",
    value: "marketCreation",
    comp(marketA, marketB) {
      return marketB.creationTime.timestamp - marketA.creationTime.timestamp;
    }
  },
  {
    label: "Sort by Expiring Soonest",
    value: "endTime",
    comp(marketA, marketB) {
      return marketA.endTime.timestamp - marketB.endTime.timestamp;
    }
  }
];

function filterComp(input, market) {
  return market.description.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export default class Favorites extends Component {
  static propTypes = {
    markets: PropTypes.object.isRequired,
    tabsInfo: PropTypes.array.isRequired,
    marketsObj: PropTypes.object.isRequired,
    currentAugurTimestamp: PropTypes.number.isRequired,
    reportingWindowStatsEndTime: PropTypes.number.isRequired,
    toggleFavorite: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      filteredMarkets: props.markets[ALL_MARKETS],
      tab: ALL_MARKETS
    };

    this.updateFilteredMarkets = this.updateFilteredMarkets.bind(this);
  }

  updateFilteredMarkets(filteredMarkets, tab) {
    this.setState({ filteredMarkets });
    if (tab) {
      this.setState({ tab });
    }
  }

  render() {
    const {
      markets,
      tabsInfo,
      marketsObj,
      currentAugurTimestamp,
      reportingWindowStatsEndTime,
      toggleFavorite
    } = this.props;
    const { filteredMarkets, tab } = this.state;

    return (
      <FilterBox
        title="Watchlist"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredData={this.updateFilteredMarkets}
        filteredData={filteredMarkets}
        data={markets}
        filterComp={filterComp}
        bottomTabs
        tabs={tabsInfo}
        label="Watched Markets"
        rows={
          <div className={Styles.Quad__container}>
            {filteredMarkets.length === 0 && (
              <EmptyDisplay title="No available markets" />
            )}
            {filteredMarkets.length > 0 &&
              filteredMarkets.map(
                market =>
                  marketsObj[market.id] ? (
                    <MarketRow
                      key={"position_" + market.id}
                      market={marketsObj[market.id]}
                      showState={tab === ALL_MARKETS}
                      noToggle
                      toggleContent={
                        <MarketPositionsTable market={marketsObj[market.id]} />
                      }
                      rightContent={
                        <div className={Styles.Quads__multiRightContent}>
                          <MarketProgress
                            reportingState={
                              marketsObj[market.id].reportingState
                            }
                            currentTime={currentAugurTimestamp}
                            endTime={marketsObj[market.id].endTime}
                            reportingWindowEndtime={reportingWindowStatsEndTime}
                          />
                          <FavoritesButton
                            action={() => toggleFavorite(market.id)}
                            isFavorite
                            hideText
                            isSmall
                          />
                        </div>
                      }
                    />
                  ) : null
              )}
          </div>
        }
      />
    );
  }
}
