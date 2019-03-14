import { createSelector } from "reselect";
import { selectMarkets } from "src/modules/markets/selectors/markets-all";
import {
  selectLoginAccountAddress,
  selectReportingWindowStats,
  selectPendingLiquidityOrders,
  selectCurrentTimestamp
} from "src/select-state";

import { createBigNumber } from "utils/create-big-number";
import canClaimProceeds from "utils/can-claim-proceeds";
import { constants } from "services/constants";
import {
  NOTIFICATION_TYPES,
  TYPE_DISPUTE,
  TYPE_VIEW,
  RESOLVED_MARKETS_OPEN_ORDERS_TITLE,
  REPORTING_ENDS_SOON_TITLE,
  FINALIZE_MARKET_TITLE,
  SELL_COMPLETE_SETS_TITLE,
  CLAIM_REPORTING_FEES_TITLE,
  UNSIGNED_ORDERS_TITLE,
  PROCEEDS_TO_CLAIM_TITLE,
  MARKET_CLOSED
} from "modules/common-elements/constants";

// Get all the users CLOSED markets with OPEN ORDERS
export const selectResolvedMarketsOpenOrders = createSelector(
  selectMarkets,
  markets => {
    if (markets.length > 0) {
      return markets
        .filter(market => market.marketStatus === MARKET_CLOSED)
        .filter(market => market.userOpenOrders.length > 0)
        .map(getRequiredMarketData);
    }
    return [];
  }
);

// Get all the users markets that are in DESIGNATED_REPORTING where they are the REPORTER
export const selectReportOnMarkets = createSelector(
  selectMarkets,
  selectLoginAccountAddress,
  (markets, address) => {
    if (markets.length > 0) {
      return markets
        .filter(
          market =>
            market.reportingState ===
            constants.REPORTING_STATE.DESIGNATED_REPORTING
        )
        .filter(market => market.designatedReporter === address)
        .map(getRequiredMarketData);
    }
    return [];
  }
);

// Get all the users markets that are in FINALIZATION
export const selectFinalizeMarkets = createSelector(
  selectMarkets,
  selectLoginAccountAddress,
  (markets, address) => {
    if (markets.length > 0) {
      return markets
        .filter(
          market =>
            market.reportingState ===
            constants.REPORTING_STATE.AWAITING_FINALIZATION
        )
        .filter(
          market => market.userPositions.length > 0 || address === market.author
        )
        .map(getRequiredMarketData);
    }
    return [];
  }
);

// Get all the users markets where the user has COMPLETE SETS of SHARES
export const selectCompleteSetPositions = createSelector(
  selectMarkets,
  markets => {
    if (markets.length > 0) {
      return markets
        .filter(market => {
          const numCompleteSets =
            (market.myPositionsSummary &&
              market.myPositionsSummary.numCompleteSets) ||
            undefined;
          return numCompleteSets && numCompleteSets.value > 0;
        })
        .map(getRequiredMarketData);
    }
    return [];
  }
);

// Get all markets in dispute, for market creators and user with positions in disputed markets
export const selectMarketsInDispute = createSelector(
  selectMarkets,
  selectLoginAccountAddress,
  (markets, address) => {
    if (markets.length > 0) {
      return markets
        .filter(
          market =>
            market.reportingState ===
            constants.REPORTING_STATE.CROWDSOURCING_DISPUTE
        )
        .filter(
          market =>
            market.userPositions.length > 0 ||
            market.designatedReporter === address
        )
        .map(getRequiredMarketData);
    }
    return [];
  }
);

// Get all markets where the user has outstanding returns
export const selectProceedsToClaim = createSelector(
  selectMarkets,
  selectCurrentTimestamp,
  (markets, currentTimestamp) => {
    if (markets.length > 0 && currentTimestamp) {
      return markets
        .filter(
          market =>
            market.reportingState === constants.REPORTING_STATE.FINALIZED
        )
        .filter(market => market.outstandingReturns)
        .filter(market =>
          canClaimProceeds(
            market.finalizationTime,
            market.outstandingReturns,
            currentTimestamp
          )
        )
        .map(getRequiredMarketData);
    }
    return [];
  }
);

// Get reportingFees for signed in user
export const selectUsersReportingFees = createSelector(
  selectReportingWindowStats,
  reportingWindowStats => {
    if (reportingWindowStats && reportingWindowStats.reportingFees) {
      const { unclaimedEth, unclaimedRep } = reportingWindowStats.reportingFees;
      if (
        (unclaimedEth && unclaimedEth.value > 0) ||
        (unclaimedRep && unclaimedRep.value > 0)
      ) {
        return reportingWindowStats.reportingFees;
      }
    }
    return {};
  }
);

// Get all unsigned orders from localStorage
export const selectUnsignedOrders = createSelector(
  selectPendingLiquidityOrders,
  selectMarkets,
  (pendingLiquidityOrders, markets) => {
    if (pendingLiquidityOrders) {
      return Object.keys(pendingLiquidityOrders)
        .map(id => markets.find(market => market.id === id))
        .filter(notification => notification)
        .map(getRequiredMarketData);
    }
    return [];
  }
);

