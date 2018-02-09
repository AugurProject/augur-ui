import { BUY, SELL } from 'modules/transactions/constants/types'

export const translateBinaryOrders = (binaryMarketIds, orders) => {
  if (!orders || !(orders instanceof Object)) return orders

  Object.keys(orders)
    .forEach((marketId) => {
      if (binaryMarketIds.includes(marketId)) {
        const zeroOrders = orders[marketId][0]
        if (zeroOrders) {
          Object.keys(zeroOrders).forEach((type) => {
            Object.keys(zeroOrders[type]).forEach((orderId) => {
              if (!orders[marketId][1]) {
                orders[marketId][1] = {}
              }
              if (type === BUY) {
                if (!orders[marketId][1][SELL]) {
                  orders[marketId][1][SELL] = {}
                }
                orders[marketId][1][SELL][orderId] = zeroOrders[type][orderId]
              } else {
                if (!orders[marketId][1][BUY]) {
                  orders[marketId][1][BUY] = {}
                }
                orders[marketId][1][BUY][orderId] = zeroOrders[type][orderId]
              }
            })
          })
          delete orders[marketId][0]
        }
      }
    })
  return orders
}
