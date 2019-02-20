import { connect } from "react-redux";
import memoize from "memoizee";

import { selectCurrentTimestamp } from "src/select-state";
import FilledOrders from "modules/portfolio/components/orders/filled-orders";
import { loadAccountTrades } from "modules/positions/actions/load-account-trades";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
// delete these files if not needed
// import getOpenOrders, {
//  sortOpenOrders
// } from "modules/orders/selectors/open-orders";
import { groupBy, keys } from "lodash";

const mapStateToProps = state => {
  const account = state.loginAccount.address;
  const filledOrders = state.filledOrders[account] || [];
  const groupedFilledOrders = groupBy("marketId", filledOrders);
  const markets = keys(groupedFilledOrders);
  const marketsCount = keys(groupedFilledOrders).length;

  return {
    currentTimestamp: selectCurrentTimestamp(state),
    marketsCount,
    transactionsStatus: state.transactionsStatus,
    markets,
    transactionsLoading: state.appStatus.transactionsLoading,
    registerBlockNumber: state.loginAccount.registerBlockNumber,
    isMobile: state.appStatus.isMobile,
    filledOrders,
    groupedFilledOrders
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
