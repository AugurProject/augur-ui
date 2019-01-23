import React from "react";
import PropTypes from "prop-types";

import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";
import OpenOrdersTable from "modules/market/components/market-orders-positions-table/open-orders-table";
import PositionsTable from "modules/market/components/market-positions-table/market-positions-table";
import FilledOrdersTable from "modules/market/components/market-orders-positions-table/filled-orders-table";

const MarketOrdersPositionsTable = ({
  isMobile,
  marketId,
  outcomes,
  numCompleteSets,
  transactionsStatus,
  positions,
  orphanedOrders,
  openOrders,
  cancelOrphanedOrder,
  sellCompleteSets,
  market,
  filledOrders
}) => (
  <section>
    <ModuleTabs selected={0} fillForMobile={isMobile}>
      <ModulePane label="Open Orders">
        <OpenOrdersTable
          openOrders={openOrders}
          orphanedOrders={orphanedOrders}
          cancelOrphanedOrder={cancelOrphanedOrder}
          marketId={marketId}
          isMobile={isMobile}
          market={market}
        />
      </ModulePane>
      <ModulePane label="My Fills">
        <FilledOrdersTable
          filledOrders={filledOrders}
          scalarDenomination={market.scalarDenomination}
          isMobile={isMobile}
        />
      </ModulePane>
      <ModulePane label="Positions">
        <PositionsTable
          positions={positions}
          marketId={marketId}
          numCompleteSets={numCompleteSets}
          sellCompleteSets={sellCompleteSets}
          transactionsStatus={transactionsStatus}
          market={market}
          isMobile={isMobile}
        />
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
  cancelOrphanedOrder: PropTypes.func.isRequired,
  sellCompleteSets: PropTypes.func.isRequired,
  market: PropTypes.object.isRequired,
  filledOrders: PropTypes.array
};

MarketOrdersPositionsTable.defaultProps = {
  outcomes: [],
  numCompleteSets: null,
  positions: [],
  orphanedOrders: [],
  openOrders: [],
  filledOrders: []
};

export default MarketOrdersPositionsTable;
