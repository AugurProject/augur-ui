import { connect } from "react-redux";
import memoize from "memoizee";

import { selectCurrentTimestamp, selectOrphanOrders } from "src/select-state";
import OpenOrders from "modules/portfolio/components/orders/open-orders";
import getLoginAccountPositions from "modules/positions/selectors/login-account-positions";
import getOpenOrders from "modules/orders/selectors/open-orders";
import { loadAccountTrades } from "modules/positions/actions/load-account-trades";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { selectMarket } from "modules/markets/selectors/market";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import { sortOpenOrders } from "modules/orders/selectors/open-orders";

import { createMarketsStateObject } from "modules/portfolio/helpers/create-markets-state-object";

const mapStateToProps = state => {
  const openOrders = getOpenOrders();

  const markets = getPositionsMarkets(openOrders);
  const marketsCount = markets.length;

  const individualOrders = [];
  for (var id in markets) {
    const market = markets[id];

    if (market && market.outcomes && market.outcomes.length > 0) {
      const newMarket = sortOpenOrders(market);
      const openOrders = newMarket.outcomes.reduce((p, outcome) => {
        if (outcome.userOpenOrders && outcome.userOpenOrders.length > 0) {
          outcome.userOpenOrders.forEach(order => p.push(order));
        }
        return p;
      }, []);
      Array.prototype.push.apply(individualOrders,openOrders); 
    }
  }

  return {
    currentTimestamp: selectCurrentTimestamp(state),
    marketsCount,
    transactionsStatus: state.transactionsStatus,
    markets: markets,
    transactionsLoading: state.appStatus.transactionsLoading,
    registerBlockNumber: state.loginAccount.registerBlockNumber,
    isMobile: state.appStatus.isMobile,
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
  (openOrders) =>
    Array.from(
      new Set([...openOrders])
    ),
  { max: 1 }
);

const OpenOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenOrders);

export default OpenOrdersContainer;