export const selectNotifications = createSelector(
  selectReportOnMarkets,
  selectResolvedMarketsOpenOrders,
  selectFinalizeMarkets,
  selectCompleteSetPositions,
  selectMarketsInDispute,
  selectUsersReportingFees,
  selectUnsignedOrders,
  selectProceedsToClaim,
  (
    reportOnMarkets,
    resolvedMarketsOpenOrder,
    finalizeMarkets,
    completeSetPositions,
    marketsInDispute,
    claimReportingFees,
    unsignedOrders,
    proceedsToClaim
  ) => {
    const reportOnMarketsNotifications = generateCards(
      reportOnMarkets,
      NOTIFICATION_TYPES.reportOnMarkets
    );
    const resolvedMarketsOpenOrderNotifications = generateCards(
      resolvedMarketsOpenOrder,
      NOTIFICATION_TYPES.resolvedMarketsOpenOrders
    );
    const finalizeMarketsNotifications = generateCards(
      finalizeMarkets,
      NOTIFICATION_TYPES.finalizeMarkets
    );
    const completeSetPositionsNotifications = generateCards(
      completeSetPositions,
      NOTIFICATION_TYPES.completeSetPositions
    );
    const marketsInDisputeNotifications = generateCards(
      marketsInDispute,
      NOTIFICATION_TYPES.marketsInDispute
    );
    const unsignedOrdersNotifications = generateCards(
      unsignedOrders,
      NOTIFICATION_TYPES.unsignedOrders
    );

    let notifications = [
      ...reportOnMarketsNotifications,
      ...resolvedMarketsOpenOrderNotifications,
      ...finalizeMarketsNotifications,
      ...completeSetPositionsNotifications,
      ...marketsInDisputeNotifications,
      ...unsignedOrdersNotifications
    ];

    if (
      claimReportingFees &&
      (claimReportingFees.unclaimedEth && claimReportingFees.unclaimedRep)
    ) {
      notifications = notifications.concat({
        type: NOTIFICATION_TYPES.claimReportingFees,
        isImportant: false,
        isNew: false,
        title: CLAIM_REPORTING_FEES_TITLE,
        buttonLabel: TYPE_VIEW,
        market: null,
        claimReportingFees
      });
    }

    if (proceedsToClaim && proceedsToClaim.length > 0) {
      let totalEth = createBigNumber(0);

      const marketIds = proceedsToClaim.map(market => market.id);
      proceedsToClaim.forEach(market => {
        totalEth = totalEth.plus(
          createBigNumber(Number(market.outstandingReturns || 0))
        );
      });

      if (totalEth.toNumber() > 0 && marketIds.length > 0) {
        notifications = notifications.concat({
          type: NOTIFICATION_TYPES.proceedsToClaim,
          isImportant: false,
          isNew: false,
          title: PROCEEDS_TO_CLAIM_TITLE,
          buttonLabel: TYPE_VIEW,
          market: null,
          marketes: marketIds,
          totalProceeds: totalEth.toNumber()
        });
      }
    }

    return notifications;
  }
);

// Return only market data we require for notifications
const getRequiredMarketData = market => ({
  id: market.id,
  description: market.description,
  endTime: market.endTime,
  reportingState: market.reportingState,
  marketStatus: market.marketStatus,
  disputeInfo: market.disputeInfo || {},
  myPositionsSummary: market.myPositionsSummary || {},
  outstandingReturns: market.outstandingReturns || null
});

// Build notification objects and include market data
const generateCards = (markets, type) => {
  let defaults = {};

  if (type === NOTIFICATION_TYPES.resolvedMarketsOpenOrders) {
    defaults = {
      type,
      isImportant: false,
      isNew: false,
      title: RESOLVED_MARKETS_OPEN_ORDERS_TITLE,
      buttonLabel: TYPE_VIEW
    };
  } else if (type === NOTIFICATION_TYPES.reportOnMarkets) {
    defaults = {
      type,
      isImportant: true,
      isNew: false,
      title: REPORTING_ENDS_SOON_TITLE,
      buttonLabel: TYPE_VIEW
    };
  } else if (type === NOTIFICATION_TYPES.finalizeMarkets) {
    defaults = {
      type,
      isImportant: true,
      isNew: false,
      title: FINALIZE_MARKET_TITLE,
      buttonLabel: TYPE_VIEW
    };
  } else if (type === NOTIFICATION_TYPES.marketsInDispute) {
    defaults = {
      type,
      isImportant: false,
      isNew: false,
      title: TYPE_DISPUTE,
      buttonLabel: TYPE_DISPUTE
    };
  } else if (type === NOTIFICATION_TYPES.completeSetPositions) {
    defaults = {
      type,
      isImportant: false,
      isNew: false,
      title: SELL_COMPLETE_SETS_TITLE,
      buttonLabel: TYPE_VIEW
    };
  } else if (type === NOTIFICATION_TYPES.unsignedOrders) {
    defaults = {
      type,
      isImportant: false,
      isNew: false,
      title: UNSIGNED_ORDERS_TITLE,
      buttonLabel: TYPE_VIEW
    };
  }

  return markets.map(market => ({
    market,
    ...defaults
  }));
};
