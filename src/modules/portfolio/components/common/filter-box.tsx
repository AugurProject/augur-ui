import React, { Component, ReactNode } from "react";

import { find } from "lodash";
import {
  ALL_MARKETS,
  MARKET_OPEN,
  MARKET_REPORTING,
  MARKET_CLOSED
} from "modules/common-elements/constants";
import QuadBox from "modules/portfolio/components/common/quad-box";
import { SwitchLabelsGroup } from "modules/common-elements/switch-labels-group";
import { NameValuePair, Market, Tab} from "modules/portfolio/constants";

export interface MarketsByReportingState {
  [type: string]: Array<Market>;
}

export interface FilterBoxProps {
  title: string;
  rows?: ReactNode;
  bottomBarContent?: ReactNode;
  sortByOptions: Array<NameValuePair>;
  filteredData: Array<Market>;
  data: MarketsByReportingState;
  updateFilteredData: Function; 
  filterComp: Function;
  showFilterSearch?: Boolean;
  bottomTabs?: Boolean;
}

interface FilterBoxState {
  search: string,
  sortBy: string,
  selectedTab: string,
  tabs: Array<Tab>,
}

let tabsInfo = [
  {
    key: ALL_MARKETS,
    label: 'All',
    num: 0
  },
  {
    key: MARKET_OPEN,
    label: 'Open',
    num: 0
  },
  {
    key: MARKET_REPORTING,
    label: 'In Reporting',
    num: 0

  },
  {
    key: MARKET_CLOSED,
    label: 'Resolved',
    num: 0
  }
];

export default class FilterBox extends React.Component<FilterBoxProps, FilterBoxState>  {
  state: FilterBoxState = {
    search: '',
    selectedTab: tabsInfo[0].key,
    tabs: tabsInfo,
    sortBy: this.props.sortByOptions && this.props.sortByOptions[0].value,
  };

  componentWillReceiveProps(nextProps: FilterBoxProps) {
    if (nextProps.data !== this.props.data) {        
      this.calculateTabNums(nextProps.data, this.state.search);
    }
  }

  calculateTabNums = (data: MarketsByReportingState, input: string) => {
   const { filterComp } = this.props;
   const { tabs } = this.state;

   for (var i = 0; i < tabs.length; i++) {
      const length = data[tabs[i].key].filter(filterComp.bind(this, input)).length;
      tabs[i].num = length
    }

    this.setState({tabs: tabs});
  }

  updateSortBy = (value: string) => {
    this.setState({sortBy: value});

    let { filteredData } = this.props;
    filteredData = this.applySortBy(value, filteredData);

    this.props.updateFilteredData(filteredData);
  }

  onSearchChange = (input: string) => {
    this.setState({search: input});

    const { data } = this.props;
    let { selectedTab, search } = this.state;
    let tabData =  data[selectedTab];
    const filteredData = this.applySearch(input, tabData);

    this.props.updateFilteredData(filteredData);
  }

  selectTab = (tab: string) => {
    this.setState({selectedTab: tab})

    const { data } = this.props;
    let dataFiltered = this.applySearch(this.state.search, data[tab]);
    dataFiltered = this.applySortBy(this.state.sortBy, dataFiltered);
    
    this.props.updateFilteredData(dataFiltered, tab);
  }

  applySearch = (input: string, filteredData: Array<Market>) => {
    const { filterComp, data } = this.props;
    let { search, sortBy, selectedTab, tabs } = this.state;

    filteredData = filteredData.filter(filterComp.bind(this, input));
    filteredData = this.applySortBy(sortBy, filteredData);

    this.calculateTabNums(data, input);

    return filteredData;
  }

  applySortBy = (value: string, data: Array<Market>) => {
    const valueObj = find(this.props.sortByOptions, { value: value });

    data = data.sort(valueObj.comp);

    return data;
  }

  render() {
    const {
      title,
      bottomBarContent,
      rows,
      sortByOptions,
      showFilterSearch,
      bottomTabs,
      data,
      updateFilteredData,
      filterComp
    } = this.props;

    const { search, selectedTab, tabs } = this.state;


    return (
      <QuadBox
        title={title}
        showFilterSearch={showFilterSearch}
        onSearchChange={this.onSearchChange}
        sortByOptions={sortByOptions}
        updateDropdown={this.updateSortBy}
        bottomBarContent={bottomTabs && <SwitchLabelsGroup tabs={tabs} selectedTab={selectedTab} selectTab={this.selectTab}/>}
        rows={rows}
        search={search}
      />
    )
  }
}