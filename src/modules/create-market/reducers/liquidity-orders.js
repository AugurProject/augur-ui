import {
  UPDATE_LIQUIDITY_ORDER,
  ADD_MARKET_LIQUIDITY_ORDERS,
  REMOVE_LIQUIDITY_ORDER,
  LOAD_PENDING_LIQUIDITY_ORDERS,
} from 'modules/create-market/actions/liquidity-management'

const DEFAULT_STATE = () => ({})

/*
Example:
{
  <marketId>: {
    <outcomeId>: [{ quantity, price, type, estCost }, ...],
    ...
  },
  ...
}
*/

export default function (pendingLiquidityOrders = DEFAULT_STATE(), action) {
  const { type, data } = action
  switch (type) {
    case LOAD_PENDING_LIQUIDITY_ORDERS:
      return ({
        ...data,
      })
    case ADD_MARKET_LIQUIDITY_ORDERS: {
      const marketOutcomes = Object.keys(data.liquidityOrders)
      const updatedOrderBook = marketOutcomes.reduce((acc, outcome) => {
        acc[outcome] = data.liquidityOrders[outcome].map((order, index, array) => ({
          ...array[index],
          index,
        }))
        return acc
      }, {})
      return ({
        ...pendingLiquidityOrders,
        [data.marketId]: updatedOrderBook,
      })
    }
    case UPDATE_LIQUIDITY_ORDER: {
      const updatedOrder = {
        ...data.order,
        ...data.updates,
      }
      console.log('Updating:', Object.assign({}, { ...pendingLiquidityOrders }), data, updatedOrder);
      const updatedOutcomeArray = pendingLiquidityOrders[data.marketId][data.outcomeId].map((outcomeOrder) => {
        if (outcomeOrder.index !== updatedOrder.index) return outcomeOrder
        return updatedOrder
      })
      pendingLiquidityOrders[data.marketId][data.outcomeId] = updatedOutcomeArray
      console.log('Updating - returning...:', Object.assign({}, { ...pendingLiquidityOrders }));
      return ({ ...pendingLiquidityOrders })
    }
    case REMOVE_LIQUIDITY_ORDER: {
      const marketOutcomes = Object.keys(pendingLiquidityOrders[data.marketId])
      // if removing this order will clear the order array, delete the outcome/market if no other outcomes
      console.log(
        'remove',
        data,
        Object.assign({}, pendingLiquidityOrders),
      );

      if (pendingLiquidityOrders[data.marketId][data.outcomeId].length === 1) {
        if (marketOutcomes.length === 1 && marketOutcomes.includes(data.outcomeId.toString())) {
          // remove market completely as this is the last outcome and it's about to be empty
          delete pendingLiquidityOrders[data.marketId]
          console.log('IsLastOfOutcome, IsLastOfMarket', Object.assign({}, pendingLiquidityOrders));
          return ({ ...pendingLiquidityOrders })
        }
        // just remove the outcome
        delete pendingLiquidityOrders[data.marketId][data.outcomeId]
        console.log('IsLastOfOutcome', Object.assign({}, pendingLiquidityOrders));
        return ({ ...pendingLiquidityOrders })
      }
      // just remove a single order
      const updatedOutcomeOrders = pendingLiquidityOrders[data.marketId][data.outcomeId].reduce((acc, order) => {
        console.log('in reducer for removal...', acc, order, data.orderId);
        if (order.index === data.orderId) return acc
        acc.push(order)
        return acc
      }, [])
      pendingLiquidityOrders[data.marketId][data.outcomeId] = updatedOutcomeOrders
      console.log('IsSingleOrder', { ...pendingLiquidityOrders }, updatedOutcomeOrders);
      return ({ ...pendingLiquidityOrders })
    }
    default:
      return pendingLiquidityOrders
  }
}
