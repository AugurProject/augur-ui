import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// import PositionsMarketsList from "modules/portfolio/components/positions-markets-list/positions-markets-list";
import FilterBox from "modules/portfolio/components/common/filter-box";

import { ALL_MARKETS } from "modules/common-elements/constants";

import Styles from "modules/portfolio/components/positions/positions.styles";

import {
  MarketStatusLabel } from "modules/common-elements/labels";

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
      filteredMarkets: props.markets[ALL_MARKETS],
      tab: ALL_MARKETS
    };

    this.updateFilteredMarkets = this.updateFilteredMarkets.bind(this);
  }

  componentWillMount() {
    const { loadAccountTrades } = this.props;
    loadAccountTrades();
  }

  updateFilteredMarkets(filteredMarkets, tab) {
    this.setState({ filteredMarkets });
    if (tab) {
      this.setState({tab: tab})
    }
  }

  render() {
    const { markets } = this.props;
    const { filteredMarkets, tab } = this.state;

    console.log(tab)
    console.log(filteredMarkets)

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
        rows={
          <div>
            {filteredMarkets.map(market => (
              <details className={classNames(Styles.MarketRow, {[Styles.MarketRow__showState]: tab === ALL_MARKETS})}>
                <summary className={Styles.MarketRow__summary}>
                  {tab === ALL_MARKETS && <MarketStatusLabel marketStatus={market.marketStatus} alternate mini /> }
                  <div>
                    <span>{market.description}</span>
                    <span>{market.creationTime.formattedShortDate}</span>
                  </div>
                </summary>
                hi
              </details>
            ))}
          </div>
        }
      />
    );
  }
}
