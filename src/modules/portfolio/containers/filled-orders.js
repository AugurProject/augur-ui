import { connect } from "react-redux";
import memoize from "memoizee";

import { selectCurrentTimestamp } from "src/select-state";
import FilledOrders from "modules/portfolio/components/orders/filled-orders";
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
  const marketsCount = markets.length;

  const individualOrders = [];
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
    currentTimestamp: selectCurrentTimestamp(state),
    marketsCount,
    transactionsStatus: state.transactionsStatus,
    markets,
    transactionsLoading: state.appStatus.transactionsLoading,
    registerBlockNumber: state.loginAccount.registerBlockNumber,
    isMobile: state.appStatus.isMobile,
    filledOrders: individualOrders
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

const FilledOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilledOrders);

export default FilledOrdersContainer;
