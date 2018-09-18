const mockAugur = jest.genMockFromModule("augur.js");

const BigNumber = require("bignumber.js");

const ten = new BigNumber(10, 10);
const decimals = new BigNumber(18, 10);
const multiple = ten.exponentiatedBy(18);
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

mockAugur.constants = {
  PRECISION: {
    decimals: decimals.toNumber(),
    limit: ten.dividedBy(multiple),
    zero: new BigNumber(1, 10).dividedBy(multiple),
    multiple
  }
};

mockAugur.rpc = {
  getCurrentBlock: () => ({ number: 10000, timestamp: 4886718345 }),
  block: { number: 10000, timestamp: 4886718345 },
  constants: {
    ACCOUNT_TYPES: {
      U_PORT: "uPort",
      LEDGER: "ledger",
      PRIVATE_KEY: "privateKey",
      UNLOCKED_ETHEREUM_NODE: "unlockedEthereumNode",
      META_MASK: "metaMask",
      TREZOR: "trezor",
      EDGE: "edge"
    }
  }
};

mockAugur.api = {
  Controller: {
    getTimestamp: callback => {
      callback(null, 42);
    }
  },
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
  getSyncData: () => this.mockGetSyncData,

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

mockAugur.augur = mockAugur;

module.exports = mockAugur;
