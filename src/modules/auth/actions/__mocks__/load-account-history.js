const mockLoadAccountHistoryModule = jest.genMockFromModule(
  "modules/auth/actions/load-account-history.js"
);

mockLoadAccountHistoryModule.loadAccountHistory = () => {};
mockLoadAccountHistoryModule.mockLoadAccountHistory = () => {};
mockLoadAccountHistoryModule.setLoadAccountHistory = f => {
  mockLoadAccountHistoryModule.loadAccountHistory = f;
};

module.exports = mockLoadAccountHistoryModule;
