import { describe, it } from 'mocha'
import { assert } from 'chai'
import sinon from 'sinon'
import marketsDataReducer, { __RewireAPI__ } from 'modules/markets/reducers/markets-data'

import { UPDATE_MARKETS_DATA, CLEAR_MARKETS_DATA, UPDATE_MARKET_CATEGORY, UPDATE_MARKET_REP_BALANCE, UPDATE_MARKET_FROZEN_SHARES_VALUE, UPDATE_MARKET_ESCAPE_HATCH_GAS_COST, UPDATE_MARKET_TRADING_ESCAPE_HATCH_GAS_COST } from 'modules/markets/actions/update-markets-data'
import { RESET_STATE } from 'modules/app/actions/reset-state'

describe(`modules/markets/actions/update-markets-data.js`, () => {
  const test = t => it(t.description, () => t.assertions())

  describe('default', () => {
    const stubbedProcessMarketsData = sinon.stub().returns({})
    __RewireAPI__.__Rewire__('processMarketsData', stubbedProcessMarketsData)

    after(() => {
      __RewireAPI__.__ResetDependency__('processMarketsData')
    })

    test({
      description: 'should return existing state when case is default',
      assertions: () => {
        const actual = marketsDataReducer({ test: 'state' }, {})

        const expected = {
          test: 'state',
        }

        assert.deepEqual(actual, expected, `didn't return the expected value`)
      },
    })

    test({
      description: 'should return DEFAULT_STATE when case is RESET_STATE',
      assertions: () => {
        const actual = marketsDataReducer({ test: 'state' }, { type: RESET_STATE })

        const expected = {}

        assert.deepEqual(actual, expected, `didn't return the expected value`)
      },
    })

    test({
      description: 'should return DEFAULT_STATE when case is CLEAR_MARKETS_DATA',
      assertions: () => {
        const actual = marketsDataReducer({ test: 'state' }, { type: CLEAR_MARKETS_DATA })

        const expected = {}

        assert.deepEqual(actual, expected, `didn't return the expected value`)
      },
    })
  })

  describe('processMarketsData', () => {
    test({
      description: `should return an updated marketsData object`,
      assertions: () => {
        const processMarketsData = __RewireAPI__.__get__('processMarketsData')

        const actual = processMarketsData({
          '0xMarket1': {
            foo: 'one',
            bar: 'two',
          },
          '0xMarket2': {
            foo: 'one',
            bar: 'two',
          },
        }, {
          '0xMarket2': {
            foo: 'one',
            bar: 'two-too',
          },
        })

        const expected = {
          '0xMarket1': {
            foo: 'one',
            bar: 'two',
          },
          '0xMarket2': {
            foo: 'one',
            bar: 'two',
          },
        }

        assert.deepEqual(actual, expected, `didn't return the expected value`)
      }
    })
  })

  // it(`should dispatch an UPDATE_MARKETS_DATA action`, () => {
  //   const marketsOutcomesData = {
  //     someData: 'something',
  //     moreData: 'even more!',
  //   }
  //   const expectedOutput = {
  //     type: action.UPDATE_MARKETS_DATA,
  //     marketsData: { ...marketsOutcomesData },
  //   }
  //   assert.deepEqual(action.updateMarketsData(marketsOutcomesData), expectedOutput, `Update Markets Data action misfired.`)
  // })
  // it(`should dispatch an UPDATE_MARKET_CATEGORY action`, () => {
  //   assert.deepEqual(action.updateMarketCategory('0xa1', 'potent potables'), {
  //     type: action.UPDATE_MARKET_CATEGORY,
  //     marketId: '0xa1',
  //     category: 'potent potables',
  //   })
  // })
  // it(`should dispatch an UPDATE_MARKETS_LOADING_STATUS action`, () => {
  //   assert.deepEqual(action.updateMarketsLoadingStatus(['0xa1', '0xa2'], true), {
  //     type: action.UPDATE_MARKETS_LOADING_STATUS,
  //     marketIds: ['0xa1', '0xa2'],
  //     isLoading: true,
  //   })
  // })
})
