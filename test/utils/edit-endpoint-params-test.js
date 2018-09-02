import { editEndpointParam } from "src/utils/edit-endpoint-params";

describe("src/utils/edit-endpoint-params.js", () => {
  let windowRef;
  beforeEach(() => {
    windowRef = {
      location: {
        search:
          "?augur_node=ws%3A%2F%2F127.0.0.1%3A9001&ethereum_node_http=http%3A%2F%2F127.0.0.1%3A8545&ethereum_node_ws=ws%3A%2F%2F127.0.0.1%3A8546&some_other_param=somevalue",
        origin: "http://example.com",
        hash: "#/markets",
        href: ""
      }
    };
  });

  // Not changing params

  describe("when the same or null values are passed", () => {
    beforeEach(() => {
      windowRef.location = Object.freeze(windowRef.location);
    });

    describe("when nothing is passed", () => {
      it("should not change the location", () => {
        assert.doesNotThrow(() => {
          editEndpointParam(windowRef, {});
        });
      });
    });

    describe("when only the same augur-node is passed", () => {
      it("should not update location", () => {
        assert.doesNotThrow(() => {
          editEndpointParam(windowRef, { augurNode: "ws://127.0.0.1:9001" });
        });
      });
    });

    describe("when only the same ethereum-node-http is passed", () => {
      it("should not update location", () => {
        assert.doesNotThrow(() => {
          editEndpointParam(windowRef, {
            ethereumNodeHTTP: "http://127.0.0.1:8545"
          });
        });
      });
    });

    describe("when only the same ethereum-node-ws is passed", () => {
      it("should not update location", () => {
        assert.doesNotThrow(() => {
          editEndpointParam(windowRef, {
            ethereumNodeWS: "ws://127.0.0.1:8546"
          });
        });
      });
    });
  });

  // Changing params

  describe("when only a new augur-node is passed", () => {
    it("should update the augur-node endpoint in the url search string", () => {
      editEndpointParam(windowRef, {
        augurNode: "ws://different-endpoint:100000"
      });
      assert.equal(
        windowRef.location.href,
        "http://example.com?augur_node=ws%3A%2F%2Fdifferent-endpoint%3A100000&ethereum_node_http=http%3A%2F%2F127.0.0.1%3A8545&ethereum_node_ws=ws%3A%2F%2F127.0.0.1%3A8546&some_other_param=somevalue#/markets"
      );
    });
  });

  describe("when only a new ethereum-node-http is passed", () => {
    it("should update the ehtereum-node-http in the url search string", () => {
      editEndpointParam(windowRef, {
        ethereumNodeHTTP: "http://111.1.1.1:1111"
      });
      assert.equal(
        windowRef.location.href,
        "http://example.com?augur_node=ws%3A%2F%2F127.0.0.1%3A9001&ethereum_node_http=http%3A%2F%2F111.1.1.1%3A1111&ethereum_node_ws=ws%3A%2F%2F127.0.0.1%3A8546&some_other_param=somevalue#/markets"
      );
    });
  });

  describe("when only a new ethereum-node-ws is passed", () => {
    it("should update the ethereum-node-ws in the url search string", () => {
      editEndpointParam(windowRef, {
        ethereumNodeWS: "ws://222.2.2.2:2222"
      });
      assert.equal(
        windowRef.location.href,
        "http://example.com?augur_node=ws%3A%2F%2F127.0.0.1%3A9001&ethereum_node_http=http%3A%2F%2F127.0.0.1%3A8545&ethereum_node_ws=ws%3A%2F%2F222.2.2.2%3A2222&some_other_param=somevalue#/markets"
      );
    });
  });
});
