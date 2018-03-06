import { describe, it } from 'mocha'
// import { assert } from 'chai'
// import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { __RewireAPI__ } from 'modules/reporting/selectors/select-awaiting-dispute-markets'
// import proxyquire from 'proxyquire'

// TODO --
// Test defualt
// Mock selector
// Mock markets-all selector
// test result func under conditions

describe(`modules/reports/selectors/select-awaiting-dispute-markets.js`, () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  __RewireAPI__.__Rewire__('selectAllMarkets', () => {})

  const test = t => it(t.description, (done) => {
    const store = mockStore(t.state || {})

    t.assertions(store, done)
  })

  test({
    description: 'should call `selectMarketsAwaitingDispute` from the default function',
    store: {},
    assertions: (store, done) => {
      console.log('fak')
      // __RewireAPI__.__Rewire__('selectMarketsAwaitingDispute', sinon.stub())
      // __RewireAPI__.__Rewire__('selectMarkets', () => {})


      done()
    },
  })
})

//   describe('default', () => {
//     it(`should not get any markets`, () => {
//       const mockMarketsAll = {
//         selectMarkets: () => ([]),
//       }
//       const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
//         '../../markets/selectors/markets-all': mockMarketsAll,
//       })
//
//       const actual = selector.selectMarketsAwaitingDispute()
//       assert.deepEqual(actual, [], `Didn't call the expected method`)
//     })
//   })
// })
//
// describe('selectMarketsAwaitingDispute', () => {
//   it(`should return zero elements array`, () => {
//     const mockMarketsAll = {
//       selectMarkets: () => (
//         [
//           {
//             id: '0xMARKETID1',
//             reportingState: 'PRE_REPORTING',
//           },
//           {
//             id: '0xMARKETID2',
//             reportingState: 'FINALIZED',
//           },
//           {
//             id: '0xMARKETID3',
//             reportingState: 'PRE_REPORTING',
//           },
//         ]
//       ),
//     }
//     const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
//       '../../markets/selectors/markets-all': mockMarketsAll,
//     })
//
//     const actual = selector.selectMarketsAwaitingDispute()
//     assert.deepEqual(actual, [], `Didn't return the expected array`)
//   })
// })
//
// describe('selectMarketsAwaitingDispute', () => {
//   it(`should return one element expected array`, () => {
//     const mockMarketsAll = {
//       selectMarkets: () => (
//         [
//           {
//             id: '0xMARKETID1',
//             reportingState: 'PRE_REPORTING',
//           },
//           {
//             id: '0xMARKETID2',
//             reportingState: 'FINALIZED',
//           },
//           {
//             id: '0xMARKETID3',
//             reportingState: 'AWAITING_NEXT_WINDOW',
//           },
//         ]
//       ),
//     }
//
//     const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
//       '../../markets/selectors/markets-all': mockMarketsAll,
//     })
//
//     const actual = selector.selectMarketsAwaitingDispute()
//
//     const expected = [
//       {
//         id: '0xMARKETID3',
//         reportingState: 'AWAITING_NEXT_WINDOW',
//       },
//     ]
//
//     assert.deepEqual(actual, expected, `Didn't return the expected array`)
//   })
// })


// describe(`modules/reports/selectors/select-awaiting-dispute-markets.js`, () => {
//   proxyquire.noPreserveCache().noCallThru()
//
//   describe('default', () => {
//     it(`should not get any markets`, () => {
//       const mockMarketsAll = {
//         selectMarkets: () => ([]),
//       }
//       const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
//         '../../markets/selectors/markets-all': mockMarketsAll,
//       })
//
//       const actual = selector.selectMarketsAwaitingDispute()
//       assert.deepEqual(actual, [], `Didn't call the expected method`)
//     })
//   })
// })
//
// describe('selectMarketsAwaitingDispute', () => {
//   it(`should return zero elements array`, () => {
//     const mockMarketsAll = {
//       selectMarkets: () => (
//         [
//           {
//             id: '0xMARKETID1',
//             reportingState: 'PRE_REPORTING',
//           },
//           {
//             id: '0xMARKETID2',
//             reportingState: 'FINALIZED',
//           },
//           {
//             id: '0xMARKETID3',
//             reportingState: 'PRE_REPORTING',
//           },
//         ]
//       ),
//     }
//     const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
//       '../../markets/selectors/markets-all': mockMarketsAll,
//     })
//
//     const actual = selector.selectMarketsAwaitingDispute()
//     assert.deepEqual(actual, [], `Didn't return the expected array`)
//   })
// })
//
// describe('selectMarketsAwaitingDispute', () => {
//   it(`should return one element expected array`, () => {
//     const mockMarketsAll = {
//       selectMarkets: () => (
//         [
//           {
//             id: '0xMARKETID1',
//             reportingState: 'PRE_REPORTING',
//           },
//           {
//             id: '0xMARKETID2',
//             reportingState: 'FINALIZED',
//           },
//           {
//             id: '0xMARKETID3',
//             reportingState: 'AWAITING_NEXT_WINDOW',
//           },
//         ]
//       ),
//     }
//
//     const selector = proxyquire('../../../src/modules/reporting/selectors/select-awaiting-dispute-markets.js', {
//       '../../markets/selectors/markets-all': mockMarketsAll,
//     })
//
//     const actual = selector.selectMarketsAwaitingDispute()
//
//     const expected = [
//       {
//         id: '0xMARKETID3',
//         reportingState: 'AWAITING_NEXT_WINDOW',
//       },
//     ]
//
//     assert.deepEqual(actual, expected, `Didn't return the expected array`)
//   })
// })
