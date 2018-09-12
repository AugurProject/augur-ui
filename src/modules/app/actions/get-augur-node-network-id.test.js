import {
  getAugurNodeNetworkId,
  __RewireAPI__
} from "modules/app/actions/get-augur-node-network-id";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("modules/app/actions/get-augur-node-network-id.js", () => {
  let store;
  afterEach(() => {
    store.clearActions();
    __RewireAPI__.__ResetDependency__("augur");
  });
  const runTest = t =>
    test(t.description, done => {
      store = configureMockStore([thunk])({ ...t.state });
      __RewireAPI__.__Rewire__("augur", t.stub.augur);
      store.dispatch(
        getAugurNodeNetworkId((err, augurNodeNetworkId) => {
          t.expectations(err, augurNodeNetworkId, store.getActions());
          done();
        })
      );
    });
  runTest({
    description: "augur-node network id already in state",
    state: {
      connection: { augurNodeNetworkId: "4" }
    },
    stub: {
      augur: {
        augurNode: {
          getSyncData: () => expect.toThrowErrorMatchingSnapshot()
        }
      }
    },
    expectations: (err, augurNodeNetworkId, actions) => {
      expect(err).toBeNull();
      expect(augurNodeNetworkId).toStrictEqual("4");
      expect(actions).toEqual([]);
    }
  });
  runTest({
    description: "fetch network id from augur-node",
    state: {
      connection: { augurNodeNetworkId: null }
    },
    stub: {
      augur: {
        augurNode: {
          getSyncData: callback => callback(null, { net_version: "4" })
        }
      }
    },
    expectations: (err, augurNodeNetworkId, actions) => {
      expect(err).toBeNull();
      expect(augurNodeNetworkId).toStrictEqual("4");
      expect(actions).toEqual([
        {
          type: "UPDATE_AUGUR_NODE_NETWORK_ID",
          augurNodeNetworkId: "4"
        }
      ]);
    }
  });
});
