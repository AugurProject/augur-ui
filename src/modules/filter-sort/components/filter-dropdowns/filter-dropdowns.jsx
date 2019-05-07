import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MARKET_VOLUME,
  MARKET_CREATION_TIME,
  MARKET_END_DATE,
  MARKET_RECENTLY_TRADED,
  MARKET_FEE,
  MARKET_OPEN_INTEREST
} from "modules/filter-sort/constants/market-sort-params";
import {
  MARKET_OPEN,
  MARKET_REPORTING,
  MARKET_CLOSED
} from "modules/filter-sort/constants/market-states";
import Checkbox from "src/modules/common/components/checkbox/checkbox";
import Dropdown from "modules/common/components/dropdown/dropdown";
import Styles from "modules/filter-sort/components/filter-dropdowns/filter-dropdowns.styles";
import parseQuery from "modules/routes/helpers/parse-query";
import makeQuery from "modules/routes/helpers/make-query";
import { PAGINATION_PARAM_NAME } from "modules/routes/constants/param-names";
import {
  MAX_FEE_02_PERCENT,
  MAX_FEE_05_PERCENT,
  MAX_FEE_100_PERCENT,
  MAX_FEE_10_PERCENT,
  MAX_FEE_20_PERCENT,
  MAX_FEE_30_PERCENT,
  MAX_FEE_40_PERCENT
} from "src/modules/filter-sort/constants/market-max-fees";
import {
  MAX_SPREAD_05_PERCENT,
  MAX_SPREAD_100_PERCENT,
  MAX_SPREAD_10_PERCENT,
  MAX_SPREAD_20_PERCENT
} from "src/modules/filter-sort/constants/market-max-spread";

const sortOptions = [
  { value: MARKET_CREATION_TIME, label: "Creation Time" },
  { value: MARKET_END_DATE, label: "Reporting Starts" },
  { value: MARKET_RECENTLY_TRADED, label: "Recently Traded" },
  { value: MARKET_VOLUME, label: "Volume" },
  { value: MARKET_FEE, label: "Settlement Fee" },
  { value: MARKET_OPEN_INTEREST, label: "Open Interest" }
];

const filterOptions = [
  { value: MARKET_OPEN, label: "Open" },
  { value: MARKET_REPORTING, label: "In Reporting" },
  { value: MARKET_CLOSED, label: "Resolved" }
];

const maxFeesOptions = [
  { label: "All Fees", value: MAX_FEE_100_PERCENT },
  { label: "Fees < 2%", value: MAX_FEE_02_PERCENT },
  { label: "Fees < 5%", value: MAX_FEE_05_PERCENT },
  { label: "Fees < 10%", value: MAX_FEE_10_PERCENT },
  { label: "Fees < 20%", value: MAX_FEE_20_PERCENT },
  { label: "Fees < 30%", value: MAX_FEE_30_PERCENT },
  { label: "Fees < 40%", value: MAX_FEE_40_PERCENT }
];

const maxSpreadOptions = [
  { label: "All Spreads", value: MAX_SPREAD_100_PERCENT },
  { label: "Spread < 5%", value: MAX_SPREAD_05_PERCENT },
  { label: "Spread < 10%", value: MAX_SPREAD_10_PERCENT },
  { label: "Spread < 20%", value: MAX_SPREAD_20_PERCENT }
];

export default class FilterSearch extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    maxFee: PropTypes.string.isRequired,
    maxSpreadPercent: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
    defaultFilter: PropTypes.string.isRequired,
    defaultSort: PropTypes.string.isRequired,
    defaultMaxFee: PropTypes.string.isRequired,
    defaultMaxSpread: PropTypes.string.isRequired,
    hasOrders: PropTypes.bool.isRequired,
    updateFilterOption: PropTypes.func.isRequired,
    updateSortOption: PropTypes.func.isRequired,
    updateMaxFee: PropTypes.func.isRequired,
    updateMaxSpread: PropTypes.func.isRequired,
    updateHasOpenOrders: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.changeSortDropdown = this.changeSortDropdown.bind(this);
    this.changeFilterDropdown = this.changeFilterDropdown.bind(this);
    this.changeMaxFees = this.changeMaxFees.bind(this);
    this.changeMaxSpread = this.changeMaxSpread.bind(this);
    this.goToPageOne = this.goToPageOne.bind(this);
    this.changeHasOrders = this.changeHasOrders.bind(this);
  }

  goToPageOne() {
    const { history, location } = this.props;
    let updatedSearch = parseQuery(location.search);

    delete updatedSearch[PAGINATION_PARAM_NAME];
    updatedSearch = makeQuery(updatedSearch);
    history.push({
      ...location,
      search: updatedSearch
    });
  }

  changeSortDropdown(value) {
    const {
      filter,
      updateSortOption,
      updateFilter,
      maxFee,
      maxSpreadPercent,
      hasOrders
    } = this.props;

    this.goToPageOne();
    updateSortOption(value);
    updateFilter({ filter, sort: value, maxFee, maxSpreadPercent, hasOrders });
  }

  changeFilterDropdown(value) {
    const {
      sort,
      updateFilterOption,
      updateFilter,
      maxFee,
      maxSpreadPercent,
      hasOrders
    } = this.props;

    this.goToPageOne();
    updateFilterOption(value);
    updateFilter({ filter: value, sort, maxFee, maxSpreadPercent, hasOrders });
  }

  changeMaxFees(maxFee) {
    const {
      sort,
      filter,
      updateMaxFee,
      maxSpreadPercent,
      hasOrders,
      updateFilter
    } = this.props;

    this.goToPageOne();
    updateMaxFee(maxFee);
    updateFilter({ filter, sort, maxFee, maxSpreadPercent, hasOrders });
  }

  changeMaxSpread(maxSpreadPercent) {
    const {
      sort,
      filter,
      maxFee,
      updateMaxSpread,
      hasOrders,
      updateFilter
    } = this.props;

    this.goToPageOne();
    updateMaxSpread(maxSpreadPercent);
    updateFilter({ filter, sort, maxFee, maxSpreadPercent, hasOrders });
  }

  changeHasOrders(event) {
    const {
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      updateFilter,
      hasOrders,
      updateHasOpenOrders
    } = this.props;
    const hasOpenOrders = !hasOrders;
    updateHasOpenOrders(hasOpenOrders);
    updateFilter({
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      hasOrders: hasOpenOrders
    });
  }

  render() {
    const {
      defaultFilter,
      defaultSort,
      defaultMaxFee,
      defaultMaxSpread,
      hasOrders
    } = this.props;

    return (
      <div className={Styles.FilterDropdowns__container}>
        <div className={Styles.FilterDropdowns}>
          <Dropdown
            default={defaultFilter}
            onChange={this.changeFilterDropdown}
            options={filterOptions}
            alignLeft
          />
          <Dropdown
            default={defaultSort}
            onChange={this.changeSortDropdown}
            options={sortOptions}
          />
          <Dropdown
            default={defaultMaxFee}
            onChange={this.changeMaxFees}
            options={maxFeesOptions}
          />
          <Dropdown
            default={defaultMaxSpread}
            onChange={this.changeMaxSpread}
            options={maxSpreadOptions}
          />
          <div className={Styles.FilterDropdowns__hasOrders}>
            <Checkbox
              id="has-orders"
              type="checkbox"
              name="hasOrders"
              isChecked={hasOrders}
              value={hasOrders}
              onClick={this.changeHasOrders}
            />{" "}
            <label htmlFor="has-orders">has open orders</label>
          </div>
        </div>
      </div>
    );
  }
}
