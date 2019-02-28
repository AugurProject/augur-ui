import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/components/common/quads/filter-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";
import { LinearPropertyLabel } from "modules/common-elements/labels";
import { MarketProgress } from "modules/common-elements/progress";
import EmptyDisplay from "modules/portfolio/components/common/tables/empty-display";

import { ALL_MARKETS } from "modules/common-elements/constants";

import Styles from "modules/portfolio/components/common/quads/quad.styles";

const sortByOptions = [
  {
    label: "Sort by Most Recent",
    value: "creationTime",
    comp(marketA, marketB) {
      return marketB.creationTime.timestamp - marketA.creationTime.timestamp;
    }
  },
  {
    label: "Sort by Expiring Soonest",
    value: "endTime",
    comp(marketA, marketB) {
      return marketB.endTime.timestamp - marketA.endTime.timestamp;
    }
  }
];

function filterComp(input, market) {
  return market.description.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

class MyMarkets extends Component {
  static propTypes = {
    myMarkets: PropTypes.object.isRequired,
    marketsObj: PropTypes.object.isRequired,
    tabsInfo: PropTypes.array.isRequired,
    currentAugurTimestamp: PropTypes.number.isRequired,
    reportingWindowStatsEndTime: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      filteredMarkets: props.myMarkets[ALL_MARKETS],
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
      myMarkets,
      tabsInfo,
      currentAugurTimestamp,
      reportingWindowStatsEndTime,
      marketsObj
    } = this.props;
    const { filteredMarkets, tab } = this.state;

    return (
      <FilterBox
        title="My Created Markets"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredData={this.updateFilteredMarkets}
        filteredData={filteredMarkets}
        data={myMarkets}
        filterComp={filterComp}
        bottomTabs
        tabs={tabsInfo}
        label="My Created Markets"
        rows={
          <div className={Styles.Quad__container}>
            {filteredMarkets.length === 0 && (
              <EmptyDisplay title="No available markets" />
            )}
            {filteredMarkets.length > 0 &&
              filteredMarkets.map(market => (
                <MarketRow
                  key={"myMarket_" + market.id}
                  market={marketsObj[market.id]}
                  showState={tab === ALL_MARKETS}
                  rightContent={
                    <MarketProgress
                      reportingState={marketsObj[market.id].reportingState}
                      currentTime={currentAugurTimestamp}
                      endTime={marketsObj[market.id].endTime}
                      reportingWindowEndtime={reportingWindowStatsEndTime}
                    />
                  }
                  toggleContent={
                    <div className={Styles.Quad__infoParent}>
                      <div className={Styles.Quad__infoContainer}>
                        <div className={Styles.Quad__info}>
                          <LinearPropertyLabel
                            label="Volume"
                            value={`${marketsObj[market.id].volume.formatted} ETH`}
                          />
                          <LinearPropertyLabel
                            label="Open Interest"
                            value={`${marketsObj[market.id].openInterest.formatted} ETH`}
                          />
                        </div>
                      </div>
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

export default MyMarkets;
