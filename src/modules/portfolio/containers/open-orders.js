import { connect } from "react-redux";
import memoize from "memoizee";

import OpenOrders from "modules/portfolio/components/orders/open-orders";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import getOpenOrders from "modules/orders/selectors/open-orders";
import * as constants from "src/modules/common-elements/constants";

const mapStateToProps = state => {
  const openOrders = getOpenOrders();
  const markets = getPositionsMarkets(openOrders).filter(market => {
    return market.marketStatus !== constants.MARKET_CLOSED
  });

  const individualOrders = markets.reduce(
    (p, market) => [...p, ...market.userOpenOrders],
    []
  );

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
    dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId }))
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
