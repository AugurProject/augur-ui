import { createBigNumber } from "utils/create-big-number";
import { SCALAR } from "modules/markets/constants/market-types";

export function selectFilledOrders(
  marketTradeHistory,
  accountId,
  marketType,
  marketOutcomes
) {
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
      const amountBN = createBigNumber(amount);
      const priceBN = createBigNumber(price);

      const outcomeInfo =
        marketOutcomes &&
        marketOutcomes.find(
          outcomeValue => outcomeValue.id === outcome.toString()
        );

      let outcomeName =
        outcomeInfo && (outcomeInfo.description || outcomeInfo.name);
      if (marketType === SCALAR) {
        outcomeName = null;
      }

      if (foundOrder) {
        foundOrder.trades.push({
          outcome: outcomeName,
          amount: amountBN,
          price: priceBN,
          type,
          timestamp,
          transactionHash
        });
        foundOrder.trades.sort((a, b) => b.timestamp - a.timestamp);
        foundOrder.timestamp = foundOrder.trades[0].timestamp;
        foundOrder.amount = createBigNumber(foundOrder.amount).plus(amountBN);
      } else {
        order.push({
          id: orderId,
          timestamp,
          outcome: outcomeName,
          type,
          price: priceBN,
          amount: amountBN,
          trades: [
            {
              outcome: outcomeName,
              amount: amountBN,
              price: priceBN,
              type,
              timestamp,
              transactionHash
            }
          ]
        });
      }
      return order;
    },
    []
  );

  orders.sort((a, b) => b.timestamp - a.timestamp);

  return orders;
}
