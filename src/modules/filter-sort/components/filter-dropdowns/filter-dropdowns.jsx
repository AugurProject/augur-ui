import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MARKET_VOLUME,
  MARKET_CREATION_TIME,
  MARKET_END_DATE,
  MARKET_RECENTLY_TRADED,
  MARKET_FEE,
  MARKET_OPEN_INTEREST,
  MARKET_LIQUIDITY_10,
  MARKET_LIQUIDITY_15,
  MARKET_LIQUIDITY_20,
  MARKET_LIQUIDITY_100
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
// import {
//   MAX_SPREAD_05_PERCENT,
//   MAX_SPREAD_100_PERCENT,
//   MAX_SPREAD_10_PERCENT,
//   MAX_SPREAD_20_PERCENT
// } from "src/modules/filter-sort/constants/market-max-spread";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import { Hint } from "modules/common/components/icons";

const sortOptions = [
  { value: MARKET_LIQUIDITY_10, label: "Liquidity, <10% Spread" },
  { value: MARKET_LIQUIDITY_15, label: "Liquidity, <15% Spread" },
  { value: MARKET_LIQUIDITY_20, label: "Liquidity, <20% Spread" },
  { value: MARKET_LIQUIDITY_100, label: "Liquidity, All Spreads" },
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

// const maxSpreadOptions = [
//   { label: "All Spreads", value: MAX_SPREAD_100_PERCENT },
//   { label: "Spread < 5%", value: MAX_SPREAD_05_PERCENT },
//   { label: "Spread < 10%", value: MAX_SPREAD_10_PERCENT },
//   { label: "Spread < 20%", value: MAX_SPREAD_20_PERCENT }
// ];

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
    // defaultMaxSpread: PropTypes.string.isRequired,
    updateMaxSpread: PropTypes.func.isRequired,
    updateFilterOption: PropTypes.func.isRequired,
    updateSortOption: PropTypes.func.isRequired,
    updateMaxFee: PropTypes.func.isRequired,
    hidePostV2Markets: PropTypes.bool.isRequired,
    updateHidePostV2Markets: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    hasPositionsInCutoffMarkets: PropTypes.bool.isRequired,
    experimentalInvalid: PropTypes.bool.isRequired,
    updateExperimentalInvalid: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.changeSortDropdown = this.changeSortDropdown.bind(this);
    this.changeFilterDropdown = this.changeFilterDropdown.bind(this);
    this.changeMaxFees = this.changeMaxFees.bind(this);
    this.changeMaxSpread = this.changeMaxSpread.bind(this);
    this.goToPageOne = this.goToPageOne.bind(this);
    this.changeHidePastCutoff = this.changeHidePastCutoff.bind(this);
    this.changeExperimentalInvalid = this.changeExperimentalInvalid.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.hasPositionsInCutoffMarkets !==
        this.props.hasPositionsInCutoffMarkets &&
      nextProps.hasPositionsInCutoffMarkets &&
      this.props.hidePostV2Markets
    ) {
      this.changeHidePastCutoff();
    }
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
      hidePostV2Markets,
      experimentalInvalid
    } = this.props;

    this.goToPageOne();
    updateSortOption(value);
    updateFilter({
      filter,
      sort: value,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets,
      experimentalInvalid
    });
  }

  changeFilterDropdown(value) {
    const {
      sort,
      updateFilterOption,
      updateFilter,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets,
      experimentalInvalid
    } = this.props;

    this.goToPageOne();
    updateFilterOption(value);
    updateFilter({
      filter: value,
      sort,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets,
      experimentalInvalid
    });
  }

  changeMaxFees(maxFee) {
    const {
      sort,
      filter,
      updateMaxFee,
      maxSpreadPercent,
      updateFilter,
      hidePostV2Markets,
      experimentalInvalid
    } = this.props;

    this.goToPageOne();
    updateMaxFee(maxFee);
    updateFilter({
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets,
      experimentalInvalid
    });
  }

  changeMaxSpread(maxSpreadPercent) {
    const {
      sort,
      filter,
      maxFee,
      updateMaxSpread,
      updateFilter,
      hidePostV2Markets,
      experimentalInvalid
    } = this.props;

    this.goToPageOne();
    updateMaxSpread(maxSpreadPercent);
    updateFilter({
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets,
      experimentalInvalid
    });
  }

  changeHidePastCutoff() {
    const {
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      updateFilter,
      hidePostV2Markets,
      updateHidePostV2Markets,
      experimentalInvalid
    } = this.props;
    updateHidePostV2Markets(!hidePostV2Markets);
    updateFilter({
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets: !hidePostV2Markets,
      experimentalInvalid
    });
  }

  changeExperimentalInvalid() {
    const {
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      updateFilter,
      hidePostV2Markets,
      updateExperimentalInvalid,
      experimentalInvalid
    } = this.props;
    updateExperimentalInvalid(!experimentalInvalid);
    updateFilter({
      filter,
      sort,
      maxFee,
      maxSpreadPercent,
      hidePostV2Markets,
      experimentalInvalid: !experimentalInvalid
    });
  }

  render() {
    const {
      defaultFilter,
      defaultSort,
      defaultMaxFee,
      hidePostV2Markets,
      experimentalInvalid
    } = this.props;

    return (
      <div className={Styles.FilterDropdowns}>
        <div>
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
        </div>
        <div className={Styles.FilterDropdowns__checkboxes}>
          <div>
            <Checkbox
              id="post-cutoff"
              type="checkbox"
              name="hidePostV2Markets"
              isChecked={hidePostV2Markets}
              value={hidePostV2Markets}
              onClick={this.changeHidePastCutoff}
            />{" "}
            <label htmlFor="post-cutoff">
              hide markets ending post v2 cut-off
            </label>
          </div>
          <div>
            <Checkbox
              id="experimental-invalid"
              type="checkbox"
              name="experimentalInvalid"
              isChecked={experimentalInvalid}
              value={experimentalInvalid}
              onClick={this.changeExperimentalInvalid}
            />{" "}
            <label htmlFor="experimental-invalid">
              Experimental Invalid Filter
            </label>
            <label
              className={TooltipStyles.TooltipHint}
              data-tip
              data-for="tooltip--invalid"
            >
              {Hint}
              <ReactTooltip
                id="tooltip--invalid"
                className={TooltipStyles.Tooltip}
                effect="solid"
                place="right"
                type="light"
              >
                <p>
                  Any Market where the current best bid/offer would profit as a
                  result of a market resolving as invalid, will be filtered out,
                  if checked.
                </p>
              </ReactTooltip>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
