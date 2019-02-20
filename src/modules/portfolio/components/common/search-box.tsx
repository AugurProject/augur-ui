import React, { Component, ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/box-header";
import { SquareDropdown } from "modules/common-elements/dropdown";
import Input from "modules/common/components/input/input";
import Styles from "modules/portfolio/components/common/filter-box.styles";
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

export interface Tab {
  key: string,
  label: string,
  num: number
}

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

// todo: need to do initial filter/search of the same parameters, see when searching for ""
export default class FilterSwitchBox extends React.Component<FilterBoxProps, FilterBoxState>  {
  state: FilterBoxState = {
    search: '',
  };

  componentWillReceiveProps(nextProps: FilterBoxProps) {
    if (nextProps.data !== this.props.data) {
      const data = this.applySearch(this.state.search, nextProps.data);
      this.props.updateFilteredData(data);
    }
  }

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
      <div className={Styles.FilterBox}>
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
                onChange={this.updateView}
              />
            </div>
          }  
          bottomBarContent={<div/>} 
         />
        <div className={Styles.FilterBox__content}>
          {rows}
        </div>
      </div>
    )
  }
}