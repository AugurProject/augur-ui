import { connect } from "react-redux";
import memoize from "memoizee";

import OpenOrders from "modules/portfolio/components/orders/open-orders";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import getOpenOrders from "modules/orders/selectors/open-orders";
import * as constants from "src/modules/common-elements/constants";

import { selectPendingOrdersState } from "src/select-state";
import { selectMarket } from "modules/markets/selectors/market";

const mapStateToProps = state => {
  const openOrders = getOpenOrders();
  const markets = getPositionsMarkets(openOrders);

  const markets = getPositionsMarkets(openOrders).filter(
    market => market.marketStatus !== constants.MARKET_CLOSED
  );

  let individualOrders = markets.reduce(
    (p, market) => [...p, ...market.userOpenOrders],
    []
  );

  Object.keys(pendingOrders).forEach(marketId => {
    individualOrders = (pendingOrders[marketId] || []).concat(individualOrders);
  });

  Object.keys(pendingOrders).forEach(marketId => {
    const findIndex = markets.findIndex(market => market.id === marketId);
    if (findIndex >= 0) {
      // market is already in the open orders list
      markets[findIndex] = {
        ...markets[findIndex],
        userOpenOrders: markets[findIndex].userOpenOrders.concat(
          pendingOrders[marketId] || []
        )
      };
    } else {
      const market = selectMarket(marketId);
      markets.push({
        ...market,
        userOpenOrders: pendingOrders[marketId]
      });
    }
  });

  const marketsObj = markets.reduce((obj, market) => {
    obj[market.id] = market;
    return obj;
  }, {});

  const ordersObj = individualOrders.reduce((obj, order) => {
    obj[order.id] = order;
    return obj;
  }, {});

  return {
    markets,
    marketsObj,
    ordersObj,
    openOrders: individualOrders
  };
};

const mapDispatchToProps = dispatch => ({
  triggerTransactionsExport: () => dispatch(triggerTransactionsExport()),
  claimTradingProceeds: marketId =>
    dispatch(
      updateModal({ type: constants.MODAL_CLAIM_TRADING_PROCEEDS, marketId })
    )
});

const getPositionsMarkets = memoize(
  openOrders => Array.from(new Set([...openOrders])),
  { max: 1 }
);

const OpenOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenOrders);

export default OpenOrdersContainer;
