import { describe, it } from 'mocha'
import { assert } from 'chai'
import { translateBinaryOrders } from '../../../src/modules/bids-asks/actions/translate-binary-orders'

describe(`modules/bids-asks/actions/translate-binary-orders.js`, () => {
  const test = t => it(t.description, (done) => {
    t.assertions(t.data, translateBinaryOrders(t.marketIds, t.data))
    done()
  })
  test({
    description: 'empty orders',
    marketIds: [],
    data: {},
    assertions: (data, value) => {
      assert.deepEqual(value, data)
    }
  })
  test({
    description: 'null orders',
    marketIds: [],
    data: null,
    assertions: (data, value) => {
      assert.deepEqual(value, data)
    }
  })
  test({
    description: 'undefined orders',
    marketIds: [],
    data: undefined,
    assertions: (data, value) => {
      assert.deepEqual(value, data)
    }
  })
  test({
    description: 'only outcome 1 binary market orders',
    marketIds: ['marketID', 'marketID2'],
    data: {
      marketID:
        {
          1: {
            buy: {
              orderId1: { name: 'value' }
            },
            sell: {
              orderId2: { name: 'value' }
            }
          }
        },
      marketID2:
        {
          1: {
            buy: {
              orderId1: { name: 'value' }
            },
            sell: {
              orderId2: { name: 'value' }
            }
          }
        }
    },
    assertions: (data, value) => {
      assert.deepEqual(value, data)
    }
  })

  test({
    description: 'simple outcome 0 binary market orders',
    marketIds: ['marketID'],
    data: {
      marketID:
        {
          0: {
            buy: {
              orderId1: { name: 'value' }
            },
            sell: {
              orderId2: { name: 'value' }
            }
          }
        },
    },
    assertions: (data, value) => {
      const translated = {
        marketID:
        {
          1: {
            sell: {
              orderId1: { name: 'value' }
            },
            buy: {
              orderId2: { name: 'value' }
            }
          }
        },
      }
      assert.deepEqual(value, translated)
    }
  })
  test({
    description: 'simple outcome 0 not included binary market orders',
    marketIds: ['marketID12222'],
    data: {
      marketID:
        {
          0: {
            buy: {
              orderId1: { name: 'value' }
            },
            sell: {
              orderId2: { name: 'value' }
            }
          }
        },
    },
    assertions: (data, value) => {
      assert.deepEqual(value, data)
    }
  })
  test({
    description: 'full populated mixed multiple markets multiple outcomes binary market orders',
    marketIds: ['marketID', 'marketID1'],
    data: {
      marketID:
        {
          0: {
            sell: {
              orderId1: { name: 'value' }
            },
            buy: {
              orderId2: { name: 'value' }
            }
          },
          1: {
            sell: {
              orderId3: { name: 'value' }
            },
            buy: {
              orderId4: { name: 'value' }
            }
          }
        },
      marketID1:
        {
          0: {
            sell: {
              orderId1: { name: 'value' }
            },
            buy: {
              orderId2: { name: 'value' }
            }
          },
          1: {
            sell: {
              orderId11: { name: 'value' }
            },
            buy: {
              orderId21: { name: 'value' }
            }
          }
        },
    },
    assertions: (data, value) => {
      const transformed = {
        marketID:
        {
          1: {
            sell: {
              orderId3: { name: 'value' },
              orderId2: { name: 'value' }
            },
            buy: {
              orderId4: { name: 'value' },
              orderId1: { name: 'value' }
            }
          }
        },
        marketID1:
        {
          1: {
            sell: {
              orderId11: { name: 'value' },
              orderId2: { name: 'value' }
            },
            buy: {
              orderId21: { name: 'value' },
              orderId1: { name: 'value' }
            }
          }
        },
      }

      assert.deepEqual(value, transformed)
    }
  })

  test({
    description: 'full populated mixed multiple one market not included outcomes binary market orders',
    marketIds: ['marketID'],
    data: {
      marketID:
        {
          0: {
            sell: {
              orderId1: { name: 'value' }
            },
            buy: {
              orderId2: { name: 'value' }
            }
          },
          1: {
            sell: {
              orderId3: { name: 'value' }
            },
            buy: {
              orderId4: { name: 'value' }
            }
          }
        },
      marketID1:
        {
          0: {
            sell: {
              orderId1: { name: 'value' }
            },
            buy: {
              orderId2: { name: 'value' }
            }
          },
          1: {
            sell: {
              orderId11: { name: 'value' }
            },
            buy: {
              orderId21: { name: 'value' }
            }
          }
        },
    },
    assertions: (data, value) => {
      const transformed = {
        marketID:
        {
          1: {
            sell: {
              orderId3: { name: 'value' },
              orderId2: { name: 'value' }
            },
            buy: {
              orderId4: { name: 'value' },
              orderId1: { name: 'value' }
            }
          }
        },
        marketID1:
        {
          0: {
            sell: {
              orderId1: { name: 'value' }
            },
            buy: {
              orderId2: { name: 'value' }
            }
          },
          1: {
            sell: {
              orderId11: { name: 'value' }
            },
            buy: {
              orderId21: { name: 'value' }
            }
          }
        },
      }

      assert.deepEqual(value, transformed)
    }
  })
})
