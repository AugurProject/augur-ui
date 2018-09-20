import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import realStore from "src/store";

import { initAugur, connectAugur } from "modules/app/actions/init-augur";

jest.mock("services/augurjs");
jest.mock("modules/app/actions/update-env");
jest.mock("modules/app/actions/update-connection");
jest.mock("modules/contracts/actions/update-contract-addresses");
jest.mock("modules/contracts/actions/update-contract-api");
jest.mock("modules/transactions/actions/register-transaction-relay");
jest.mock("modules/app/actions/load-universe");
jest.mock("modules/app/actions/verify-matching-network-ids");

jest.mock("config/network.json", () => ({
  test: {
    "augur-node": "ws://127.0.0.1:9001",
    "ethereum-node": {
      http: "http://127.0.0.1:8545",
      ws: "ws://127.0.0.1:8546",
      pollingIntervalMilliseconds: 500,
      blockRetention: 100,
      connectionTimeout: 60000
    },
    "auto-login": true,
    universe: null,
    "bug-bounty": false,
    "bug-bounty-address": null,
    debug: {
      connect: true,
      broadcast: false
    }
  }
}));

describe("modules/app/actions/init-augur.js", () => {
  const ethereumNodeConnectionInfo = {
    http: "http://some.eth.node.com",
    ws: "wss://some.eth.ws.node.com"
  };
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const augurNodeWS = "wss://some.web.socket.com";
  const mockEnv = {
    "augur-node": augurNodeWS,
    "ethereum-node": ethereumNodeConnectionInfo
  };
  const realSetInterval = global.setInterval;
  const store = mockStore({
    ...realStore.getState(),
    env: mockEnv
  });

  beforeAll(() => {
    process.env.ETHEREUM_NETWORK = "test";
  });

  beforeEach(() => {
    global.setInterval = (f, interval) => {
      f();
    };

    store.clearActions();
  });

  afterEach(() => {
    global.setInterval = realSetInterval;
    store.clearActions();
  });

  afterAll(() => {
    delete process.env.ETHEREUM_NETWORK;
  });

  describe("initAugur", () => {
    test("Should InitAugur successfully, with logged in account", done => {
      store.dispatch(
        initAugur({}, {}, (err, connInfo) => {
          expect(err).toBeUndefined();
          expect(connInfo).toBeUndefined();
          done();
        })
      );

      console.log(store.getActions());

      expect(store.getActions()).toEqual([
        { type: "UPDATE_ENV" },
        { type: "UPDATE_CONNECTION_STATUS" },
        { type: "UPDATE_CONTRACT_ADDRESSES" },
        { type: "UPDATE_FUNCTIONS_API" },
        { type: "UPDATE_EVENTS_API" },
        { type: "UPDATE_AUGUR_NODE_CONNECTION_STATUS" },
        { type: "REGISTER_TRANSACTION_RELAY" },
        { type: "LOAD_UNIVERSE" },
        { type: "CLOSE_MODAL" }
      ]);
    });

    /* test({
      description: "Should InitAugur successfully, not logged in",
      assertions: done => {
        ReWireModule.__Rewire__("AugurJS", {
          connect: (env, cb) => {
            cb(null, {
              ethereumNode: {
                ...ethereumNodeConnectionInfo,
                contracts: {},
                abi: {
                  functions: {},
                  events: {}
                }
              },
              augurNode: augurNodeWS
            });
          },
          augur: {
            contracts: { addresses: { 4: { Universe: "0xb0b" } } },
            rpc: {
              getNetworkID: () => 4,
              eth: { accounts: cb => cb(null, []) }
            },
            api: { Controller: { stopped: () => {} } }
          }
        });

        store.dispatch(
          initAugur({}, {}, (err, connInfo) => {
            assert.isUndefined(
              err,
              "callback passed to initAugur had a first argument when expecting undefined."
            );
            assert.isUndefined(
              connInfo,
              "callback passed to initAugur had a second argument when expecting undefined."
            );
            done();
          })
        );

        const expected = [
          { type: "UPDATE_ENV" },
          { type: "UPDATE_CONNECTION_STATUS" },
          { type: "UPDATE_CONTRACT_ADDRESSES" },
          { type: "UPDATE_FUNCTIONS_API" },
          { type: "UPDATE_EVENTS_API" },
          { type: "UPDATE_AUGUR_NODE_CONNECTION_STATUS" },
          { type: "REGISTER_TRANSACTION_RELAY" },
          { type: "LOAD_UNIVERSE" },
          { type: "CLOSE_MODAL" },
          { type: "LOGOUT" }
        ];

        assert.deepEqual(
          store.getActions(),
          expected,
          `Didn't fire the expected actions`
        );
      }
    }); */
    /*
    test({
      description:
        "Should InitAugur successfully, not logged in, unexpectedNetworkId",
      assertions: done => {
        ReWireModule.__Rewire__("AugurJS", {
          connect: (env, cb) => {
            cb(null, {
              ethereumNode: {
                ...ethereumNodeConnectionInfo,
                contracts: {},
                abi: {
                  functions: {},
                  events: {}
                }
              },
              augurNode: augurNodeWS
            });
          },
          augur: {
            contracts: {
              addresses: {
                4: { Universe: "0xb0b" },
                3: { Universe: "0xc41231e2" }
              }
            },
            rpc: {
              getNetworkID: () => 3,
              eth: { accounts: cb => cb(null, []) }
            },
            api: { Controller: { stopped: () => {} } }
          }
        });

        store.dispatch(
          initAugur({}, {}, (err, connInfo) => {
            assert.isUndefined(
              err,
              "callback passed to initAugur had a first argument when expecting undefined."
            );
            assert.isUndefined(
              connInfo,
              "callback passed to initAugur had a second argument when expecting undefined."
            );
            done();
          })
        );

        const expected = [
          { type: "UPDATE_ENV" },
          { type: "UPDATE_CONNECTION_STATUS" },
          { type: "UPDATE_CONTRACT_ADDRESSES" },
          { type: "UPDATE_FUNCTIONS_API" },
          { type: "UPDATE_EVENTS_API" },
          { type: "UPDATE_AUGUR_NODE_CONNECTION_STATUS" },
          { type: "REGISTER_TRANSACTION_RELAY" },
          { type: "LOAD_UNIVERSE" },
          { type: "UPDATE_MODAL" },
          { type: "LOGOUT" }
        ];

        assert.deepEqual(
          store.getActions(),
          expected,
          `Didn't fire the expected actions`
        );
      }
    });
    /*
    describe("connectAugur", () => {
      const test = t => it(t.description, done => t.assertions(done));

      test({
        description:
          "Should connectAugur successfully as an initial connection, with logged in account",
        assertions: done => {
          ReWireModule.__Rewire__("AugurJS", {
            connect: (env, cb) => {
              cb(null, {
                ethereumNode: {
                  ...ethereumNodeConnectionInfo,
                  contracts: {},
                  abi: {
                    functions: {},
                    events: {}
                  }
                },
                augurNode: augurNodeWS
              });
            },
            augur: {
              contracts: { addresses: { 4: { Universe: "0xb0b" } } },
              rpc: {
                getNetworkID: () => 4,
                eth: { accounts: cb => cb(null, ["0xa11ce"]) }
              },
              api: { Controller: { stopped: () => {} } }
            }
          });

          store.dispatch(
            connectAugur({}, mockEnv, true, (err, connInfo) => {
              assert.isUndefined(
                err,
                "callback passed to connectAugur had a first argument when expecting undefined."
              );
              assert.isUndefined(
                connInfo,
                "callback passed to connectAugur had a second argument when expecting undefined."
              );
              done();
            })
          );

          const expected = [
            { type: "UPDATE_CONNECTION_STATUS" },
            { type: "UPDATE_CONTRACT_ADDRESSES" },
            { type: "UPDATE_FUNCTIONS_API" },
            { type: "UPDATE_EVENTS_API" },
            { type: "UPDATE_AUGUR_NODE_CONNECTION_STATUS" },
            { type: "REGISTER_TRANSACTION_RELAY" },
            { type: "LOAD_UNIVERSE" },
            { type: "CLOSE_MODAL" },
            { type: "SET_LOGIN_ACCOUNT" }
          ];

          assert.deepEqual(
            store.getActions(),
            expected,
            `Didn't fire the expected actions`
          );
        }
      });
      test({
        description: "Should connectAugur successfully as a reconnection",
        assertions: done => {
          ReWireModule.__Rewire__("AugurJS", {
            connect: (env, cb) => {
              cb(null, {
                ethereumNode: {
                  ...ethereumNodeConnectionInfo,
                  contracts: {},
                  abi: {
                    functions: {},
                    events: {}
                  }
                },
                augurNode: augurNodeWS
              });
            },
            augur: {
              contracts: { addresses: { 4: { Universe: "0xb0b" } } },
              rpc: {
                getNetworkID: () => 4,
                eth: { accounts: cb => cb(null, []) }
              },
              api: { Controller: { stopped: () => {} } }
            }
          });

          store.dispatch(
            connectAugur({}, mockEnv, false, (err, connInfo) => {
              assert.isUndefined(
                err,
                "callback passed to connectAguur had a first argument when expecting undefined."
              );
              assert.isUndefined(
                connInfo,
                "callback passed to connectAguur had a second argument when expecting undefined."
              );
              done();
            })
          );
          const expected = [
            { type: "UPDATE_ENV" },
            { type: "UPDATE_CONNECTION_STATUS" },
            { type: "UPDATE_CONTRACT_ADDRESSES" },
            { type: "UPDATE_FUNCTIONS_API" },
            { type: "UPDATE_EVENTS_API" },
            { type: "UPDATE_AUGUR_NODE_CONNECTION_STATUS" },
            { type: "REGISTER_TRANSACTION_RELAY" },
            { type: "LOAD_UNIVERSE" }
          ];

          assert.deepEqual(
            store.getActions(),
            expected,
            `Didn't fire the expected actions`
          );
        }
      });
      test({
        description: "Should handle a undefined augurNode from AugurJS.connect",
        assertions: done => {
          ReWireModule.__Rewire__("AugurJS", {
            connect: (env, cb) => {
              cb(null, {
                ethereumNode: {
                  ...ethereumNodeConnectionInfo,
                  contracts: {},
                  abi: {
                    functions: {},
                    events: {}
                  }
                },
                augurNode: undefined
              });
            },
            augur: {
              contracts: {
                addresses: {
                  4: { Universe: "0xb0b" },
                  3: { Universe: "0xc41231e2" }
                }
              },
              rpc: {
                getNetworkID: () => 4,
                eth: { accounts: cb => cb(null, []) }
              }
            }
          });

          store.dispatch(
            connectAugur({}, mockEnv, false, (err, connInfo) => {
              assert.isNull(
                err,
                "callback passed to connectAugur had a first argument when expecting null."
              );
              assert.deepEqual(
                connInfo,
                {
                  ethereumNode: {
                    ...ethereumNodeConnectionInfo,
                    contracts: {},
                    abi: {
                      functions: {},
                      events: {}
                    }
                  },
                  augurNode: undefined
                },
                `Didn't return the expected connection info object on error.`
              );
              done();
            })
          );

          const expected = [];

          assert.deepEqual(
            store.getActions(),
            expected,
            `Didn't fire the expected actions`
          );
        }
      });
      test({
        description:
          "Should handle a undefined ethereumNode from AugurJS.connect",
        assertions: done => {
          ReWireModule.__Rewire__("AugurJS", {
            connect: (env, cb) => {
              cb(null, {
                ethereumNode: undefined,
                augurNode: augurNodeWS
              });
            },
            augur: {
              contracts: {
                addresses: {
                  4: { Universe: "0xb0b" },
                  3: { Universe: "0xc41231e2" }
                }
              },
              rpc: {
                getNetworkID: () => 4,
                eth: { accounts: cb => cb(null, []) }
              }
            }
          });

          store.dispatch(
            connectAugur({}, mockEnv, false, (err, connInfo) => {
              assert.isNull(
                err,
                "callback passed to connectAugur had a first argument when expecting null."
              );
              assert.deepEqual(
                connInfo,
                {
                  ethereumNode: undefined,
                  augurNode: augurNodeWS
                },
                `Didn't return the expected connection info object on error.`
              );
              done();
            })
          );

          const expected = [];

          assert.deepEqual(
            store.getActions(),
            expected,
            `Didn't fire the expected actions`
          );
        }
      });
      test({
        description: "Should handle a error object back from AugurJS.connect",
        assertions: done => {
          ReWireModule.__Rewire__("AugurJS", {
            connect: (env, cb) => {
              cb(
                { error: 2000, message: "There was a mistake." },
                {
                  ethereumNode: undefined,
                  augurNode: undefined
                }
              );
            },
            augur: {
              contracts: {
                addresses: {
                  4: { Universe: "0xb0b" },
                  3: { Universe: "0xc41231e2" }
                }
              },
              rpc: {
                getNetworkID: () => 4,
                eth: { accounts: cb => cb(null, []) }
              }
            }
          });

          store.dispatch(
            connectAugur({}, mockEnv, false, (err, connInfo) => {
              assert.deepEqual(
                err,
                { error: 2000, message: "There was a mistake." },
                `callback passed to connectAugur didn't recieve the expected error object.`
              );
              assert.deepEqual(
                connInfo,
                {
                  ethereumNode: undefined,
                  augurNode: undefined
                },
                `Didn't return the expected connection info object on error.`
              );
              done();
            })
          );

          const expected = [];

          assert.deepEqual(
            store.getActions(),
            expected,
            `Didn't fire the expected actions`
          );
        }
      });
    }); */
  });
});
