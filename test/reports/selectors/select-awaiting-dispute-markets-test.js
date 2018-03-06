import { describe, it } from 'mocha'
import { assert } from 'chai'
import proxyquire from 'proxyquire'

describe(`modules/reports/selectors/select-awaiting-dispute-markets.js`, () => {
  proxyquire.noPreserveCache().noCallThru()

  describe('default', () => {
    it(`should not get any markets`, () => {
      const mockMarketsAll = {
        selectMarkets: () => ([]),
      }
      const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
        '../../markets/selectors/markets-all': mockMarketsAll,
      })

      const actual = selector.selectMarketsAwaitingDispute()
      assert.deepEqual(actual, [], `Didn't call the expected method`)
    })
  })
})

describe('selectMarketsAwaitingDispute', () => {
  it(`should return zero elements array`, () => {
    const mockMarketsAll = {
      selectMarkets: () => (
        [
          {
            id: '0xMARKETID1',
            reportingState: 'PRE_REPORTING',
          },
          {
            id: '0xMARKETID2',
            reportingState: 'FINALIZED',
          },
          {
            id: '0xMARKETID3',
            reportingState: 'PRE_REPORTING',
          },
        ]
      ),
    }
    const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
      '../../markets/selectors/markets-all': mockMarketsAll,
    })

    const actual = selector.selectMarketsAwaitingDispute()
    assert.deepEqual(actual, [], `Didn't return the expected array`)
  })
})

describe('selectMarketsAwaitingDispute', () => {
  it(`should return one element expected array`, () => {
    const mockMarketsAll = {
      selectMarkets: () => (
        [
          {
            id: '0xMARKETID1',
            reportingState: 'PRE_REPORTING',
          },
          {
            id: '0xMARKETID2',
            reportingState: 'FINALIZED',
          },
          {
            id: '0xMARKETID3',
            reportingState: 'AWAITING_NEXT_WINDOW',
          },
        ]
      ),
    }

    const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
      '../../markets/selectors/markets-all': mockMarketsAll,
    })

    const actual = selector.selectMarketsAwaitingDispute()

    const expected = [
      {
        id: '0xMARKETID3',
        reportingState: 'AWAITING_NEXT_WINDOW',
      },
    ]

    assert.deepEqual(actual, expected, `Didn't return the expected array`)
  })
})
