export function selectFilledOrders(marketTradeHistory, accountId) {
	if (!marketTradeHistory || marketTradeHistory.length < 1) {
		return [];
	} 

	const filledOrders = marketTradeHistory.filter(
	  trade => trade.creator === accountId
	);
	
	filledOrders.sort((a, b) => b.timestamp - a.timestamp);

	return filledOrders;
}