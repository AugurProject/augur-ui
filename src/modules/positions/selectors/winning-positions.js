import { createBigNumber } from "utils/create-big-number";
import { createSelector } from "reselect";
import store from "src/store";
import selectLoginAccountPositions from "modules/positions/selectors/login-account-positions";
import { ZERO } from "modules/trades/constants/numbers";

export default function() {
  return selectClosedMarketsWithWinningShares(store.getState());
}

export const selectClosedMarketsWithWinningShares = createSelector(
  selectLoginAccountPositions,
  loginAccountPositions => {
    const { markets } = loginAccountPositions;
    const numPositions = markets.length;
    let closedMarketsWithWinningShares = {};
    for (let i = 0; i < numPositions; ++i) {
      const market = markets[i];
      const outstandingReturns = createBigNumber(
        market.outstandingReturns || ZERO
      );
      if (!market.isOpen && outstandingReturns) {
        if (createBigNumber(outstandingReturns).gt(ZERO)) {
          closedMarketsWithWinningShares = {
            id: market.id,
            description: market.description,
            winnings: outstandingReturns
          };
        }
      }
    }
    return closedMarketsWithWinningShares;
  }
);
