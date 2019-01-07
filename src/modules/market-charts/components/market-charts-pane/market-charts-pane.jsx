import React, { Component } from "react";
import * as PropTypes from "prop-types";

import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";
import { Candlestick } from "src/modules/market/components/market-view-charts/candlestick";
import MarketDepth from "modules/market-charts/containers/market-outcome-chart-depth";
import { BigNumber } from "bignumber.js";

export default class MarketChartsPane extends Component {
  static propTypes = {
    currentTimestamp: PropTypes.number.isRequired,
    marketId: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    selectedOutcome: PropTypes.string.isRequired,
    updateSelectedOrderProperties: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hoveredDepth: [],
      hoveredPrice: null
    };
    this.updateHoveredPrice = this.updateHoveredPrice.bind(this);
    this.updateHoveredDepth = this.updateHoveredDepth.bind(this);
  }

  updateHoveredDepth(hoveredDepth) {
    this.setState({
      hoveredDepth
    });
  }

  updateHoveredPrice(hoveredPrice) {
    this.setState({
      hoveredPrice
    });
  }

  render() {
    const {
      currentTimestamp,
      marketId,
      selectedOutcome,
      maxPrice,
      minPrice,
      updateSelectedOrderProperties
    } = this.props;
    const s = this.state;

    return (
      <ModuleTabs selected={0}>
        <ModulePane label="Price History">Price History</ModulePane>
        <ModulePane label="Candlesticks">
          <Candlestick
            currentTimeInSeconds={currentTimestamp}
            marketId={marketId}
            selectedOutcome={selectedOutcome}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </ModulePane>
        <ModulePane
          ref={ordersContainer => {
            this.ordersContainer = ordersContainer;
          }}
          label="Market Depth"
        >
          <MarketDepth
            marketId={marketId}
            selectedOutcome={selectedOutcome}
            updateSelectedOrderProperties={updateSelectedOrderProperties}
            hoveredPrice={s.hoveredPrice}
            hoveredDepth={s.hoveredDepth}
            updateHoveredDepth={this.updateHoveredDepth}
            updateHoveredPrice={this.updateHoveredPrice}
          />
        </ModulePane>
      </ModuleTabs>
    );
  }
}
