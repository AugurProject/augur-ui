import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import makePath from "modules/routes/helpers/make-path";

import PositionsMarketsList from "modules/portfolio/components/positions-markets-list/positions-markets-list";
import PortfolioStyles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";
import { MARKETS } from "modules/routes/constants/views";
import PortfolioBox from "modules/portfolio/components/common/portfolio-box";

export default class Positions extends Component {
  static propTypes = {
    currentTimestamp: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    transactionsStatus: PropTypes.object.isRequired,
    openPositionMarkets: PropTypes.array.isRequired,
    reportingMarkets: PropTypes.array.isRequired,
    closedMarkets: PropTypes.array.isRequired,
    loadAccountTrades: PropTypes.func.isRequired,
    marketsCount: PropTypes.number.isRequired,
    claimTradingProceeds: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      sortBy: 'creationTime',
      displayState: 'ALL',
      markets: props.reportingMarkets
    };

    this.runSortBy = this.runSortBy.bind(this);
    this.updateSortBy = this.updateSortBy.bind(this);
  }

  componentWillMount() {
    const { loadAccountTrades } = this.props;
    loadAccountTrades();
  }

  updateSortBy() {
    this.setState({sortBy: 'endTime'}, () => {
      this.runSortBy()
    });
  }

  runSortBy() {
    let { markets } = this.state;
    console.log(markets)
    markets = markets.sort((marketA, marketB) =>
      marketA[this.state.sortBy].timestamp - marketB[this.state.sortBy].timestamp
    );

    this.setState({markets: markets})
  }

  render() {
    const {
      claimTradingProceeds,
      closedMarkets,
      currentTimestamp,
      history,
      isMobile,
      location,
      marketsCount,
      openPositionMarkets,
      reportingMarkets,
      transactionsStatus
    } = this.props;
    const { markets, sortBy } = this.state;
    return (
      <PortfolioBox 
        title="Positions" 
        rows={
          <div>
            {
              markets.map(market => (
                <div key={market.id}>{market.description + " " + market.creationTime.formattedShortDate}</div>
            ))}
          </div>
        } 
        rightContent={
          <div onClick={this.updateSortBy}>{sortBy}</div>
        } 
        bottomBarContent={<div>bottom bar content</div>}
      />
    );
  }
}
