import { selectReportingCycle } from "modules/universe/selectors/reporting-cycle";
import { augur } from "services/augurjs";

jest.mock("services/augurjs");

describe(`modules/universe/selectors/reporting-cycle.js`, () => {
  test("Reporting cycle is 51% complete", () => {
    const state = {
      blockchain: {
        currentBlockTimestamp: 123456789
      },
      universe: {
        reportingPeriodDurationInSeconds: 100
      }
    };

    jest.spyOn(augur.reporting, "getCurrentPeriodProgress").mockReturnValue(51);

    const result = selectReportingCycle(state);
    expect(result).toEqual({
      currentReportingPeriodPercentComplete: 51,
      reportingCycleTimeRemaining: "in a minute"
    });
  });

  test("Reporting cycle is 0% complete", () => {
    const state = {
      blockchain: {
        currentBlockTimestamp: 123456789
      },
      universe: {
        reportingPeriodDurationInSeconds: 2678400
      }
    };

    jest.spyOn(augur.reporting, "getCurrentPeriodProgress").mockReturnValue(0);

    const result = selectReportingCycle(state);

    expect(result).toEqual({
      currentReportingPeriodPercentComplete: 0,
      reportingCycleTimeRemaining: "in a month"
    });
  });

  test("Reporting cycle is 100% complete", () => {
    const state = {
      blockchain: {
        currentBlockTimestamp: 123456789
      },
      universe: {
        reportingPeriodDurationInSeconds: 100
      }
    };

    jest
      .spyOn(augur.reporting, "getCurrentPeriodProgress")
      .mockReturnValue(100);

    const result = selectReportingCycle(state);
    expect(result).toEqual({
      currentReportingPeriodPercentComplete: 100,
      reportingCycleTimeRemaining: "a few seconds ago"
    });
  });
});
