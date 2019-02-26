import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/components/common/quads/filter-box";
import MarketRow from "modules/portfolio/components/common/rows/market-row";

import MarketPositionsTable from "modules/portfolio/components/common/tables/market-positions-table";

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

export default class Positions extends Component {
  static propTypes = {
    markets: PropTypes.object.isRequired,
    tabsInfo: PropTypes.array.isRequired
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
    const { markets, tabsInfo } = this.props;
    const { filteredMarkets, tab } = this.state;

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
        rows={
          <div>
            {filteredMarkets.map(market => (
              <MarketRow
                key={"position_" + market.id}
                market={market}
                showState={tab === ALL_MARKETS}
                toggleContent={<MarketPositionsTable market={market} />}
              />
            ))}
          </div>
        }
      />
    );
  }
}
