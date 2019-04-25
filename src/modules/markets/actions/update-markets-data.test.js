import * as updateMarketsDataReducer from "modules/markets/actions/update-markets-data";

describe(`modules/markets/actions/update-markets-data.js`, () => {
  test("`updateMarketsData` should return the expected object", () => {
    const actual = updateMarketsDataReducer.updateMarketsData({
      test: "object"
    });

    const expected = {
      type: updateMarketsDataReducer.UPDATE_MARKETS_DATA,
      data: {
        marketsData: {
          test: "object"
        }
      }
    };

    expect(actual).toEqual(expected);
  });

  test("`clearMarketsData` should return the expected object", () => {
    const actual = updateMarketsDataReducer.clearMarketsData();

    const expected = {
      type: updateMarketsDataReducer.CLEAR_MARKETS_DATA
    };

    expect(actual).toEqual(expected);
  });

  test("`updateMarketFrozenSharesValue` should return the expected object", () => {
    const actual = updateMarketsDataReducer.updateMarketFrozenSharesValue(
      "0xMarket1",
      5
    );

    const expected = {
      type: updateMarketsDataReducer.UPDATE_MARKET_FROZEN_SHARES_VALUE,
      data: {
        marketId: "0xMarket1",
        frozenSharesValue: 5
      }
    };

    expect(actual).toEqual(expected);
  });
});
