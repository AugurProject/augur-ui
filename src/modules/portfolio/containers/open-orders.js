import { connect } from "react-redux";
import memoize from "memoizee";

import OpenOrders from "modules/portfolio/components/orders/open-orders";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import getOpenOrders from "modules/orders/selectors/open-orders";

const mapStateToProps = state => {
  const openOrders = getOpenOrders();
  const markets = getPositionsMarkets(openOrders);
  const individualOrders = markets.reduce(
    (p, market) => [...p, ...market.userOpenOrders],
    []
  );

  return {
    markets,
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
