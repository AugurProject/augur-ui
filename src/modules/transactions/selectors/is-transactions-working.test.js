import { selectIsWorking } from "modules/transactions/selectors/is-transactions-working";
import {
  PENDING,
  SUCCESS,
  INTERRUPTED
} from "modules/transactions/constants/statuses";
import * as mockStore from "test/mockStore";
import isTransactionsWorkingAssertions from "assertions/is-transactions-working";

describe(`modules/transactions/selectors/is-transaction-working.js`, () => {
  let actual;

  const { state } = mockStore.default;

  test("should check if a transaction is working", () => {
    let { transactionsData } = state;
    actual = selectIsWorking({ transactionsData });
    expect(selectIsWorking({ transactionsData })).toBe(false);

    transactionsData = {
      testtransaction12345: {
        id: "testtransaction12345",
        status: SUCCESS
      }
    };
    actual = selectIsWorking({ transactionsData });
    expect(actual).toBe(false);

    transactionsData = {
      testtransaction12345: {
        id: "testtransaction12345",
        status: PENDING
      }
    };
    actual = selectIsWorking({ transactionsData });
    expect(actual).toBe(false);

    transactionsData = {
      testtransaction12345: {
        id: "testtransaction12345",
        status: INTERRUPTED
      }
    };
    actual = selectIsWorking({ transactionsData });
    expect(actual).toBe(false);

    transactionsData = {
      testtransaction12345: {
        id: "testtransaction12345",
        status: "test"
      }
    };
    actual = selectIsWorking({ transactionsData });
    isTransactionsWorkingAssertions(actual);
    expect(actual).toBe(true);
  });
});
