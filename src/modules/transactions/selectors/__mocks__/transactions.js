const mockTransactions = jest.genMockFromModule(
  "modules/transactions/selectors/transactions.js"
);

mockTransactions.selectTransactions = state => state.transactions;

module.exports = mockTransactions;
