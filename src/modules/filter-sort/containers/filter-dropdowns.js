import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FilterDropdown from "modules/filter-sort/components/filter-dropdowns/filter-dropdowns";
import {
  updateFilterSortOptions,
  MARKET_FILTER,
  MARKET_SORT,
  MARKET_MAX_FEES,
  MARKET_MAX_SPREAD,
  PAST_CUTOFF,
  EXPERIMENTAL_INVALID,
  INSECURE_MARKETS
} from "modules/filter-sort/actions/update-filter-sort-options";

const mapStateToProps = state => ({
  defaultFilter: state.filterSortOptions.marketFilter,
  defaultSort: state.filterSortOptions.marketSort,
  defaultMaxFee: state.filterSortOptions.maxFee,
  defaultMaxSpread: state.filterSortOptions.maxSpreadPercent
});

const mapDispatchToProps = dispatch => ({
  updateFilterOption: filterOption =>
    dispatch(updateFilterSortOptions(MARKET_FILTER, filterOption)),
  updateSortOption: sortOption =>
    dispatch(updateFilterSortOptions(MARKET_SORT, sortOption)),
  updateMaxFee: maxFee =>
    dispatch(updateFilterSortOptions(MARKET_MAX_FEES, maxFee)),
  updateMaxSpread: maxSpreadPercent =>
    dispatch(updateFilterSortOptions(MARKET_MAX_SPREAD, maxSpreadPercent)),
  updateHidePostV2Markets: hidePostV2Markets =>
    dispatch(updateFilterSortOptions(PAST_CUTOFF, hidePostV2Markets)),
  updateExperimentalInvalid: experimentalInvalid =>
    dispatch(
      updateFilterSortOptions(EXPERIMENTAL_INVALID, experimentalInvalid)
    ),
  updateHideInsecureMarkets: hideInsecureMarkets =>
    dispatch(updateFilterSortOptions(INSECURE_MARKETS, hideInsecureMarkets))
});

const FilterDropdownsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterDropdown)
);

export default FilterDropdownsContainer;
