import { createBigNumber } from "utils/create-big-number";
import proxyquire from "proxyquire";
import sinon from "sinon";
import { SCALAR } from "../../../src/modules/markets/constants/market-types";

describe(`modules/positions/selectors/winning-positions.js`, () => {
  proxyquire.noPreserveCache().noCallThru();
  const test = t => {
    it(t.description, () => {
      const Speedomatic = { bignum: () => {} };
      const SelectLoginAccountPositions = () =>
        t.selectors.loginAccountPositions;
      const selector = proxyquire(
        "../../../src/modules/positions/selectors/winning-positions.js",
        {
          speedomatic: Speedomatic,
          "./login-account-positions": SelectLoginAccountPositions
        }
      );
      sinon.stub(Speedomatic, "bignum").callsFake(n => createBigNumber(n, 10));
      t.assertions(selector.selectClosedMarketsWithWinningShares(t.state));
    });
  };
  test({
    description: "no positions",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: []
      }
    },
    assertions: selection => {
      assert.deepEqual(selection, {});
    }
  });
  test({
    description: "1 position in closed market",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: [
          {
            id: "0xa1",
            isOpen: false,
            description: "test market 1",
            outstandingReturns: "1",
            consensus: {
              outcomeId: "2",
              isIndeterminate: false
            }
          }
        ]
      }
    },
    assertions: selection => {
      const winnings = createBigNumber("1");
      assert.deepEqual(selection, {
        "0xa1": {
          id: "0xa1",
          description: "test market 1",
          winnings
        }
      });
    }
  });
  test({
    description: "1 position in closed indeterminate market",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: [
          {
            id: "0xa1",
            isOpen: false,
            description: "test market 1",
            outstandingReturns: "1",
            consensus: {
              outcomeId: "2",
              isIndeterminate: true
            }
          }
        ]
      }
    },
    assertions: selection => {
      const winnings = createBigNumber("1");
      assert.deepEqual(selection, {
        "0xa1": {
          id: "0xa1",
          description: "test market 1",
          winnings
        }
      });
    }
  });
  test({
    description: "1 position in closed no winnings",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: [
          {
            id: "0xa1",
            isOpen: false,
            description: "test market 1",
            type: SCALAR,
            outstandingReturns: "0",
            consensus: {
              outcomeId: "0.5",
              isIndeterminate: false
            }
          }
        ]
      }
    },
    assertions: selection => {
      assert.deepEqual(selection, {});
    }
  });
  test({
    description: "1 position in open market",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: [
          {
            id: "0xa1",
            isOpen: true,
            description: "test market 1",
            outstandingReturns: "1",
            consensus: {
              outcomeId: "0.5",
              isIndeterminate: true
            }
          }
        ]
      }
    },
    assertions: selection => {
      assert.deepEqual(selection, {});
    }
  });
  test({
    description: "2 position in open markets, 1 position in closed market",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: [
          {
            id: "0xa1",
            isOpen: true,
            consensus: null
          },
          {
            id: "0xa2",
            isOpen: true,
            consensus: null
          },
          {
            id: "0xa3",
            isOpen: false,
            description: "test market 3",
            outstandingReturns: "1",
            consensus: {
              outcomeId: "2",
              isIndeterminate: false
            }
          }
        ]
      }
    },
    assertions: selection => {
      const winnings = createBigNumber("1");
      assert.deepEqual(selection, {
        "0xa3": {
          id: "0xa3",
          description: "test market 3",
          winnings
        }
      });
    }
  });
  test({
    description: "2 position in closed market",
    state: {},
    selectors: {
      loginAccountPositions: {
        markets: [
          {
            id: "0xa1",
            isOpen: false,
            description: "test market 1",
            outstandingReturns: "1",
            consensus: {
              outcomeId: "0.5",
              isIndeterminate: true
            }
          },
          {
            id: "0xa21",
            isOpen: false,
            description: "test market 1",
            outstandingReturns: "1",
            consensus: {
              outcomeId: "0.5",
              isIndeterminate: true
            }
          }
        ]
      }
    },
    assertions: selection => {
      const winnings = createBigNumber("1");
      assert.deepEqual(selection, {
        "0xa1": {
          id: "0xa1",
          description: "test market 1",
          winnings
        },
        "0xa21": {
          id: "0xa21",
          description: "test market 1",
          winnings
        }
      });
    }
  });
});
