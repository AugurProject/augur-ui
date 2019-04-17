import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { loadAccountHistory } from "modules/auth/actions/load-account-history";
import { loadCreateMarketHistory } from "modules/markets/actions/load-create-market-history";
import { loadReportingHistory } from "modules/reports/actions/load-reporting-history";

jest.mock("modules/positions/actions/load-account-trades");
jest.mock("modules/markets/actions/load-create-market-history");
jest.mock("modules/reports/actions/load-reporting-history");

describe(`modules/auth/actions/load-account-history.js`, () => {
  const mockStore = configureMockStore([thunk]);
  let store;
  const ACTIONS = {
    LOAD_ACCOUNT_TRADES: "LOAD_ACCOUNT_TRADES",
    LOAD_CREATE_MARKET_HISTORY: "LOAD_CREATE_MARKET_HISTORY",
    LOAD_REPORTING_HISTORY: "LOAD_REPORTING_HISTORY",
    UPDATE_APP_STATUS: "UPDATE_APP_STATUS",
    CLEAR_TRANSACTION_DATA: "CLEAR_TRANSACTION_DATA"
  };
  const TRANSACTIONS_LOADING = "transactionsLoading";

  beforeEach(() => {
    loadCreateMarketHistory.mockImplementation(() => ({
      type: ACTIONS.LOAD_CREATE_MARKET_HISTORY
    }));

    loadReportingHistory.mockImplementation(() => ({
      type: ACTIONS.LOAD_REPORTING_HISTORY
    }));

    store = mockStore({
      loginAccount: {
        address: "0xb0b"
      }
    });
  });

  test("get actions for running through", () => {
    store.dispatch(loadAccountHistory());
    const actual = store.getActions();
    const expected = [
      {
        data: {
          statusKey: TRANSACTIONS_LOADING,
          value: true
        },
        type: ACTIONS.UPDATE_APP_STATUS
      },
      {
        type: ACTIONS.CLEAR_TRANSACTION_DATA
      },
      {
        type: ACTIONS.LOAD_ACCOUNT_TRADES
      },
      {
        type: ACTIONS.LOAD_CREATE_MARKET_HISTORY
      },
      {
        type: ACTIONS.LOAD_REPORTING_HISTORY
      }
    ];

    expect(actual).toEqual(expected);
  });
});
