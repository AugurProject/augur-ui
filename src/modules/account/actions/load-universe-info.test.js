import { YES_NO } from "modules/markets/constants/market-types";
import {
  loadUniverseInfo,
  __RewireAPI__ as ReWireModule
} from "modules/account/actions/load-universe-info";

describe("modules/account/actions/load-universe-info.js", () => {
  const runTest = t => test(t.description, () => t.expectations());

  describe("loadUniverseInfo", () => {
    runTest({
      description: "should return the expected object",
      expectations: () => {
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

        const stateData = {
          loginAccount: {
            address: "0xACCOUNT"
          },
          universe: {
            winningChildUniverse: "0xCHILD_1",
            forkingMarket: "0xMARKET",
            id: "0xGENESIS",
            isForking: true
          },
          marketsData: {
            "0xMARKET": {
              maxPrice: 1,
              minPrice: 0,
              numTicks: 10000,
              marketType: YES_NO
            }
          }
        };

        const getState = () => stateData;

        ReWireModule.__Rewire__("augur", {
          api: {
            Universe: {
              getParentUniverse: (args, callback) => {
                expect(args).toStrictEqual({
                  tx: { to: "0xGENESIS" }
                });
                return callback(
                  null,
                  "0x0000000000000000000000000000000000000000"
                );
              },
              getOpenInterestInAttoEth: (args, callback) => {
                callback(null, "1000000");
              }
            }
          },
          augurNode: {
            submitRequest: (methodName, args, callback) => {
              expect(methodName).toEqual("getUniversesInfo");
              expect(args).toStrictEqual({
                universe: "0xGENESIS",
                account: "0xACCOUNT"
              });
              return callback(null, universesData);
            }
          }
        });

        const expected = {
          parent: null,
          children: [
            {
              universe: "0xCHILD_1",
              payout: [10000, 0],
              isInvalid: false,
              numMarkets: 400,
              openInterest: "1000000",
              parentUniverse: "0xGENESIS",
              description: "No",
              isWinningUniverse: true
            }
          ],
          currentLevel: [
            {
              universe: "0xGENESIS",
              payout: [],
              isInvalid: false,
              numMarkets: 15,
              openInterest: "1000000",
              supply: "1100000000000000000000000",
              parentUniverse: "0x0000000000000000000000000000000000000000",
              description: "GENESIS",
              isWinningUniverse: false
            }
          ]
        };

        loadUniverseInfo(actual => {
          expect(actual).toStrictEqual(expected);
        })(null, getState);
      }
    });
  });
});
