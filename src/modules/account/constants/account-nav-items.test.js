import { ACCOUNT_NAV_ITEMS } from "modules/account/constants/account-nav-items";

import {
  ACCOUNT_DEPOSIT,
  ACCOUNT_TRANSFER
} from "modules/routes/constants/views";

describe("modules/account/constants/account-nav-items.js", () => {
  test("should return the expected constants", () => {
    expect(ACCOUNT_NAV_ITEMS).toStrictEqual({
      [ACCOUNT_DEPOSIT]: {
        label: "Deposit"
      },
      [ACCOUNT_TRANSFER]: {
        label: "Transfer"
      }
    });
  });
});
