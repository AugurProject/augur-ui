import React, { Component } from "react";
import PropTypes from "prop-types";

import FilterSwitchBox from "modules/portfolio/containers/filter-switch-box";
import OpenOrder from "modules/portfolio/components/common/rows/open-order";
import OpenOrdersHeader from "modules/portfolio/components/common/headers/open-orders-header";
import OrderMarketRow from "modules/portfolio/components/common/rows/order-market-row";
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

export default class OpenOrders extends Component {
  static propTypes = {
    markets: PropTypes.array.isRequired,
    openOrders: PropTypes.array.isRequired,
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
      data.name && data.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }

  switchView() {
    this.setState({
      filteredData: this.state.viewByMarkets
        ? this.props.openOrders
        : this.props.markets,
      viewByMarkets: !this.state.viewByMarkets
    });
  }

  render() {
    const { markets, openOrders, marketsObj, ordersObj } = this.props;
    const { filteredData, viewByMarkets } = this.state;

    return (
      <FilterSwitchBox
        title="Open Orders"
        showFilterSearch
        sortByOptions={sortByOptions}
        updateFilteredData={this.updateFilteredData}
        data={viewByMarkets ? markets : openOrders}
        filterComp={this.filterComp}
        switchView={this.switchView}
        bottomBarContent={<OpenOrdersHeader />}
        label={viewByMarkets ? "Markets" : "Open Orders"}
        rows={
          <div className={Styles.Quad__container}>
            {filteredData.length === 0 ||
              (markets.length === 0 && (
                <EmptyDisplay
                  title={
                    viewByMarkets
                      ? "No available markets"
                      : "No available orders"
                  }
                />
              ))}
            {filteredData.length > 0 &&
              markets.length > 0 &&
              filteredData.map(
                data =>
                  viewByMarkets && marketsObj[data.id] ? (
                    <OrderMarketRow
                      key={"openOrderMarket_" + data.id}
                      market={marketsObj[data.id]}
                    />
                  ) : (
                    ordersObj[data.id] ? <OpenOrder
                      key={"openOrder_" + data.id}
                      openOrder={ordersObj[data.id]}
                      isSingle
                    /> : null
                  )
              )}
          </div>
        }
      />
    );
  }
}
