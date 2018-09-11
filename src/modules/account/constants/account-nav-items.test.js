import { ACCOUNT_NAV_ITEMS } from "modules/account/constants/account-nav-items";

import {
  ACCOUNT_DEPOSIT,
  ACCOUNT_TRANSFER
} from "modules/routes/constants/views";

describe("modules/account/constants/account-nav-items.js", () => {
  const runTest = t => test(t.description, () => t.assertions());

  runTest({
    description: "should return the expected constants",
    assertions: () => {
      const expected = {
        [ACCOUNT_DEPOSIT]: {
          label: "Deposit"
        },
        [ACCOUNT_TRANSFER]: {
          label: "Transfer"
        }
      };
      expect(ACCOUNT_NAV_ITEMS).toStrictEqual(expected);
    }
  });
});
