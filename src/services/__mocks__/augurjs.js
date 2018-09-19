const realAugur = require.requireActual("../augurjs.js");

const mockAugur = jest.genMockFromModule("augur.js");

const universesData = [
  {
    universe: "0xGENESIS",
    payout: [],
    isInvalid: false,
    numMarkets: 15,
    supply: "1100000000000000000000000",
    parentUniverse: "0x0000000000000000000000000000000000000000"
  },
  {
    universe: "0xGENESIS_2",
    payout: [],
    isInvalid: false,
    numMarkets: 0,
    supply: "50000000000000000000000",
    parentUniverse: "0x0000000000000000000000000000000000000000"
  },
  {
    universe: "0xCHILD_1",
    payout: [10000, 0],
    isInvalid: false,
    numMarkets: 400,
    parentUniverse: "0xGENESIS"
  }
];

const ethereumNodeConnectionInfo = {
  http: "http://some.eth.node.com",
  ws: "wss://some.eth.ws.node.com"
};

const augurNodeWS = "wss://some.web.socket.com";

mockAugur.rpc = {
  block: { number: 10000, timestamp: 4886718345 },
  constants: realAugur.augur.rpc.constants,
  eth: { accounts: cb => cb(null, ["0xa11ce"]) },
  getCurrentBlock: () => ({ number: 10000, timestamp: 4886718345 }),
  clear: realAugur.augur.rpc.clear,
  getNetworkID: () => 4
};

mockAugur.constants = realAugur.augur.constants;

mockAugur.api = {
  set mockController(c) {
    mockAugur.api.Controller = c;
  },
  Controller: {},
  Universe: {
    getParentUniverse: (args, callback) => {
      expect(args).toStrictEqual({
        tx: { to: "0xGENESIS" }
      });
      return callback(null, "0x0000000000000000000000000000000000000000");
    },
    getOpenInterestInAttoEth: (args, callback) => {
      callback(null, "1000000");
    }
  }
};

mockAugur.augurNode = {
  set mockGetSyncData(f) {
    mockAugur.augurNode.getSyncData = f;
  },
  getSyncData: () => {},

  submitRequest: (methodName, args, callback) => {
    expect(methodName).toEqual("getUniversesInfo");
    expect(args).toStrictEqual({
      universe: "0xGENESIS",
      account: "0xACCOUNT"
    });
    return callback(null, universesData);
  }
};

mockAugur.trading = {
  calculateProfitLoss: () => ({
    realized: "-1",
    unrealized: "2"
  })
};

mockAugur.connect = (env, cb) => {
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
};

mockAugur.contracts = { addresses: { 4: { Universe: "0xb0b" } } };

mockAugur.augur = mockAugur;

module.exports = mockAugur;
