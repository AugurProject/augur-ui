import { connect } from "react-redux";

import { selectCurrentTimestamp } from "src/select-state";
import FilledOrders from "modules/portfolio/components/orders/filled-orders";
import { loadAccountTrades } from "modules/positions/actions/load-account-trades";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import { selectMarket } from "modules/markets/selectors/market";
// delete these files if not needed
// import getOpenOrders, {
//  sortOpenOrders
// } from "modules/orders/selectors/open-orders";
import { groupBy, keys, differenceBy, pick, map } from "lodash";

const mapStateToProps = state => {
  const { marketReportState, loginAccount, filledOrders } = state;
  const resolvedMarkets = marketReportState.resolved;
  const account = loginAccount.address;
  const userFilledOrders = filledOrders[account] || [];
  const nonFinalizedMarketFilledOrders = differenceBy(
    userFilledOrders,
    resolvedMarkets,
    "marketId"
  );
  const groupedFilledOrders = groupBy(
    nonFinalizedMarketFilledOrders,
    "marketId"
  );
  const marketIds = keys(groupedFilledOrders);
  const markets = map(
    map(marketIds, m =>
      pick(selectMarket(m), [
        "description",
        "id",
        "creationTime",
        "reportingState"
      ])
    ),
    item => ({
      description: item.description,
      marketId: item.id,
      creationTime: item.creationTime,
      marketStatus: item.reportingState
    })
  );

  const marketsCount = markets.length;

  return {
    currentTimestamp: selectCurrentTimestamp(state),
    marketsCount,
    transactionsStatus: state.transactionsStatus,
    markets,
    transactionsLoading: state.appStatus.transactionsLoading,
    registerBlockNumber: state.loginAccount.registerBlockNumber,
    isMobile: state.appStatus.isMobile,
    filledOrders: userFilledOrders,
    groupedFilledOrders
  };
};

const mapDispatchToProps = dispatch => ({
  loadAccountTrades: () => dispatch(loadAccountTrades()),
  triggerTransactionsExport: () => dispatch(triggerTransactionsExport()),
  claimTradingProceeds: marketId =>
    dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId }))
});

const FilledOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilledOrders);

export default FilledOrdersContainer;
