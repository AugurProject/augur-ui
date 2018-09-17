import { createBigNumber } from "utils/create-big-number";

import coreStats, * as coreStatsObj from "modules/account/selectors/core-stats";

/*
import coreStats, {
  selectOutcomeLastPrice,
  createPeriodPLSelector,
  selectCoreStats
} from "modules/account/selectors/core-stats";
*/

// import { formatEther, formatRep } from 'utils/format-number'

import { ZERO } from "modules/trade/constants/numbers";

//jest.mock("modules/account/selectors/core-stats");
jest.mock("../../../services/augurjs");

describe("modules/account/selectors/core-stats", () => {
  describe("default", () => {
    test("should call 'selectCoreStats", () => {
      const spy = jest.spyOn(coreStatsObj, "selectCoreStats");
      coreStats();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  /*
  describe("selectOutcomeLastPrice", () => {
    test("should return null when 'marketOutcomeData' is undefined", () => {
      const actual = selectOutcomeLastPrice(undefined, 1);
      expect(actual).toStrictEqual(null);
    });

    test("should return null when 'outcomeId' is undefined", () => {
      const actual = selectOutcomeLastPrice({}, undefined);
      expect(actual).toStrictEqual(null);
    });

    test("should return the price when data exists", () => {
      const actual = selectOutcomeLastPrice({ 1: { price: "0.1" } }, 1);
      expect(actual).toStrictEqual("0.1");
    });

    test("should return undefined when data does not exist", () => {
      const actual = selectOutcomeLastPrice({ 2: { price: "0.1" } }, 1);
      expect(actual).toStrictEqual(undefined);
    });
  }); */
  /*
  describe("createPeriodPLSelector", () => {
    test("should return null when 'accountTrades' is undefined", () => {
      const selector = createPeriodPLSelector(1);
      const actual = selector.resultFunc(undefined, {}, undefined);
      expect(actual).toStrictEqual(null);
    });

    test("should return null when 'blockchain' is undefined", () => {
      const selector = createPeriodPLSelector(1);
      const actual = selector.resultFunc({}, undefined, undefined);
      expect(actual).toStrictEqual(null);
    });

    test("should return 0 for a set period with no trades", () => {
      const accountTrades = {
        "0xMarketID1": {
          1: [
            {
              blockNumber: 90000
            },
            {
              blockNumber: 90001
            }
          ],
          2: [
            {
              blockNumber: 90000
            },
            {
              blockNumber: 90001
            }
          ]
        }
      };

      const blockchain = {
        currentBlockNumber: 100000
      };

      const outcomesData = {
        "0xMarketID1": {}
      };

      const selector = createPeriodPLSelector(1);

      const actual = selector.resultFunc(
        accountTrades,
        blockchain,
        outcomesData
      );

      expect(actual).toStrictEqual(ZERO);
    });

    test("should return the expected value for a set period with trades", () => {
      const accountTrades = {
        "0xMarketID1": {
          1: [
            {
              blockNumber: 95000
            },
            {
              blockNumber: 96000
            }
          ],
          2: [
            {
              blockNumber: 95000
            },
            {
              blockNumber: 96000
            }
          ]
        }
      };

      const blockchain = {
        currentBlockNumber: 100000
      };

      const outcomesData = {
        "0xMarketID1": {}
      };

      // CoreStatsRewireAPI.__Rewire__("selectOutcomeLastPrice", () => "0.2");
      jest.mock("selectOutcomeLastPrice", () => "0.2");

      CoreStatsRewireAPI.__Rewire__("augur", {
        trading: {
          calculateProfitLoss: () => ({
            realized: "-1",
            unrealized: "2"
          })
        }
      });


      const selector = createPeriodPLSelector(1);

      const actual = selector.resultFunc(
        accountTrades,
        blockchain,
        outcomesData
      );

      const expected = createBigNumber("2");

      // CoreStatsRewireAPI.__ResetDependency__("selectOutcomeLastPrice");
      // CoreStatsRewireAPI.__ResetDependency__("augur");

      expect(actual).toStrictEqual(expected);
    });
  }); */
});
