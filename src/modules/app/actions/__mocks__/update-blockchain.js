const mockUpdateBlockchain = jest.genMockFromModule("augur.js");

mockUpdateBlockchain.updateBlockchain = data => ({
  type: "UPDATE_BLOCKCHAIN",
  data
});

module.exports = mockUpdateBlockchain;
