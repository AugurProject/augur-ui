import React, { ReactNode } from "react";

import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import { NameValuePair, Market } from "modules/portfolio/types";

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
  label: string;
  noSwitch?: Boolean;
}

interface FilterBoxState {
  search: string,
}

export default class FilterSwitchBox extends React.Component<FilterBoxProps, FilterBoxState>  {
  state: FilterBoxState = {
    search: '',
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.length !== this.props.data.length) {
      const filteredData = this.applySearch(nextState.search, nextProps.data);
      this.props.updateFilteredData(filteredData);
    }
  }

  onSearchChange = (input: string) => {
    this.setState({search: input});

    const { data } = this.props;
    const filteredData = this.applySearch(input, data);

    this.props.updateFilteredData(filteredData);
  }

  applySearch = (input: string, filteredData: Array<Market>) => {
    const { filterComp } = this.props;

    return filteredData.filter(filterComp.bind(this, input));
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
      data,
      label,
      noSwitch,
      isMobile
    } = this.props;

    const { search } = this.state;

    return (
      <QuadBox
        title={title}
        showFilterSearch={showFilterSearch}
        search={search}
        onSearchChange={this.onSearchChange}
        sortByOptions={sortByOptions}
        updateDropdown={!noSwitch && this.updateView}
        bottomBarContent={bottomBarContent}
        rows={rows}
        isMobile={isMobile}
        label={data.length + " " + label}
      />
    )
  }
}