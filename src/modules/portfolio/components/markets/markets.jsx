import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/containers/filter-box";
import { LinearPropertyLabel } from "modules/common-elements/labels";
import { MarketProgress } from "modules/common-elements/progress";

import Styles from "modules/portfolio/components/common/quads/quad.styles";

// todo: need backup sorts if they have never traded or things are equal
const sortByOptions = [
  {
    label: "Sort by Most Recently Traded",
    value: "recentlyTraded",
    comp(marketA, marketB) {
      return (
        marketB.recentlyTraded.timestamp - marketA.recentlyTraded.timestamp
      );
    }
  },
  {
    label: "Sort by Creation Time",
    value: "creationTime",
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

function renderToggleContent(market) {
  return (
    <div className={Styles.Quad__infoParent}>
      <div className={Styles.Quad__infoContainer}>
        <div className={Styles.Quad__info}>
          <LinearPropertyLabel
            label="Volume"
            value={`${market.volume.formatted} ETH`}
          />
          <LinearPropertyLabel
            label="Open Interest"
            value={`${market.openInterest.formatted} ETH`}
          />
        </div>
      </div>
    </div>
  );
}

class MyMarkets extends Component {
  static propTypes = {
    myMarkets: PropTypes.array.isRequired,
    currentAugurTimestamp: PropTypes.number.isRequired,
    reportingWindowStatsEndTime: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.renderRightContent = this.renderRightContent.bind(this);
  }

  renderRightContent(market) {
    const { currentAugurTimestamp, reportingWindowStatsEndTime } = this.props;

    return (
      <MarketProgress
        reportingState={market.reportingState}
        currentTime={currentAugurTimestamp}
        endTime={market.endTime}
        reportingWindowEndtime={reportingWindowStatsEndTime}
      />
    );
  }

  render() {
    const { myMarkets } = this.props;

    return (
      <FilterBox
        title="My Created Markets"
        showFilterSearch
        sortByOptions={sortByOptions}
        markets={myMarkets}
        filterComp={filterComp}
        bottomTabs
        label="My Created Markets"
        renderRightContent={this.renderRightContent}
        renderToggleContent={renderToggleContent}
        pickVariables={[
          "id",
          "description",
          "reportingState",
          "recentlyTraded",
          "creationTime",
          "endTime"
        ]}
      />
    );
  }
}

export default MyMarkets;
