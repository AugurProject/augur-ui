import assertFormattedNumber from "src/assertions/common/formatted-number";
import assertFormattedDate from "src/assertions/common/formatted-date";
import assertReportableOutcomes from "src/assertions/reportable-outcomes";

export default function(market) {
  // market can be undefined
  if (!market.id) {
    return;
  }

  describe("market state", () => {
    test("market", () => {
      expect(market).toBeDefined();
      expect(typeof market).toBe("object");
    });

    test("market.id", () => {
      expect(market.id).toBeDefined();
      expect(typeof market.id).toBe("string");
    });

    test("market.author", () => {
      expect(market.author).toBeDefined();
      expect(typeof market.author).toBe("string");
    });

    test("market.marketType", () => {
      expect(market.marketType).toBeDefined();
      expect(typeof market.marketType).toBe("string");
    });

    test("market.description", () => {
      expect(market.description).toBeDefined();
      expect(typeof market.description).toBe("string");
    });

    test("market.details", () => {
      expect(market.details).toBeDefined();
      expect(typeof market.details).toBe("string");
    });

    test("market.endTime", () => {
      expect(market.endTime).toBeDefined();
      assertFormattedDate(market.endTime, "market.endTime");
    });

    test("market.creationTime", () => {
      expect(market.creationTime).toBeDefined();
      assertFormattedDate(market.creationTime, "market.creationTime");
    });

    test("market.endTimeLabel", () => {
      expect(market.endTimeLabel).toBeDefined();
      expect(typeof market.endTimeLabel).toBe("string");
    });

    test("market.settlementFeePercent", () => {
      expect(market.settlementFeePercent).toBeDefined();
      assertFormattedNumber(
        market.settlementFeePercent,
        "market.settlementFeePercent"
      );
    });

    test("market.volume", () => {
      expect(market.volume).toBeDefined();
      assertFormattedNumber(market.volume, "market.volume");
    });

    test("market.isOpen", () => {
      expect(market.isOpen).toBeDefined();
      expect(typeof market.isOpen).toBe("boolean");
    });

    test("market.isPendingReport", () => {
      expect(market.isPendingReport).toBeDefined();
      expect(typeof market.isPendingReport).toBe("boolean");
    });

    const { tags } = market;
    test("market.tags", () => {
      expect(tags).toBeDefined();
      expect(Array.isArray(tags)).toBe(true);

      tags.forEach((tag, i) => {
        test(`market.tags[${i}].name`, () => {
          expect(tag.name).toBeDefined();
          expect(typeof tag.name).toBe("string");
        });

        test(`market.tags[${i}].onCLick`, () => {
          expect(tag.onClick).toBeDefined();
          expect(typeof tag.onClick).toBe("function");
        });
      });
    });

    test("market.outcomes", () => {
      expect(market.outcomes).toBeDefined();
      expect(Array.isArray(market.outcomes)).toBe(true);

      market.outcomes.forEach((outcome, i) => {
        test(`market.outcomes[${i}]`, () => {
          expect(outcome).toBeDefined();
          expect(typeof outcome).toBe("object");
        });

        test(`market.outcomes[${i}].id`, () => {
          expect(outcome.id).toBeDefined();
          expect(typeof outcome.id).toBe("string");
        });

        test(`market.outcomes[${i}].name`, () => {
          expect(outcome.name).toBeDefined();
          expect(typeof outcome.name).toBe("string");
        });

        test(`market.outcomes[${i}].marketId`, () => {
          expect(outcome.marketId).toBeDefined();
          expect(typeof outcome.marketId).toBe("string");
        });

        test(`market.outcomes[${i}].lastPrice`, () => {
          expect(outcome.lastPrice).toBeDefined();
          assertFormattedNumber(outcome.lastPrice, "outcome.lastPrice");
        });

        test(`market.outcomes[${i}].lastPricePercent`, () => {
          expect(outcome.lastPricePercent).toBeDefined();
          assertFormattedNumber(
            outcome.lastPricePercent,
            "outcome.lastPricePercent"
          );
        });

        const { trade } = outcome;
        test(`market.outcomes[${i}].trade`, () => {
          expect(trade).toBeDefined();
          expect(typeof trade).toBe("object");
        });

        test(`market.outcomes[${i}].trade.side`, () => {
          expect(trade.side).toBeDefined();
          expect(typeof trade.side).toBe("string");
        });

        test(`market.outcomes[${i}].trade.numShares`, () => {
          expect(trade.numShares).toBeDefined();
          expect(typeof trade.numShares).toBe("number");
        });

        test(`market.outcomes[${i}].trade.maxNumShares`, () => {
          expect(trade.maxNumShares).toBeDefined();
          expect(typeof trade.maxNumShares).toBe("number");
        });

        test(`market.outcomes[${i}].trade.limitPrice`, () => {
          expect(trade.limitPrice).toBeDefined();
          expect(typeof trade.limitPrice).toBe("number");
        });

        const { orderBook } = outcome;
        test(`market.outcomes[${i}].orderBook`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          expect(orderBook).toBeDefined();
          expect(typeof orderBook).toBe("object");
        });

        test(`market.outcomes[${i}].orderBook.bids`, () => {
          expect(orderBook.bids).toBeDefined();
          expect(Array.isArray(orderBook.bids)).toBe(true);
        });

        test(`market.outcomes[${i}].orderBook.asks`, () => {
          expect(orderBook.asks).toBeDefined();
          expect(Array.isArray(orderBook.asks)).toBe(true);
        });

        test(`market.outcomes[${i}].orderBook.topBid`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          expect(outcome.topBid).toBeDefined();
        });

        test(`market.outcomes[${i}].orderBook.topAsk`, () => {
          // NOTE -- shallow check here due to deep check further down of the same selector method
          expect(outcome.topAsk).toBeDefined();
        });

        const { userOpenOrders } = outcome;
        test(`market.outcomes[${i}].userOpenOrders`, () => {
          expect(userOpenOrders).toBeDefined();
          expect(Array.isArray(userOpenOrders)).toBe(true);
        });

        test(`market.outcomes[${i}].userOpenOrders`, () => {
          expect(userOpenOrders).toBeDefined();
          expect(Array.isArray(userOpenOrders)).toBe(true);
        });

        userOpenOrders.forEach((openOrder, j) => {
          test(`market.outcomes[${i}].userOpenOrders[${j}]`, () => {
            expect(openOrder).toBeDefined();
            expect(typeof openOrder).toBe("object");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].id`, () => {
            expect(openOrder.id).toBeDefined();
            expect(typeof openOrder.id).toBe("object");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].marketId`, () => {
            expect(openOrder.marketId).toBeDefined();
            expect(typeof openOrder.marketId).toBe("string");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].outcomeName`, () => {
            expect(openOrder.outcomeName).toBeDefined();
            expect(typeof openOrder.outcomeName).toBe("string");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].type`, () => {
            expect(openOrder.type).toBeDefined();
            expect(typeof openOrder.type).toBe("string");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].avgPrice`, () => {
            expect(openOrder.avgPrice).toBeDefined();
            expect(typeof openOrder.avgPrice).toBe("object");
            assertFormattedNumber(openOrder.avgPrice, "openOrder.avgPrice");
          });

          test(`market.outcomes[${i}].userOpenOrders[${j}].unmatchedShares`, () => {
            expect(openOrder.unmatchedShares).toBeDefined();
            expect(typeof openOrder.unmatchedShares).toBe("object");
            assertFormattedNumber(
              openOrder.unmatchedShares,
              "openOrder.unmatchedShares"
            );
          });
        });
      });
    });

    test("market.reportableOutcomes", () => {
      assertReportableOutcomes(market.reportableOutcomes);
    });

    const indeterminateItem =
      market.reportableOutcomes[market.reportableOutcomes.length - 1];
    test("market.reportableOutcomes[market.reportableOutcomes.length - 1] (indeterminateItem)", () => {
      expect(indeterminateItem).toBeDefined();
      expect(typeof indeterminateItem).toBe("object");
    });

    test("market.reportableOutcomes[market.reportableOutcomes.length - 1] (indeterminateItem.id)", () => {
      expect(indeterminateItem.id).toBeDefined();
      expect(typeof indeterminateItem.id).toBe("string");
    });

    test("market.reportableOutcomes[market.reportableOutcomes.length - 1] (indeterminateItem.name)", () => {
      expect(indeterminateItem.name).toBeDefined();
      expect(typeof indeterminateItem.name).toBe("string");
    });

    const { myPositionsSummary } = market;
    test("market.myPositionsSummary", () => {
      expect(myPositionsSummary).toBeDefined();
      expect(typeof myPositionsSummary).toBe("object");
    });

    test("market.myPositionsSummary.numPositions", () => {
      expect(myPositionsSummary.numPositions).toBeDefined();
      assertFormattedNumber(
        myPositionsSummary.numPositions,
        "myPositionsSummary.numPositions"
      );
    });

    test("market.myPositionsSummary.qtyShares", () => {
      expect(myPositionsSummary.qtyShares).toBeDefined();
      assertFormattedNumber(
        myPositionsSummary.qtyShares,
        "myPositionsSummary.qtyShares"
      );
    });

    test("market.myPositionsSummary.purchasePrice", () => {
      expect(myPositionsSummary.purchasePrice).toBeDefined();
      assertFormattedNumber(
        myPositionsSummary.purchasePrice,
        "myPositionsSummary.purchasePrice"
      );
    });

    test("market.myPositionsSummary.realizedNet", () => {
      expect(myPositionsSummary.realizedNet).toBeDefined();
      assertFormattedNumber(
        myPositionsSummary.realizedNet,
        "myPositionsSummary.realizedNet"
      );
    });

    test("market.myPositionsSummary.unrealizedNet", () => {
      expect(myPositionsSummary.unrealizedNet).toBeDefined();
      assertFormattedNumber(
        myPositionsSummary.unrealizedNet,
        "myPositionsSummary.unrealizedNet"
      );
    });

    test("market.myPositionsSummary.totalNet", () => {
      expect(myPositionsSummary.totalNet).toBeDefined();
      assertFormattedNumber(
        myPositionsSummary.totalNet,
        "myPositionsSummary.totalNet"
      );
    });

    const { report } = market;
    test("market.report", () => {
      expect(report).toBeDefined();
      expect(typeof report).toBe("object");
    });

    test("market.report.onSubmitReport", () => {
      expect(report.onSubmitReport).toBeDefined();
      expect(typeof report.onSubmitReport).toBe("function");
    });

    const { onSubmitPlaceTrade } = market;
    test("market.onSubmitPlaceTrade", () => {
      expect(onSubmitPlaceTrade).toBeDefined();
      expect(typeof onSubmitPlaceTrade).toBe("function");
    });
  });
}
