import { createBigNumber } from "utils/create-big-number";

export function selectFilledOrders(marketTradeHistory, accountId) {
  if (!marketTradeHistory || marketTradeHistory.length < 1) {
    return [];
  }

  const filledOrders = marketTradeHistory.filter(
    trade => trade.creator === accountId
  );

  const orders = filledOrders.reduce(
    (
      order,
      { orderId, outcome, amount, price, type, timestamp, transactionHash }
    ) => {
      const foundOrder = order.find(({ id }) => id === orderId);
      amount = createBigNumber(amount)
      price = createBigNumber(price)
      if (foundOrder) {
        foundOrder.trades.push({
          outcome,
          amount,
          price,
          type,
          timestamp,
          transactionHash
        });
        foundOrder.trades.sort((a, b) => b.timestamp - a.timestamp);
        foundOrder.timestamp = foundOrder.trades[0].timestamp;
        foundOrder.amount = createBigNumber(foundOrder.amount).plus(amount);
      } else {
        order.push({
          id: orderId,
          timestamp,
          outcome,
          type,
          price,
          amount,
          trades: [{ outcome, amount, price, type, timestamp, transactionHash }]
        });
      }
      return order;
    },
    []
  );

  orders.sort((a, b) => b.timestamp - a.timestamp);

  return orders;
}
