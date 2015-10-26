var _ = require('lodash');
var React = require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var moment = require('moment');
var Paginate = require('react-paginate');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var Link = Router.Link;

var AddMarketModal =  require('./AddMarketModal')
var Markets = require('./Markets');

var constants = require('../libs/constants');

var Branch = React.createClass({

  // assuming only one branch and all markets in store are of that branch
  mixins: [FluxMixin, StoreWatchMixin('market', 'search', 'branch', 'config'), Navigation],

  getInitialState: function() {
    return {
      addMarketModalOpen: false,
      marketsPerPage: constants.MARKETS_PER_PAGE,
      visiblePages: 3,
      showMatures: false, 
      toggleIcon: "fa fa-toggle-off",
      toggleInfo: "Swap Between Open and Closed Markets with this Button",
      pageNum: this.props.params.page ? this.props.params.page - 1 : 0
    };
  },

  getStateFromFlux: function () {
    var flux = this.getFlux();
    var marketState = flux.store('market').getState();
    var searchState = flux.store('search').getState();
    var currentBranch = flux.store('branch').getCurrentBranch();
    var account = flux.store('config').getAccount();

    return {
      searchKeywords: searchState.keywords,
      markets: searchState.results,
      pendingMarkets: marketState.pendingMarkets,
      currentBranch: currentBranch,
      account: account
    }
  },
toggleMatures: function(event) {

  //All the magic that swaps the icons the toggle state
  if (!this.state.showMatures) {
    this.setState({ toggleIcon: 'fa fa-toggle-on' , toggleInfo: 'Mature Mkts', showMatures: true });
    window.flux.actions.market.mMarkets = true;
  } 
  else {
    this.setState({ toggleIcon: 'fa fa-toggle-off', toggleInfo: 'Open Mkts', showMatures: false });
    window.flux.actions.market.mMarkets = false;
  }
  window.flux.actions.market.loadMarketCache();
  console.log("Swapped the Open Markets for the Matured Markets");
  
  },
  
  toggleAddMarketModal: function(event) {

    this.setState({ addMarketModalOpen: !this.state.addMarketModalOpen });
  },

  handlePageChanged: function (data) {

    this.transitionTo('/markets/' + (parseInt(data.selected) + 1));
    this.setState({ pageNum: data.selected });
  },

  onChangeSearchInput: function (event) {
    this.setState({ searchKeywords: event.target.value });
    this.debounceSearchInput(event.target.value);
  },
  
  debounceSearchInput: _.debounce(function (val) {
    this.handlePageChanged({ selected: 0 });
    this.getFlux().actions.search.updateKeywords(val);    
  }, 500),
  
  render: function () {

    var start = 0 + (this.state.pageNum) * this.state.marketsPerPage;
    var total = _.size(this.state.markets);
    var end = start + this.state.marketsPerPage;
    end = end > total ? total : end;
    //var marketPage = _.sortBy(this.state.markets, 'volume').reverse().slice(start, end);
    var marketPage = _.map(this.state.markets).slice(start, end);
    var submitMarketAction = (
      <span className="subheading pull-right">
        <a href="javascript:void(0);" onClick={ this.toggleAddMarketModal }>Submit a Market</a>
      </span>
    );
    if (!this.state.account) { 
      submitMarketAction = <span />;
    }

    var pendingMarkets = _.map(this.state.pendingMarkets);
    var pendingMarketsSection = <span />;
    if (this.state.pendingMarkets) {
      pendingMarketsSection = (
        <div className='pendingMarkets row'>
          <Markets 
            markets={ pendingMarkets }
            currentBranch={ this.state.currentBranch }
            classNameWrapper='col-sm-4' />
        </div>
      );
    }

    return (
      <div id="branch">
        { pendingMarketsSection }
        <h3 className="clearfix">Markets <a href="javascript:void(0);" onClick={ this.toggleMatures } ><i className= { this.state.toggleIcon } title = {this.state.toggleInfo} /></a>{ submitMarketAction }</h3>
            
				<input type="search"
					className="markets-search-input"
					value={ this.state.searchKeywords }
					placeholder="Search"
					tabIndex="0"
					onChange={ this.onChangeSearchInput } />
    					
        <div className='subheading clearfix'>
          <span className='showing'>Showing { start+1 } - { end } of { total }</span>
          <Paginate 
            previousLabel={ <i className='fa fa-chevron-left'></i> }
            nextLabel={ <i className='fa fa-chevron-right'></i> }
            breakLabel={ <li className="break"><a href="">...</a></li> }
            pageNum={ total / this.state.marketsPerPage }
            marginPagesDisplayed={ 2 }
            pageRangeDisplayed={ 5 }
            forceSelected={ this.state.pageNum }
            clickCallback={ this.handlePageChanged }
            containerClassName={ 'paginator' }
            subContainerClassName={ 'pages' }
            activeClass={ 'active' } 
          />
        </div>
        <div className='markets row'>
          <Markets 
            markets={ marketPage }
            currentBranch={ this.state.currentBranch }
            classNameWrapper='col-sm-4' />
        </div>

        <AddMarketModal show={ this.state.addMarketModalOpen } onHide={ this.toggleAddMarketModal } />
      </div>
    );
  }
});

module.exports = Branch;
