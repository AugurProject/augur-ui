var Fluxxor = require('fluxxor');
var constants = require('../libs/constants');

var state = {
  markets: {},
  loading: false
};

var MarketStore = Fluxxor.createStore({
  initialize: function () {
    this.bindActions(
      constants.market.LOAD_MARKETS, this.handleLoadMarkets,
      constants.market.LOAD_MARKETS_SUCCESS, this.handleLoadMarketsSuccess
    );
  },

  getState: function () {
    return state;
  },

  handleLoadMarkets: function (payload) {
    state.loading = true;
    this.emit(constants.CHANGE_EVENT);
  },

  handleLoadMarketsSuccess: function (payload) {
    state.loading = false;
    state.markets = payload.markets;
    this.emit(constants.CHANGE_EVENT);
  }
});

module.exports = MarketStore;
