import React from "react";
// import PropTypes from "prop-types";

import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";
import { Candlestick } from "src/modules/market/components/market-view-charts/candlestick";
import * as PropTypes from "prop-types";
import { BigNumber } from "bignumber.js";

const MarketChartsPane = ({
  currentTimestamp,
  marketId,
  selectedOutcome,
  maxPrice,
  minPrice
}) => (
  <section>
    <ModuleTabs selected={0}>
      <ModulePane label="Price History">
        <div>Price History</div>
      </ModulePane>
      <ModulePane label="Candlesticks">
        <Candlestick
          currentTimeInSeconds={currentTimestamp}
          marketId={marketId}
          selectedOutcome={selectedOutcome}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </ModulePane>
      <ModulePane label="Market Depth">
        <div>Market Depth</div>
      </ModulePane>
    </ModuleTabs>
  </section>
);

MarketChartsPane.propTypes = {
  currentTimestamp: PropTypes.number.isRequired,
  marketId: PropTypes.string.isRequired,
  maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
  minPrice: PropTypes.instanceOf(BigNumber).isRequired,
  selectedOutcome: PropTypes.string.isRequired
};

export default MarketChartsPane;
