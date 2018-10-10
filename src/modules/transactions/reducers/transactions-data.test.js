import testState from "test/testState";
import reducer from "modules/transactions/reducers/transactions-data";

describe(`modules/transactions/reducers/transactions-data.js`, () => {
  let action;
  let actual;

  const state = Object.assign({}, testState);

  test("updated transactions data in state", () => {
    action = {
      type: "UPDATE_TRANSACTIONS_DATA",
      data: {
        updatedTransactionsData: {
          test: {
            example: "example"
          },
          example: {
            test: "test"
          }
        }
      }
    };
    actual = {
      ...state.transactionsData,
      test: {
        example: "example",
        id: "test"
      },
      example: {
        test: "test",
        id: "example"
      }
    };

    expect(reducer(state.transactionsData, action)).toEqual(actual);
  });

  test("deleted transaction", () => {
    action = {
      type: "DELETE_TRANSACTION",
      data: { transactionId: "transaction2" }
    };
    state.transactionsData = {
      transaction1: {
        data: "data1",
        id: "transaction1"
      },
      transaction2: {
        data: "data2",
        id: "transaction2"
      }
    };

    expect(reducer(state.transactionsData, action)).toEqual({
      transaction1: {
        data: "data1",
        id: "transaction1"
      }
    });
  });

  test("if clears transactions on clear login account", () => {
    action = {
      type: "CLEAR_LOGIN_ACCOUNT"
    };

    expect(reducer(state.transactionsData, action)).toEqual({});
  });
});
