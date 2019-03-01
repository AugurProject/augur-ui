import { createSelector } from "reselect";
import { selectMarkets } from "src/modules/markets/selectors/markets-all";
import { selectLoginAccountAddress } from "src/select-state";
import { MARKET_CLOSED } from "src/modules/common-elements/constants";
import { constants } from "services/constants";

// Get all the users CLOSED markets with OPEN ORDERS
export const selectResolvedMarketsOpenOrders = createSelector(
  selectMarkets,
  markets => {
    if (markets.length > 0) {
      return markets
        .filter(market => market.marketStatus === MARKET_CLOSED)
        .filter(market => market.userOpenOrders.length > 0);
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
        .filter(market => market.designatedReporter === address);
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
        );
    }
    return [];
  }
);
