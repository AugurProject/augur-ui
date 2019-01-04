import React from "react";
// import PropTypes from "prop-types";

import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

const MarketChartsPane = p => (
  <ModuleTabs selected={0}>
    <ModulePane label="Price History">Price History</ModulePane>
    <ModulePane label="Candlesticks">Candlesticks</ModulePane>
    <ModulePane label="Market Depth">Market Depth</ModulePane>
  </ModuleTabs>
);

export default MarketChartsPane;
