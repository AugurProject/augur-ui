import { augur } from 'services/augurjs'
import { updateIsFirstOrderBookChunkLoaded } from 'modules/bids-asks/actions/update-order-book'
import insertOrderBookChunkToOrderBook from 'modules/bids-asks/actions/insert-order-book-chunk-to-order-book'
import { BINARY } from 'modules/markets/constants/market-types'
import { translateBinaryOrders } from 'modules/bids-asks/actions/translate-binary-orders'
import logError from 'utils/log-error'

const loadOneOutcomeBidsOrAsks = (marketId, outcome, orderTypeLabel, callback = logError) => (dispatch, getState) => {
  const { marketsData } = getState()
  if (marketId == null || outcome == null || orderTypeLabel == null) {
    return callback(`must specify market ID, outcome, and order type: ${marketId} ${outcome} ${orderTypeLabel}`)
  }
  const market = marketsData[marketId]
  if (!market) return callback(`market ${marketId} data not found`)
  dispatch(updateIsFirstOrderBookChunkLoaded(marketId, outcome, orderTypeLabel, false))
  augur.trading.getOrders({ marketID: marketId, outcome, orderType: orderTypeLabel }, (err, orders) => {
    if (err) return callback(err)
    if (orders != null) {
      let newOrders = orders
      if (marketsData.marketType === BINARY) {
        newOrders = translateBinaryOrders([marketId], orders)
      }
      // TODO verify that orders is the correct shape for insertion
      dispatch(insertOrderBookChunkToOrderBook(marketId, outcome, orderTypeLabel, newOrders))
    }
    callback(null)
  })
}

export default loadOneOutcomeBidsOrAsks
