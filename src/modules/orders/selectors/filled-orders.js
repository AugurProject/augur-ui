import { createBigNumber } from "utils/create-big-number";

export function selectFilledOrders(marketTradeHistory, accountId) {
	if (!marketTradeHistory || marketTradeHistory.length < 1) {
		return [];
	} 

	const filledOrders = marketTradeHistory.filter(
	  trade => trade.creator === accountId
	);
	 // need to group by order id
	 // [
	 // 	{
	 // 		quantity: 1,
	 // 		outcome: name
	 // 		trades: [
	 // 			{trade}
	 // 		]
	 // 	}
	 // ]

	const orders = filledOrders.reduce((order, { orderId, outcome, amount, price, type, timestamp, transactionHash }) => {
	  const foundOrder = order.find(({ id }) => id === orderId);
	  if (foundOrder) {
	  	foundOrder.trades.push({ outcome, amount, price, type, timestamp, transactionHash });
	  	foundOrder.trades.sort((a, b) => b.timestamp - a.timestamp);
	  	foundOrder.timestamp = foundOrder.trades[0].timestamp;
	  	foundOrder.quantity = createBigNumber(foundOrder.quantity).plus(amount).toString(); // need to do bignumber
	  }
	  else order.push({ 
	  	id: orderId, 
	  	timestamp: timestamp,
	  	outcome: outcome,
	  	type: type,
	  	price: price,
	  	quantity: amount,
	  	trades: [{ outcome, amount, price, type, timestamp, transactionHash }] });
	  return order;
	}, []);


	orders.sort((a, b) => b.timestamp - a.timestamp);

	return orders;
}