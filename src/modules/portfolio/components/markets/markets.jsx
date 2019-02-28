import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/components/common/quads/filter-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";
import { LinearPropertyLabel } from "modules/common-elements/labels";
import Styles from "modules/portfolio/components/common/rows/market-row.styles";
import { MarketProgress } from "modules/common-elements/progress";

import { ALL_MARKETS } from "modules/common-elements/constants";

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
          <div>
            {filteredMarkets.map(market => (
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
                  <div className={Styles.MarketRow__infoParent}>
                    <div className={Styles.MarketRow__infoContainer}>
                      <div className={Styles.MarketRow__info}>
                        <LinearPropertyLabel
                          label="Volume"
                          value={`${
                            marketsObj[market.id].volume.formatted
                          } ETH`}
                        />
                        <LinearPropertyLabel
                          label="Open Interest"
                          value={`${
                            marketsObj[market.id].openInterest.formatted
                          } ETH`}
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
