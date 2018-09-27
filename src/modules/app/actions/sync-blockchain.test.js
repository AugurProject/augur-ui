import { syncBlockchain } from "modules/app/actions/sync-blockchain";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import testState from "test/testState";
import * as augur from "services/augurjs";

jest.mock("services/augurjs");
jest.mock("modules/app/actions/update-blockchain");
jest.mock("modules/auth/actions/update-assets");

describe("modules/app/actions/sync-blockchain.js", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const state = Object.assign({}, testState, {
    blockchain: {
      currentBlockTimestamp: 4886718335,
      currentBlockNumber: 9999,
      currentAugurTimestamp: 42
    }
  });
  const dataReturned = {
    currentBlockNumber: 0x10000,
    currentBlockTimestamp: 0x4886718345,
    currentAugurTimestamp: 42
  };
  const store = mockStore(state);
  augur.api.mockController = {
    getTimestamp: callback => {
      callback(null, 42);
    }
  };

  afterEach(() => {
    store.clearActions();
  });

  test("rpc.block set: should sync with blockchain using rpc.block.number", () => {
    augur.rpc.block = { number: 10000, timestamp: "0x123456789" };
    store.dispatch(syncBlockchain());
    expect(store.getActions()).toEqual([
      {
        type: "UPDATE_BLOCKCHAIN",
        data: dataReturned
      },
      {
        type: "UPDATE_ASSETS",
        data: undefined
      }
    ]);
  });
});
