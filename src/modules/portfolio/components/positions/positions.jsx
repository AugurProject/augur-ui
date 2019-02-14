import React, { Component } from "react";
import PropTypes from "prop-types";

// import PositionsMarketsList from "modules/portfolio/components/positions-markets-list/positions-markets-list";
import PortfolioBox from "modules/portfolio/components/common/portfolio-box";

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
    currentTimestamp: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    transactionsStatus: PropTypes.object.isRequired,
    markets: PropTypes.object.isRequired,
    loadAccountTrades: PropTypes.func.isRequired,
    marketsCount: PropTypes.number.isRequired,
    claimTradingProceeds: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    console.log(props.markets);

    this.state = {
      filteredMarkets: props.markets[ALL_MARKETS]
    };

    this.updateFilteredMarkets = this.updateFilteredMarkets.bind(this);
  }

  componentWillMount() {
    const { loadAccountTrades } = this.props;
    loadAccountTrades();
  }

  updateFilteredMarkets(filteredMarkets) {
    this.setState({ filteredMarkets });
  }

  render() {
    const { markets } = this.props;
    const { filteredMarkets } = this.state;

    return (
      <PortfolioBox
        title="Positions"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredMarkets={this.updateFilteredMarkets}
        filteredMarkets={filteredMarkets}
        markets={markets}
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
