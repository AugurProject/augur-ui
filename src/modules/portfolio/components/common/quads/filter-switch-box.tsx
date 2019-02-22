import React, { Component, ReactNode } from "react";

import { find } from "lodash";
import {
  ALL_MARKETS,
  MARKET_OPEN,
  MARKET_REPORTING,
  MARKET_CLOSED
} from "modules/common-elements/constants";
import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import { NameValuePair, Market, Tab} from "modules/portfolio/constants";

export interface MarketsByReportingState {
  [type: string]: Array<Market>;
}

export interface FilterBoxProps {
  title: string;
  rows?: ReactNode;
  bottomBarContent?: ReactNode;
  sortByOptions: Array<NameValuePair>;
  data: Array<Market>;
  updateFilteredData: Function; 
  filterComp: Function;
  showFilterSearch?: Boolean;
  switchView: Function;
}

interface FilterBoxState {
  search: string,
}

export default class FilterSwitchBox extends React.Component<FilterBoxProps, FilterBoxState>  {
  state: FilterBoxState = {
    search: '',
  };

  // componentWillReceiveProps(nextProps: FilterBoxProps) {
  //   if (nextProps.data !== this.props.data) {
  //     // const data = this.applySearch(this.state.search, nextProps.data);
  //     // this.props.updateFilteredData(data);
  //   }
  // }

  onSearchChange = (input: string) => {
    this.setState({search: input});

    const { data } = this.props;
    const { search } = this.state;
    const filteredData = this.applySearch(input, data);

    this.props.updateFilteredData(filteredData);
  }

  applySearch = (input: string, filteredData: Array<Market>) => {
    const { filterComp } = this.props;
    let { search } = this.state;

    filteredData = filteredData.filter(filterComp.bind(this, input));

    return filteredData;
  }

  updateView = () => {
    this.props.switchView();
  }

  render() {
    const {
      title,
      bottomBarContent,
      rows,
      sortByOptions,
      showFilterSearch,
      data
    } = this.props;

    const { search } = this.state;

    return (
      <QuadBox
        title={title}
        showFilterSearch={showFilterSearch}
        search={search}
        onSearchChange={this.onSearchChange}
        sortByOptions={sortByOptions}
        updateDropdown={this.updateView}
        bottomBarContent={bottomBarContent}
        rows={rows} 
      />
    )
  }
}