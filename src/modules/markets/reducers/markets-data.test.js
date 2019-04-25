import reducer from "modules/markets/reducers/markets-data";

describe(`modules/markets/reducers/markets-data.js`, () => {
  describe("UPDATE_MARKETS_DATA", () => {
    test("should update markets data", () => {
      const marketsData = {
        "0x04be50f6303babc4e5400a6ebfaa77a8a76f620dd9f6394466e552842f585801": {
          id: 2,
          outcomeId: "someoutcome",
          details: {
            example: "test"
          }
        }
      };
      const marketsData2 = {
        "0x0131d98e878803e113e2accc457ad57f5b97a87910be31d60e931c08ca4d5ef1": {
          id: 1,
          outcomeId: "an outcomeId",
          details: {
            test: "example"
          }
        },
        "0x04be50f6303babc4e5400a6ebfaa77a8a76f620dd9f6394466e552842f585801": {
          id: 2,
          outcomeId: "someoutcome",
          details: {
            example: "test"
          }
        }
      };
      const curMarketsData1 = {
        "0x0131d98e878803e113e2accc457ad57f5b97a87910be31d60e931c08ca4d5ef1": {
          id: 1,
          outcomeId: "an outcomeId",
          details: {
            test: "example"
          }
        }
      };
      const curMarketsData2 = {
        "0x0131d98e878803e113e2accc457ad57f5b97a87910be31d60e931c08ca4d5ef1": {
          id: 1,
          outcomeId: "an outcomeId",
          details: {
            test: "example"
          }
        },
        "0x04be50f6303babc4e5400a6ebfaa77a8a76f620dd9f6394466e552842f585801": {
          id: 2,
          outcomeId: "a different outcome",
          details: {
            example: "test2"
          }
        }
      };
      const expectedOutput = {
        "0x0131d98e878803e113e2accc457ad57f5b97a87910be31d60e931c08ca4d5ef1": {
          id: 1,
          outcomeId: "an outcomeId",
          details: {
            test: "example"
          }
        },
        "0x04be50f6303babc4e5400a6ebfaa77a8a76f620dd9f6394466e552842f585801": {
          id: 2,
          outcomeId: "someoutcome",
          details: {
            example: "test"
          }
        }
      };
      const action = {
        type: "UPDATE_MARKETS_DATA",
        data: { marketsData }
      };
      const action2 = {
        type: "UPDATE_MARKETS_DATA",
        data: { marketsData: marketsData2 }
      };
      expect(reducer(curMarketsData1, action)).toEqual(expectedOutput);
      expect(reducer(curMarketsData2, action)).toEqual(expectedOutput);
      expect(reducer(undefined, action2)).toEqual(expectedOutput);
    });
  });
});
