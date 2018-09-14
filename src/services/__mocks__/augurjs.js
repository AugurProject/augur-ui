const augurjs = jest.genMockFromModule("augur.js");

const BigNumber = require("bignumber.js");

const ten = new BigNumber(10, 10);
const decimals = new BigNumber(18, 10);
const multiple = ten.exponentiatedBy(18);

augurjs.constants = {
  PRECISION: {
    decimals: decimals.toNumber(),
    limit: ten.dividedBy(multiple),
    zero: new BigNumber(1, 10).dividedBy(multiple),
    multiple
  }
};

augurjs.rpc = {
  getCurrentBlock: () => ({ number: 10000, timestamp: 4886718345 }),
  block: { number: 10000, timestamp: 4886718345 }
};

augurjs.api = {
  Controller: {
    getTimestamp: callback => {
      callback(null, 42);
    }
  }
};

module.exports = augurjs;
