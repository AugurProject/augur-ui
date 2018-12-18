import React from "react";
import PropTypes from "prop-types";

import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";
import OpenOrdersTable from "modules/market/components/market-orders-positions-table/open-orders-table";

const MarketOrdersPositionsTable = ({
  isMobile,
  marketId,
  outcomes,
  numCompleteSets,
  transactionsStatus,
  positions,
  orphanedOrders,
  openOrders,
  selectedOutcome,
  cancelOrphanedOrder,
  sellCompleteSets,
  updateSelectedOutcome
}) => (
  <section>
    <ModuleTabs selected={0}>
      <ModulePane label="Open Orders">
        <OpenOrdersTable
          openOrders={openOrders}
          orphanedOrders={orphanedOrders}
          cancelOrphanedOrder={cancelOrphanedOrder}
          marketId={marketId}
        />
      </ModulePane>
      <ModulePane label="Filled Orders">
        <div>Filled Orders!</div>
      </ModulePane>
      <ModulePane label="Positions">
        <div>Positions!</div>
      </ModulePane>
    </ModuleTabs>
  </section>
);

MarketOrdersPositionsTable.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  marketId: PropTypes.string.isRequired,
  outcomes: PropTypes.array,
  numCompleteSets: PropTypes.object,
  transactionsStatus: PropTypes.object.isRequired,
  positions: PropTypes.array,
  orphanedOrders: PropTypes.array,
  openOrders: PropTypes.array,
  selectedOutcome: PropTypes.string,
  cancelOrphanedOrder: PropTypes.func.isRequired,
  sellCompleteSets: PropTypes.func.isRequired,
  updateSelectedOutcome: PropTypes.func.isRequired
};

MarketOrdersPositionsTable.defaultProps = {
  outcomes: [],
  numCompleteSets: null,
  positions: [],
  orphanedOrders: [],
  openOrders: [],
  selectedOutcome: null
};

export default MarketOrdersPositionsTable;
