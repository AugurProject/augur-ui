import { describe, it } from 'mocha'
import { assert } from 'chai'

import { formatShares, formatEtherTokens } from 'utils/format-number'

describe(`modules/bids-asks/helpers/select-order-book.js`, () => {
  const { selectAggregateOrderBook } = require('../../../src/modules/bids-asks/helpers/select-order-book')

  it(`should return empty order book for no orders`, () => {
    const orderBook = selectAggregateOrderBook('1', null, {})

    assert.isArray(orderBook.bids)
    assert.isArray(orderBook.asks)
    assert.lengthOf(orderBook.bids, 0)
    assert.lengthOf(orderBook.asks, 0)
  })

  it(`should return aggregate sorted orders for specified outcome`, () => {
    const orderBook = selectAggregateOrderBook('1', {
      1: {
        buy: {
          order2: { fullPrecisionAmount: '4', fullPrecisionPrice: '0.2', outcome: '1' },
          order3: { fullPrecisionAmount: '6', fullPrecisionPrice: '0.2', outcome: '1' },
          order4: { fullPrecisionAmount: '2', fullPrecisionPrice: '0.1', outcome: '1' },
          order6: { fullPrecisionAmount: '10', fullPrecisionPrice: '0.4', outcome: '1' },
          order8: { fullPrecisionAmount: '14', fullPrecisionPrice: '0.1', outcome: '1' }
        },
        sell: {
          order10: { fullPrecisionAmount: '6', fullPrecisionPrice: '0.7', outcome: '1' },
          order20: { fullPrecisionAmount: '4', fullPrecisionPrice: '0.7', outcome: '1' },
          order30: { fullPrecisionAmount: '2', fullPrecisionPrice: '0.8', outcome: '1' },
          order60: { fullPrecisionAmount: '10', fullPrecisionPrice: '0.6', outcome: '1' },
          order80: { fullPrecisionAmount: '13', fullPrecisionPrice: '0.6', outcome: '1' },
          order90: { fullPrecisionAmount: '14', fullPrecisionPrice: '0.5', outcome: '1' }
        }
      }
    }, {})

    assert.lengthOf(orderBook.bids, 3)
    assert.lengthOf(orderBook.asks, 4)

    assert.deepEqual(orderBook.bids[0], { price: formatEtherTokens(0.4), shares: formatShares(10), isOfCurrentUser: false }, 'first bid')
    assert.deepEqual(orderBook.bids[1], { price: formatEtherTokens(0.2), shares: formatShares(10), isOfCurrentUser: false }, 'second bid')
    assert.deepEqual(orderBook.bids[2], { price: formatEtherTokens(0.1), shares: formatShares(16), isOfCurrentUser: false }, 'third bid')

    assert.deepEqual(orderBook.asks[0], { price: formatEtherTokens(0.5), shares: formatShares(14), isOfCurrentUser: false }, 'first ask')
    assert.deepEqual(orderBook.asks[1], { price: formatEtherTokens(0.6), shares: formatShares(23), isOfCurrentUser: false }, 'second ask')
    assert.deepEqual(orderBook.asks[2], { price: formatEtherTokens(0.7), shares: formatShares(10), isOfCurrentUser: false }, 'third ask')
    assert.deepEqual(orderBook.asks[3], { price: formatEtherTokens(0.8), shares: formatShares(2), isOfCurrentUser: false }, 'fourth ask')
  })
})
