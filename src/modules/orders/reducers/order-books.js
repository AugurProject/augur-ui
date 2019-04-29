import { UPDATE_ORDER_BOOK } from "modules/orders/actions/update-order-book";
import { RESET_STATE } from "modules/app/actions/reset-state";

const DEFAULT_STATE = {};
/**
 * @param {Object} orderBooks
 * @param {Object} action
 */
export default function(orderBooks = DEFAULT_STATE, { type, data }) {
  switch (type) {
    case UPDATE_ORDER_BOOK: {
      const { marketId, outcome, orderTypeLabel, orderBook } = data;
      const marketOrderBook = orderBooks[marketId] || {};
      const outcomeOrderBook = marketOrderBook[outcome] || {};
      return {
        ...orderBooks,
        [marketId]: {
          ...marketOrderBook,
          [outcome]: {
            ...outcomeOrderBook,
            [orderTypeLabel]: {
              ...orderBook
            }
          }
        }
      };
    }
    case RESET_STATE:
      return DEFAULT_STATE;
    default:
      return orderBooks;
  }
}
