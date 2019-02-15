import React, { Component, ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/box-header";
import { SquareDropdown } from "modules/common-elements/dropdown";
import Input from "modules/common/components/input/input";
import Styles from "modules/portfolio/components/common/portfolio-box.styles";
import { find } from "lodash";
import {
  ALL_MARKETS,
  MARKET_OPEN,
  MARKET_REPORTING,
  MARKET_CLOSED
} from "modules/common-elements/constants";
import { SwitchLabelsGroup } from "modules/common-elements/switch-labels-group";

export interface NameValuePair {
  label: string;
  value: string;
  comp: Function;
}

export interface Market {
  marketId: string,
  description: string
}

export interface MarketsByReportingState {
  [type: string]: Array<Market>;
}

export interface FilterBoxProps {
  title: string,
  rows?: ReactNode,
  bottomBarContent?: ReactNode
  sortByOptions: Array<NameValuePair>;
  filteredMarkets: Array<Market>;
  markets: MarketsByReportingState;
  updateFilteredMarkets: Function;
  filterComp: Function;
  showFilterSearch?: Boolean;
  bottomTabs?: Boolean;
}

interface FilterBoxState {
  search: string,
  sortBy: string,
  selectedTab: string,
}

let tabs = [
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
    selectedTab: tabs[0].key,
    sortBy: this.props.sortByOptions && this.props.sortByOptions[0].value,
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

  applySearch = (input: string, markets: Array<Market>) => {
    const { filterComp } = this.props;
    let { search, sortBy, selectedTab } = this.state;

    markets = markets.filter(filterComp.bind(this, input));
    markets = this.applySortBy(sortBy, markets);

    return markets;
  }

  applySortBy = (value: string, markets: Array<Market>) => {
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
      bottomTabs,
      markets
    } = this.props;

    const { search, selectedTab } = this.state;

    tabs.forEach(tab => 
      tab.num = markets && markets[tab.key].length
    );

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
                options={sortByOptions}
                onChange={this.updateSortBy}
              />
            </div>
          }  
          bottomBarContent={bottomTabs &&
            <SwitchLabelsGroup tabs={tabs} selectedTab={selectedTab} selectTab={this.selectTab}/>
          } 
         />
        <div className={Styles.PortfolioBox__content}>
          {rows}
        </div>
      </div>
    )
  }
}