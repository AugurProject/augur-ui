import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterBox from "modules/portfolio/components/common/filter-box";

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
    collectMarketCreatorFees: PropTypes.func.isRequired,
    loadMarketsInfoIfNotLoaded: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isLogged: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    loadMarkets: PropTypes.func.isRequired,
    loadMarketsInfo: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    myMarkets: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    pendingLiquidityOrders: PropTypes.object.isRequired,
    outcomes: PropTypes.object.isRequired,
    loadDisputingMarkets: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    
    this.state = {
      filteredMarkets: props.myMarkets[ALL_MARKETS]
    };

    this.updateFilteredMarkets = this.updateFilteredMarkets.bind(this);
  }

  componentWillMount() {
    const { loadMarkets, loadDisputingMarkets } = this.props;
    // Load all markets incase they haven't been loaded already
    // Eventually replace this with a 1 to 1 call to augurnode for example what we need.
    loadMarkets();
    loadDisputingMarkets();
  }

  updateFilteredMarkets(filteredMarkets) {
    this.setState({ filteredMarkets });
  }

  render() {
     const { myMarkets } = this.props;
    const { filteredMarkets } = this.state;

    return (
      <FilterBox
        title="My Created Markets"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredMarkets={this.updateFilteredMarkets}
        filteredMarkets={filteredMarkets}
        markets={myMarkets}
        filterComp={filterComp}
        rows={
          <div>
            {filteredMarkets.map(market => (
              <div key={market.id}>
                {market.description +
                  " " +
                  market.creationTime.formattedShortDate}
              </div>
            ))}
          </div>
        }
        bottomTabs
      />
    );
  }
}

export default MyMarkets;
