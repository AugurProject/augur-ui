import { connect } from "react-redux";
import memoize from "memoizee";

import OpenOrders from "modules/portfolio/components/orders/open-orders";
import { loadAccountTrades } from "modules/positions/actions/load-account-trades";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import getOpenOrders, {
  sortOpenOrders
} from "modules/orders/selectors/open-orders";

const mapStateToProps = state => {
  const openOrders = getOpenOrders();

  const markets = getPositionsMarkets(openOrders);

  const individualOrders = [];

  // todo: find filled orders
  Object.keys(markets).forEach(id => {
    const market = markets[id];

    if (market && market.outcomes && market.outcomes.length > 0) {
      const newMarket = sortOpenOrders(market);
      const openOrders = newMarket.outcomes.reduce((p, outcome) => {
        if (outcome.userOpenOrders && outcome.userOpenOrders.length > 0) {
          outcome.userOpenOrders.forEach(order => p.push(order));
        }
        return p;
      }, []);
      Array.prototype.push.apply(individualOrders, openOrders);
    }
  });

  return {
    markets,
    openOrders: individualOrders
  };
};

const mapDispatchToProps = dispatch => ({
  loadAccountTrades: () => dispatch(loadAccountTrades()),
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
