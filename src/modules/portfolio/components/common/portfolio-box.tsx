import React, { Component, ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/box-header";
import { SquareDropdown } from "modules/common-elements/dropdown";
import Input from "modules/common/components/input/input";
import Styles from "modules/portfolio/components/common/portfolio-box.styles";
import { find } from "lodash";
import {
  ALL_MARKETS,
  OPEN_MARKETS,
  IN_REPORTING_MARKETS,
  RESOLVED_MARKETS
} from "modules/common-elements/constants";

export interface NameValuePair {
  label: string;
  value: string;
  comp: Function;
}

export interface MarketsByReportingState {
  [type: string]: Array<any>;
}

export interface PortfolioBoxProps {
  title: string,
  rows?: ReactNode,
  bottomBarContent?: ReactNode
  sortByOptions: Array<NameValuePair>;
  filteredMarkets: Array<any>;
  markets: MarketsByReportingState;
  updateFilteredMarkets: Function;
  filterComp: Function;
  showFilterSearch: Boolean;
  bottomTabs: Boolean;
}

interface PortfolioBoxState {
  search: string,
  sortBy: string,
  selectedTab: string,
}

const tabs = [
  {
    key: ALL_MARKETS,
    label: 'all'
  },
  {
    key: OPEN_MARKETS,
    label: 'open'
  },
  {
    key: IN_REPORTING_MARKETS,
    label: 'in reporting'
  },
  {
    key: RESOLVED_MARKETS,
    label: 'resolved'
  }
];

export default class PortfolioBox extends React.Component<PortfolioBoxProps, PortfolioBoxState>  {
  state: PortfolioBoxState = {
    search: '',
    selectedTab: tabs[0].key,
    sortBy: this.props.sortByOptions && this.props.sortByOptions[0].value
  };

  updateSortBy = (value: string) => {
    this.setState({sortBy: value});

    let { filteredMarkets } = this.props;
    filteredMarkets = this.applySortBy(value, filteredMarkets);

    this.props.updateFilteredMarkets(filteredMarkets);
  }

  onSearchChange = (input: string) => {
    this.setState({search: input});

    const { markets } = this.props;
    let { selectedTab, search } = this.state;
    
    if (input === search) return;

    let tabMarkets =  markets[selectedTab];
    const filteredMarkets = this.applySearch(input, tabMarkets);

    this.props.updateFilteredMarkets(filteredMarkets);
  }

  selectTab = (tab: string) => {
    this.setState({selectedTab: tab})

    const { markets } = this.props;
    let marketsFiltered = this.applySearch(this.state.search, markets[tab]);
    marketsFiltered = this.applySortBy(this.state.sortBy, marketsFiltered);
    
    this.props.updateFilteredMarkets(marketsFiltered);
  }

  applySearch = (input: string, markets: Array<any>) => {
    const { filterComp } = this.props;
    let { search, sortBy, selectedTab } = this.state;

    markets = markets.filter(filterComp.bind(this, input));
    markets = this.applySortBy(sortBy, markets);

    return markets;
  }

  applySortBy = (value: string, markets: Array<any>) => {
    const valueObj = find(this.props.sortByOptions, { value: value });

    markets = markets.sort(valueObj.comp);

    return markets;
  }

  render() {
    const {
      title,
      bottomBarContent,
      rows,
      sortByOptions,
      showFilterSearch,
      bottomTabs
    } = this.props;

    const { search, selectedTab } = this.state;

    return (
      <div className={Styles.PortfolioBox}>
        <BoxHeader 
          title={title} 
          rightContent={showFilterSearch &&
            <div style={{ display: 'flex', maxHeight: '30px'}}>
              <Input
                isSearch
                isClearable
                noFocus
                placeholder={'Search'}
                value={search}
                onChange={this.onSearchChange}
              />
              <SquareDropdown
                defaultValue={sortByOptions[0].value}
                options={sortByOptions}
                onChange={this.updateSortBy}
              />
            </div>
          }  
          bottomBarContent={ bottomTabs &&
            <div style={{display: 'flex'}}>
              {tabs.map(tab => (
                <div style={{color: (selectedTab === tab.key ? 'red' : 'white')}} onClick={() => {this.selectTab(tab.key)}}>{tab.label}</div>
              ))}
            </div>
          } 
         />
        <div className={Styles.PortfolioBox__content}>
          {rows}
        </div>
      </div>
    )
  }
}