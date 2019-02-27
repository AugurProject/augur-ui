import assertFormattedNumber from "src/assertions/common/formatted-number";

export default function(positionsMarkets) {
  expect(positionsMarkets).toBeDefined();
  expect(Array.isArray(positionsMarkets)).toBe(true);

  positionsMarkets.forEach(positionMarket =>
    assertPositionMarket(positionMarket)
  );
}

function assertPositionMarket(positionMarket) {
  describe("positionMarket", () => {
    test("id", () => {
      expect(positionMarket.id).toBeDefined();
      expect(typeof positionMarket.id).toBe("string");
    });

    test("description", () => {
      expect(positionMarket.description).toBeDefined();
      expect(typeof positionMarket.description).toBe("string");
    });

    assertPositionMarketSummary(positionMarket.myPositionsSummary);
  });
}

function assertPositionMarketSummary(summary) {
  assertFormattedNumber(
    summary.unrealizedNet,
    "myPositionsSummary.unrealizedNet"
  );
  assertFormattedNumber(summary.realizedNet, "myPositionsSummary.realizedNet");
  assertFormattedNumber(summary.totalValue, "myPositionsSummary.totalValue");
}
