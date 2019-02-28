import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MarketOrdersPositionsTable from "modules/market/components/market-orders-positions-table/market-orders-positions-table";
import { selectMarket } from "modules/markets/selectors/market";
import { sellCompleteSets } from "modules/positions/actions/sell-complete-sets";
import { cancelOrphanedOrder } from "modules/orders/actions/orphaned-orders";
import {
  CATEGORICAL,
  MODAL_CLAIM_TRADING_PROCEEDS
} from "modules/common-elements/constants";
import { find } from "lodash";
import {
  selectCurrentTimestamp,
  selectOrphanOrders,
  selectPendingOrdersState
} from "src/select-state";
import { constants } from "services/augurjs";
import { updateModal } from "modules/modal/actions/update-modal";
import { createBigNumber } from "utils/create-big-number";
import { selectFilledOrders } from "modules/orders/selectors/filled-orders";
import { cancelAllOpenOrders } from "modules/orders/actions/cancel-order";

const mapStateToProps = (state, ownProps) => {
  const market = selectMarket(ownProps.marketId);
  let openOrders = market.userOpenOrders || [];

  const pendingOrders = selectPendingOrdersState(state);
  const positions = market.userPositions || [];
  openOrders = openOrders.concat(pendingOrders[ownProps.marketId] || []);

  const filteredOrphanOrders = selectOrphanOrders(state).filter(
    order => order.marketId === ownProps.marketId
  );

  filteredOrphanOrders.forEach(order => {
    const id = order.outcome;
    const outcome = find(market.outcomes, { id });
    order.outcomeName =
      market.marketType === CATEGORICAL
        ? outcome.description
        : outcome.name || order.price;
  });

  let canClaim = false;
  if (market.finalizationTime) {
    const endTimestamp = createBigNumber(market.finalizationTime).plus(
      createBigNumber(constants.CONTRACT_INTERVAL.CLAIM_PROCEEDS_WAIT_TIME)
    );
    const currentTimestamp = selectCurrentTimestamp(state);
    const timeHasPassed = createBigNumber(currentTimestamp).minus(endTimestamp);
    canClaim = timeHasPassed.toNumber() > 0;
  }

  const filledOrders = selectFilledOrders(
    state.marketTradingHistory[ownProps.marketId],
    state.loginAccount.address,
    state.outcomesData[ownProps.marketId],
    state.marketsData[ownProps.marketId]
  );

  return {
    hasClaimableReturns: market.outstandingReturns && canClaim,
    winningOutcome: market.consensus && market.consensus.winningOutcome,
    numCompleteSets:
      (market.myPositionsSummary &&
        market.myPositionsSummary.numCompleteSets) ||
      undefined,
    transactionsStatus: state.transactionsStatus,
    isMobile: state.appStatus.isMobile,
    outcomes: market.outcomes || [],
    positions,
    openOrders,
    orphanedOrders: filteredOrphanOrders,
    market,
    filledOrders
  };
};

const mapDispatchToProps = dispatch => ({
  sellCompleteSets: (marketId, numCompleteSets, cb) =>
    dispatch(sellCompleteSets(marketId, numCompleteSets, cb)),
  cancelOrphanedOrder: (order, cb) => dispatch(cancelOrphanedOrder(order, cb)),
  claimTradingProceeds: (marketId, cb) =>
    dispatch(updateModal({ type: MODAL_CLAIM_TRADING_PROCEEDS, marketId, cb })),
  cancelAllOpenOrders: (orders, cb) => dispatch(cancelAllOpenOrders(orders, cb))
});

const MarketOrdersPositionsTableContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketOrdersPositionsTable)
);

export default MarketOrdersPositionsTableContainer;
