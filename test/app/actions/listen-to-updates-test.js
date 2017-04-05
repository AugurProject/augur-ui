import { describe, it, beforeEach } from 'mocha';
import { assert } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testState from 'test/testState';

describe(`modules/app/actions/listen-to-updates.js`, () => {
  proxyquire.noPreserveCache().noCallThru();

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const state = Object.assign({}, testState);
  const store = mockStore(state);
  const AugurJS = {
    augur: {
      filters: {
        listen: () => {}
      },
      CompositeGetters: {
        getPositionInMarket: sinon.stub.yields(['0x0', '0x1'])
      }
    },
    abi: {
      number: sinon.stub().returns([0, 1]),
      bignum: () => {}
    }
  };
  // sinon.stub(AugurJS.augur.CompositeGetters, 'getPositionInMarket', (market, trader, cb) => {
  //   cb(['0x0', '0x1']);
  // });

  const SyncBlockchain = {
    syncBlockchain: sinon.stub().returns({ type: 'SYNC_BLOCKCHAIN' })
  };

  const SyncBranch = {
    syncBranch: sinon.stub().returns({ type: 'SYNC_BRANCH' })
  };

  const UpdateBranch = {
    updateBranch: sinon.stub().returns({ type: 'UPDATE_BRANCH' })
  };

  const UpdateAssets = {
    updateAssets: sinon.stub().returns({ type: 'UPDATE_ASSETS' })
  };

  const OutcomePrice = {
    updateOutcomePrice: sinon.stub().returns({ type: 'UPDATE_OUTCOME_PRICE' })
  };

  const LoadMarketsInfo = {
    loadMarketsInfo: () => {}
  };
  sinon.stub(LoadMarketsInfo, 'loadMarketsInfo', marketID => ({
    type: 'LOAD_BASIC_MARKET',
    marketID
  }));

  const UpdateMarketOrderBook = {
    addOrder: sinon.stub().returns({ type: 'ADD_ORDER' }),
    fillOrder: sinon.stub().returns({ type: 'FILL_ORDER' }),
    removeOrder: sinon.stub().returns({ type: 'REMOVE_ORDER' })
  };

  const UpdateTopics = {
    updateMarketTopicPopularity: sinon.stub().returns({ type: 'UPDATE_MARKET_TOPIC_POPULARITY' })
  };

  const ConverLogsToTransactions = {
    convertLogsToTransactions: sinon.stub().returns({ type: 'CONVERT_LOGS_TO_TRANSACTIONS' })
  };

  // sinon.stub(AugurJS.augur.filters, 'listen', (cb) => {
  //   cb.block('blockhash');
  //   cb.log_fill_tx({
  //     market: 'testMarketID',
  //     outcome: 'testOutcome',
  //     price: 123.44250502560001,
  //     amount: '2'
  //   });
  //   cb.log_add_tx({ market: 'testMarketID' });
  //   cb.log_cancel({ market: 'testMarketID' });
  //   cb.marketCreated({ marketID: 'testID1', topic: 'topical' });
  //   cb.tradingFeeUpdated({ marketID: 'testID1' });
  // });


  const action = proxyquire('../../../src/modules/app/actions/listen-to-updates.js', {
    '../../../services/augurjs': AugurJS,
    '../../branch/actions/sync-branch': SyncBranch,
    '../../branch/actions/update-branch': UpdateBranch,
    './sync-blockchain': SyncBlockchain,
    '../../auth/actions/update-assets': UpdateAssets,
    '../../markets/actions/update-outcome-price': OutcomePrice,
    '../../markets/actions/load-markets-info': LoadMarketsInfo,
    '../../bids-asks/actions/update-market-order-book': UpdateMarketOrderBook,
    '../../topics/actions/update-topics': UpdateTopics,
    '../../transactions/actions/convert-logs-to-transactions': ConverLogsToTransactions
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    AugurJS.augur.filters.listen.restore();
  });

  const test = (t) => {
    it(t.description, () => {
      t.assertions(store);
    });
  };

  test({
    description: 'should dispatch expected actions from block callback',
    assertions: (store) => {
      sinon.stub(AugurJS.augur.filters, 'listen', (cb) => {
        cb.block('blockhash');
      });

      store.dispatch(action.listenToUpdates());

      const expected = [
        {
          type: 'SYNC_BLOCKCHAIN'
        },
        {
          type: 'UPDATE_ASSETS'
        },
        {
          type: 'SYNC_BRANCH'
        }
      ];

      assert.deepEqual(store.getActions(), expected, `Didn't return the expected actions`);
    }
  });

  test({
    description: `should NOT dispatch actions from collectedFees callback if sender IS NOT logged user`,
    assertions: (store) => {
      sinon.stub(AugurJS.augur.filters, 'listen', (cb) => {
        cb.collectedFees({
          sender: '0xNOTUSER'
        });
      });

      store.dispatch(action.listenToUpdates());

      const expected = [];

      assert.deepEqual(store.getActions(), expected, `Didn't return the expected actions`);
    }
  });

  test({
    description: `should dispatch actions from collectedFees callback if sender IS logged user`,
    assertions: (store) => {
      sinon.stub(AugurJS.augur.filters, 'listen', (cb) => {
        cb.collectedFees({
          sender: '0x0000000000000000000000000000000000000001'
        });
      });

      store.dispatch(action.listenToUpdates());

      const expected = [
        {
          type: 'UPDATE_ASSETS'
        },
        {
          type: 'CONVERT_LOGS_TO_TRANSACTIONS'
        }
      ];

      assert.deepEqual(store.getActions(), expected, `Didn't return the expected actions`);
    }
  });

  test({
    description: `should NOT dispatch actions from payout callback if sender IS NOT logged user`,
    assertions: () => {
      sinon.stub(AugurJS.augur.filters, 'listen', (cb) => {
        cb.payout({
          sender: '0xNOTUSER'
        });
      });

      store.dispatch(action.listenToUpdates());

      const expected = [];

      assert.deepEqual(store.getActions(), expected, `Didn't return the expected actions`);
    }
  });

  test({
    description: `should dispatch actions from payout callback if sender IS logged user`,
    assertions: (store) => {
      sinon.stub(AugurJS.augur.filters, 'listen', (cb) => {
        cb.payout({
          sender: '0x0000000000000000000000000000000000000001'
        });
      });

      store.dispatch(action.listenToUpdates());

      const expected = [
        {
          type: 'UPDATE_ASSETS'
        },
        {
          type: 'CONVERT_LOGS_TO_TRANSACTIONS'
        }
      ];

      assert.deepEqual(store.getActions(), expected, `Didn't return the expected actions`);
    }
  });
});

// store.dispatch(action.listenToUpdates());
// const out = [{
//   type: 'SYNC_BLOCKCHAIN'
// }, {
//   type: 'UPDATE_ASSETS'
// }, {
//   type: 'SYNC_BRANCH'
// }, {
//   type: 'UPDATE_OUTCOME_PRICE'
// }, {
//   type: 'UPDATE_MARKET_TOPIC_POPULARITY'
// }, {
//   type: 'FILL_ORDER',
// }, {
//   type: 'LOAD_BASIC_MARKET',
//   marketID: [
//     'testID1'
//   ]
// }, {
//   type: 'LOAD_BASIC_MARKET',
//   marketID: [
//     'testID1'
//   ]
// }, {
//   type: 'UPDATE_ASSETS'
// }];
// assert.deepEqual(store.getActions(), out, `Didn't dispatch the expected action objects`);
