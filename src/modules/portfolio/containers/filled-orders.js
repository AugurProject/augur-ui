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
import { selectFilledOrders } from "modules/orders/selectors/filled-orders";

const mapStateToProps = state => {
  const { marketTradingHistory, marketReportState, loginAccount, filledOrders, outcomesData } = state;
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
        "reportingState",
        "marketType",
        "outcomesData"
      ])
    ),
    item => {
      const formattedFilledOrders = selectFilledOrders(groupedFilledOrders[item.id], account, outcomesData)
      return ({
        description: item.description,
        marketId: item.id,
        creationTime: item.creationTime,
        marketStatus: item.reportingState,
        filledOrders: formattedFilledOrders
      })
    }
  );

  const marketsCount = markets.length;

  const allFilledOrders = [];
  for (var id in marketIds) {
    const formattedFilledOrders = selectFilledOrders(marketTradingHistory[marketIds[id]], account, outcomesData)
    Array.prototype.push.apply(allFilledOrders, formattedFilledOrders);
  }

  return {
    currentTimestamp: selectCurrentTimestamp(state),
    marketsCount,
    transactionsStatus: state.transactionsStatus,
    markets,
    transactionsLoading: state.appStatus.transactionsLoading,
    registerBlockNumber: state.loginAccount.registerBlockNumber,
    isMobile: state.appStatus.isMobile,
    filledOrders: allFilledOrders,
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
