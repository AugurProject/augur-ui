import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterSwitchBox from "modules/portfolio/containers/filter-switch-box";
import OrderMarketRow from "modules/portfolio/components/common/rows/order-market-row";
import FilledOrder from "modules/portfolio/components/common/rows/filled-order";
import FilledOrdersHeader from "modules/portfolio/components/common/headers/filled-orders-header";
import EmptyDisplay from "modules/portfolio/components/common/tables/empty-display";

import Styles from "modules/portfolio/components/common/quads/quad.styles";

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
    marketsObj: PropTypes.object.isRequired,
    ordersObj: PropTypes.object.isRequired
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
    const { markets, filledOrders, ordersObj, marketsObj } = this.props;
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
        label={viewByMarkets ? "Markets" : "Filled Orders"}
        rows={
          <div className={Styles.Quad__container}>
            {filteredData.length === 0 && (
              <EmptyDisplay
                title={
                  viewByMarkets ? "No available markets" : "No available orders"
                }
              />
            )}
            {filteredData.map(
              data =>
                viewByMarkets && marketsObj[data.id] ? (
                  <OrderMarketRow
                    key={"filledOrderMarket_" + data.id}
                    market={marketsObj[data.id]}
                    filledOrders
                  />
                ) : ordersObj[data.id] ? (
                  <FilledOrder
                    key={"filledOrder_" + data.id}
                    filledOrder={ordersObj[data.id]}
                    isSingle
                  />
                ) : null
            )}
          </div>
        }
      />
    );
  }
}
