import { createBigNumber } from "utils/create-big-number";
import { BUY, SELL, BOUGHT, SOLD } from "modules/common-elements/constants";
import { formatEther, formatShares } from "utils/format-number";
import { convertUnixToFormattedDate } from "utils/format-date";

function findOrders(
  filledOrders,
  accountId,
  marketType,
  outcomesData,
  openOrders
) {
  const orders = filledOrders.reduce(
    (
      order,
      {
        creator,
        orderId,
        outcome,
        amount,
        price,
        type,
        timestamp,
        transactionHash
      }
    ) => {
      const foundOrder = order.find(({ id }) => id === orderId);
      const amountBN = createBigNumber(amount);
      const priceBN = createBigNumber(price);
      let typeOp = type;

      const outcomeName =
        outcomesData[outcome].name || outcomesData[outcome].name;

      if (accountId === creator && !foundOrder) {
        typeOp = type === BUY ? SELL : BUY; // marketTradingHistory is from filler perspective
      }

      typeOp = type === BUY ? BOUGHT : SOLD;
      const timestampFormatted = convertUnixToFormattedDate(timestamp);

      if (foundOrder) {
        foundOrder.trades.push({
          outcome: outcomeName,
          amount: formatShares(amountBN),
          price: formatEther(priceBN),
          type: typeOp,
          timestamp: timestampFormatted,
          transactionHash
        });
        // amount has been format-number'ed
        foundOrder.amount = createBigNumber(foundOrder.amount).plus(amountBN);
        foundOrder.trades.sort((a, b) => b.timestamp - a.timestamp);
        foundOrder.timestamp = foundOrder.trades[0].timestamp;
      } else {
        order.push({
          id: orderId,
          timestamp: timestampFormatted,
          outcome: outcomeName,
          type: typeOp,
          price: priceBN,
          amount: amountBN,
          trades: [
            {
              outcome: outcomeName,
              amount: amountBN,
              price: priceBN,
              type: typeOp,
              timestamp: timestampFormatted,
              transactionHash
            }
          ]
        });
      }
      return order;
    },
    []
  );

  return orders;
}
export function selectFilledOrders(
  marketTradeHistory,
  accountId,
  marketType,
  outcomesData,
  openOrders
) {
  if (!marketTradeHistory || marketTradeHistory.length < 1) {
    return [];
  }

  const filledOrders = marketTradeHistory.filter(
    trade => trade.creator === accountId || trade.filler === accountId
  );

  const orders = findOrders(
    filledOrders,
    accountId,
    marketType,
    outcomesData,
    openOrders
  );
  orders.sort((a, b) => b.timestamp - a.timestamp);
  return orders;
}
