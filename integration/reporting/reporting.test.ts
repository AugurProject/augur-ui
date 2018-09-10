"use strict";

import "jest-environment-puppeteer";
import Flash from "../helpers/flash";
import { IFlash, IMarket } from "../types/types";
import {
  toDefaultView,
  clickToReporting,
  clickFromReportingToInitialReport
} from "../helpers/navigation-helper";
import {
  createCategoricalMarket,
  createScalarMarket,
  createYesNoMarket
} from "../helpers/create-markets";
import { UnlockedAccounts } from "../constants/accounts";
import { waitNextBlock } from "../helpers/wait-new-block";
require("../helpers/beforeAll");

const timeoutMilliseconds = 10000;

jest.setTimeout(100000);

let flash: IFlash = new Flash();

describe("Categorical Initial Report", () => {
  beforeAll(async () => {
    await toDefaultView();
  });

  afterAll(async () => {
    flash.dispose();
  });

  beforeEach(async () => {
    await waitNextBlock(2);
    clickToReporting(timeoutMilliseconds);

    const market: IMarket = await createCategoricalMarket(4);
    await waitNextBlock(20);

    await flash.setMarketEndTime(market.id);
    await waitNextBlock(5);
    await flash.pushDays(1); // put market in designated reporting state
    await waitNextBlock(2);

    clickFromReportingToInitialReport(market.description, timeoutMilliseconds);
    await waitNextBlock(10);
  });

  it("report on outcome_1", async () => {
    await expect(page).toClick("button", {
      text: "outcome_1",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on outcome_2", async () => {
    await expect(page).toClick("button", {
      text: "outcome_2",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on outcome_3", async () => {
    await expect(page).toClick("button", {
      text: "outcome_3",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on outcome_4", async () => {
    await expect(page).toClick("button", {
      text: "outcome_4",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on Invalid", async () => {
    await expect(page).toClick("button", {
      text: "Market is invalid",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review"
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });
});

describe("Categorical Open Report", () => {
  beforeAll(async () => {
    await toDefaultView();
    await waitNextBlock(2);
  });

  afterAll(async () => {
    flash.dispose();
  });

  beforeEach(async () => {
    await waitNextBlock(2);
    clickToReporting(timeoutMilliseconds);

    await page.evaluate(
      account => window.integrationHelpers.updateAccountAddress(account),
      UnlockedAccounts.CONTRACT_OWNER
    );
    await waitNextBlock(2);

    const market: IMarket = await createCategoricalMarket(4);
    await waitNextBlock(20);

    await flash.setMarketEndTime(market.id);
    await waitNextBlock(5);
    await flash.pushDays(5); // put market in open reporting state
    await waitNextBlock(2);

    await page.evaluate(
      account => window.integrationHelpers.updateAccountAddress(account),
      UnlockedAccounts.SECONDARY_ACCOUNT
    );
    await waitNextBlock(2);

    clickFromReportingToInitialReport(market.description, timeoutMilliseconds);
    await waitNextBlock(10);
  });

  it("report on outcome_1", async () => {
    await expect(page).toClick("button", {
      text: "outcome_1",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on outcome_2", async () => {
    await expect(page).toClick("button", {
      text: "outcome_2",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on outcome_3", async () => {
    await expect(page).toClick("button", {
      text: "outcome_3",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on outcome_4", async () => {
    await expect(page).toClick("button", {
      text: "outcome_4",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on Invalid", async () => {
    await expect(page).toClick("button", {
      text: "Market is invalid",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });
});

describe("YesNo Initial Report", () => {
  beforeAll(async () => {
    await toDefaultView();
  });

  afterAll(async () => {
    flash.dispose();
  });

  beforeEach(async () => {
    await waitNextBlock(2);
    clickToReporting(timeoutMilliseconds);

    const market: IMarket = await createYesNoMarket();
    await waitNextBlock(20);

    await flash.setMarketEndTime(market.id);
    await waitNextBlock(5);
    await flash.pushDays(1); // put market in designated reporting state
    await waitNextBlock(2);

    clickFromReportingToInitialReport(market.description, timeoutMilliseconds);
    await waitNextBlock(10);
   });

  it("report on yes", async () => {
    await expect(page).toClick("button", {
      text: "Yes",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on No", async () => {
    await expect(page).toClick("button", {
      text: "No",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on Invalid", async () => {
    await expect(page).toClick("button", {
      text: "Market is invalid",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });
});

describe("YesNo Open Report", () => {
  beforeAll(async () => {
    await toDefaultView();
  });

  afterAll(async () => {
    flash.dispose();
  });

  beforeEach(async () => {
    await page.evaluate(
      account => window.integrationHelpers.updateAccountAddress(account),
      UnlockedAccounts.CONTRACT_OWNER
    );
    await waitNextBlock(2);

    const market: IMarket = await createYesNoMarket();
    await waitNextBlock(20);

    await page.evaluate(
      account => window.integrationHelpers.updateAccountAddress(account),
      UnlockedAccounts.SECONDARY_ACCOUNT
    );

    clickToReporting(timeoutMilliseconds);

    await flash.setMarketEndTime(market.id);
    await waitNextBlock(5);
    await flash.pushDays(5); // put market in open reporting state
    await waitNextBlock(2);

    clickFromReportingToInitialReport(market.description, timeoutMilliseconds);
    await waitNextBlock(10);
  });

  it("report on yes", async () => {
    await expect(page).toClick("button", {
      text: "Yes",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on No", async () => {
    await expect(page).toClick("button", {
      text: "No",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on Invalid", async () => {
    await expect(page).toClick("button", {
      text: "Market is invalid",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });
});

describe("Scalar Initial Report", () => {
  beforeAll(async () => {
    await toDefaultView();
  });

  afterAll(async () => {
    flash.dispose();
  });

  beforeEach(async () => {
    await waitNextBlock(2);
    clickToReporting(timeoutMilliseconds);

    const market: IMarket = await createScalarMarket();
    await waitNextBlock(20);

    await flash.setMarketEndTime(market.id);
    await waitNextBlock(5);
    await flash.pushDays(1); // put market in designated reporting state
    await waitNextBlock(2);

    clickFromReportingToInitialReport(market.description, timeoutMilliseconds);
    await waitNextBlock(10);
  });

  it("report on 10", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "10", {
      timeout: timeoutMilliseconds
    });
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on 0", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "0");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on -10", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "-10");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on 5.01", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "5.01");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on -5.01", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "-5.01");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on Invalid", async () => {
    await expect(page).toClick("button", {
      text: "Market is invalid",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });
});

describe("Scalar Open Report", () => {
  beforeAll(async () => {
    await toDefaultView();
  });

  afterAll(async () => {
    flash.dispose();
  });

  beforeEach(async () => {
    await waitNextBlock(2);
    clickToReporting(timeoutMilliseconds);

    await page.evaluate(
      account => window.integrationHelpers.updateAccountAddress(account),
      UnlockedAccounts.CONTRACT_OWNER
    );
    await waitNextBlock(2);

    const market: IMarket = await createScalarMarket();
    await waitNextBlock(20);

    await page.evaluate(
      account => window.integrationHelpers.updateAccountAddress(account),
      UnlockedAccounts.SECONDARY_ACCOUNT
    );

    await flash.setMarketEndTime(market.id);
    await waitNextBlock(5);
    await flash.pushDays(5); // put market in open reporting state
    await waitNextBlock(2);

    clickFromReportingToInitialReport(market.description, timeoutMilliseconds);
    await waitNextBlock(10);
  });

  it("report on 10", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "10");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on 0", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "0");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on -10", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "-10");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on 5.01", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "5.01");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on -5.01", async () => {
    await expect(page).toFill("#sr__input--outcome-scalar", "-5.01");
    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });

  it("report on Invalid", async () => {
    await expect(page).toClick("button", {
      text: "Market is invalid",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Review",
      timeout: timeoutMilliseconds
    });

    await expect(page).toClick("button", {
      text: "Submit",
      timeout: timeoutMilliseconds
    });
  });
});
