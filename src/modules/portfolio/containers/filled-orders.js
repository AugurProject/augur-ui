import { connect } from "react-redux";

import FilledOrders from "modules/portfolio/components/orders/filled-orders";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import { groupBy, keys, differenceBy } from "lodash";
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
  const markets = marketIds.map(m => marketsData[m]).map(item => ({
    ...item,
    filledOrders: selectFilledOrders(
      groupedFilledOrders[item.id],
      account,
      outcomesData[item.id],
      marketsData[item.id]
    )
  }));

  /* eslint-disable */
  let allFilledOrders = [];
  marketIds.map(marketId => {
    const formattedFilledOrders = selectFilledOrders(marketTradingHistory[marketId], account, outcomesData[marketId], marketsData[marketId]);
    Array.prototype.push.apply(allFilledOrders, formattedFilledOrders);
  });
  /* eslint-disable */

  //console.log(markets)

  return {
    markets,
    filledOrders: allFilledOrders
  };
};

const mapDispatchToProps = dispatch => ({
  triggerTransactionsExport: () => dispatch(triggerTransactionsExport()),
  claimTradingProceeds: marketId => dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId }))
});

const FilledOrdersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilledOrders);

export default FilledOrdersContainer;
