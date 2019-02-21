import React, { Component } from "react";
import PropTypes from "prop-types";

// import PositionsMarketsList from "modules/portfolio/components/positions-markets-list/positions-markets-list";
import FilterSwitchBox from "modules/portfolio/components/common/quads/filter-switch-box";
import { OrderMarketRow } from "modules/portfolio/components/common/rows/order-market-row";
import { FilledOrder } from "modules/portfolio/components/common/rows/filled-order";
import { FilledOrdersHeader } from "modules/portfolio/components/common/headers/filled-orders-header";

import Styles from "modules/portfolio/components/orders/open-orders.styles";

const sortByOptions = [
  {
    label: "View by Most Recently Traded Market",
    value: "creationTime",
    comp: null
  },
  {
    label: "View by Most Recently Traded Outcome",
    value: "endTime",
    comp: null
  }
];

export default class FilledOrders extends Component {
  static propTypes = {
    markets: PropTypes.array.isRequired,
    filledOrders: PropTypes.array.isRequired,
    loadAccountTrades: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      filteredData: props.markets,
      viewByMarkets: true
    };

    this.updateFilteredData = this.updateFilteredData.bind(this);
    this.filterComp = this.filterComp.bind(this);
    this.switchView = this.switchView.bind(this);
  }

  componentWillMount() {
    const { loadAccountTrades } = this.props;
    loadAccountTrades();
  }

  updateFilteredData(filteredData) {
    this.setState({ filteredData });
  }

  filterComp(input, data) {
    if (this.state.viewByMarkets) {
      return data.description.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return (
      data.outcome &&
      data.outcome.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }

  switchView() {
    this.setState({
      filteredData: this.state.viewByMarkets
        ? this.props.filledOrders
        : this.props.markets,
      viewByMarkets: !this.state.viewByMarkets
    });
  }

  render() {
    const { markets, filledOrders } = this.props;
    const { filteredData, viewByMarkets } = this.state;

    return (
      <FilterSwitchBox
        title="Filled Orders"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredData={this.updateFilteredData}
        data={viewByMarkets ? markets : filledOrders}
        filterComp={this.filterComp}
        switchView={this.switchView}
        bottomBarContent={<FilledOrdersHeader />}
        rows={
          <div>
            {filteredData.map(
              data =>
                viewByMarkets ? (
                  <OrderMarketRow
                    key={"filledOrderMarket_" + data.marketId}
                    market={data}
                    filledOrders
                  />
                ) : (
                  <FilledOrder
                    key={"filledOrder_" + data.id}
                    filledOrder={data}
                    toggleClassName={Styles.Orders__orderSingle}
                  />
                )
            )}
          </div>
        }
      />
    );
  }
}
