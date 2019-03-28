import { augur } from "services/augurjs";
import logError from "utils/log-error";
import { forEach } from "lodash";
import { ungroupBy } from "utils/ungroupBy";
import { addOrphanedOrder } from "modules/orders/actions/orphaned-orders";
import { updateOrderBook } from "modules/orders/actions/update-order-book";
import { OPEN } from "modules/common-elements/constants";
import { loadMarketsInfoIfNotLoaded } from "modules/markets/actions/load-markets-info";
import { formatEther, formatShares } from "utils/format-number";

export const loadAccountOrders = (options = {}, callback = logError) => (
  dispatch,
  getState
) => {
  dispatch(
    loadUserAccountOrders(options, () => {
      dispatch(loadAccountOrphanedOrders(options, callback));
    })
  );
};

const loadUserAccountOrders = (options = {}, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();
  if (!options.orderState)
    options.orderState = augur.constants.ORDER_STATE.OPEN;
  augur.trading.getOrders(
    { ...options, creator: loginAccount.address, universe: universe.id },
    (err, orders) => {
      if (err) return callback(err);
      if (orders == null || Object.keys(orders).length === 0)
        return callback(null);
      const marketIds = Object.keys(orders);
      dispatch(
        loadMarketsInfoIfNotLoaded(marketIds, err => {
          if (err) return callback(err);
          forEach(marketIds, marketId => {
            forEach(orders[marketId], (outcomeOrder, outcome) => {
              forEach(outcomeOrder, (orderBook, orderTypeLabel) => {
                const openOrders = Object.keys(orderBook).reduce((p, key) => {
                  if (
                    orderBook[key].orderState ===
                    augur.constants.ORDER_STATE.OPEN
                  ) {
                    p[key] = orderBook[key];
                  }
                  return p;
                }, {});
                dispatch(
                  updateOrderBook({
                    marketId,
                    outcome,
                    orderTypeLabel,
                    orderBook: openOrders
                  })
                );
              });
            });
          });
          callback(null, orders);
        })
      );
    }
  );
};

const loadAccountOrphanedOrders = (options = {}, callback = logError) => (
  dispatch,
  getState
) => {
  const { universe, loginAccount } = getState();

  augur.trading.getOrders(
    {
      ...options,
      orphaned: true,
      creator: loginAccount.address,
      universe: universe.id
    },
    (err, orders) => {
      if (err) return callback(err);
      if (orders == null || Object.keys(orders).length === 0)
        return callback(null);

      ungroupBy(orders, ["marketId", "outcome", "orderTypeLabel", "orderId"])
        .filter(it => it.orderState === OPEN)
        .forEach(it =>
          dispatch(
            addOrphanedOrder({
              ...it,
              type: it.orderTypeLabel,
              description: it.description || it.outcomeName,
              sharesEscrowed: formatEther(it.sharesEscrowed),
              tokensEscrowed: formatEther(it.tokensEscrowed),
              avgPrice: formatEther(it.fullPrecisionPrice),
              unmatchedShares: formatShares(it.fullPrecisionAmount)
            })
          )
        );

      const marketIds = Object.keys(orders);
      dispatch(
        loadMarketsInfoIfNotLoaded(marketIds, err => {
          if (err) return callback(err);
          callback(null, orders);
        })
      );
    }
  );
};
