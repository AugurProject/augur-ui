import { connect } from "react-redux";

import FilledOrders from "modules/portfolio/components/orders/filled-orders";
import { triggerTransactionsExport } from "modules/transactions/actions/trigger-transactions-export";
import { updateModal } from "modules/modal/actions/update-modal";
import { MODAL_CLAIM_TRADING_PROCEEDS } from "modules/common-elements/constants";
import { groupBy, keys, differenceBy } from "lodash";
import { selectMarket } from "modules/markets/selectors/market";

const mapStateToProps = state => {
  const { marketReportState, loginAccount, filledOrders, marketsData } = state;
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
  const markets = marketIds.map(m => marketsData[m]).map(item => {
    const marketInfo = selectMarket(item.id);
    return {
      ...item,
      recentlyTraded: marketInfo.recentlyTraded,
      filledOrders: selectMarket(item.id).filledOrders
    };
  });

  /* eslint-disable */
  let allFilledOrders = [];
  marketIds.map(marketId => {
    const formattedFilledOrders = selectMarket(marketId).filledOrders;
    Array.prototype.push.apply(allFilledOrders, formattedFilledOrders);
  });
  /* eslint-disable */

  const marketsObj = markets.reduce((obj, market) => {
    obj[market.id] = market;
    return obj;
  }, {});

  const ordersObj = allFilledOrders.reduce((obj, order) => {
    obj[order.id] = order;
    return obj;
  }, {});

  return {
    markets,
    marketsObj,
    ordersObj,
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
