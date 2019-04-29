export const UPDATE_ORDER_BOOK = "UPDATE_ORDER_BOOK";
export const CLEAR_ORDER_BOOK = "CLEAR_ORDER_BOOK";
export const UPDATE_IS_FIRST_ORDER_BOOK_CHUNK_LOADED =
  "UPDATE_IS_FIRST_ORDER_BOOK_CHUNK_LOADED";

export const updateOrderBook = ({
  marketId,
  outcome,
  orderTypeLabel,
  orderBook
}) => ({
  type: UPDATE_ORDER_BOOK,
  data: {
    marketId,
    outcome,
    orderTypeLabel,
    orderBook
  }
});
