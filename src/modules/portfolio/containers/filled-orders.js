import { connect } from "react-redux";

import FilledOrders from "modules/portfolio/components/orders/filled-orders";
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
  const {
    marketTradingHistory,
    marketReportState,
    loginAccount,
    filledOrders,
    outcomesData,
    marketsData
  } = state;
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
      pick(marketsData[m], [
        "description",
        "id",
        "creationTime",
        "reportingState",
        "marketType",
        "outcomesData"
      ])
    ),
    item => {
      const formattedFilledOrders = selectFilledOrders(
        groupedFilledOrders[item.id],
        account,
        outcomesData
      );
      return {
        description: item.description,
        marketId: item.id,
        creationTime: item.creationTime,
        marketStatus: item.reportingState,
        filledOrders: formattedFilledOrders
      };
    }
  );

  /* eslint-disable */
  let allFilledOrders = [];
  marketIds.map(marketId => {
    const formattedFilledOrders = selectFilledOrders(
      marketTradingHistory[marketId],
      account,
      outcomesData
    );
    Array.prototype.push.apply(allFilledOrders, formattedFilledOrders);
  });
  /* eslint-disable */

  return {
    markets,
    filledOrders: allFilledOrders
  };
};

const mapDispatchToProps = dispatch => ({
  triggerTransactionsExport: () => dispatch(triggerTransactionsExport()),
  claimTradingProceeds: marketId =>
    dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId }))
});

const FilledOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilledOrders);

export default FilledOrdersContainer;
