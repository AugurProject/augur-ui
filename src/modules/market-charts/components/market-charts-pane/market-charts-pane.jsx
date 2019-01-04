import React from "react";
// import PropTypes from "prop-types";

import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

const MarketChartsPane = p => (
  <section>
    <ModuleTabs selected={0}>
      <ModulePane label="Price History">
        <div>Price History</div>
      </ModulePane>
      <ModulePane label="Candlesticks">
        <div>Candlesticks</div>
      </ModulePane>
      <ModulePane label="Market Depth">
        <div>Market Depth</div>
      </ModulePane>
    </ModuleTabs>
  </section>
);

export default MarketChartsPane;
