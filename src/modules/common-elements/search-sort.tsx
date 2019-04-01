import React, { ReactNode } from "react";

import { SquareDropdown } from "modules/common-elements/selection";
import { SearchBar } from "modules/common-elements/search";
import { NameValuePair } from "modules/portfolio/types";

import Styles from "modules/common-elements/search-sort.styles";

export interface SearchSortProps {
  sortByOptions: Array<NameValuePair>;
  updateDropdown: Function;
  onChange: Function;
  bottomRightBarContent?: ReactNode;
  rightContent?: ReactNode;
  sortByStyles?: Object;
  isMobile?: Boolean;
}

export interface SearchSortState {
  showPercent: boolean;
}

export class SearchSort extends React.Component<
  SearchSortProps,
  SearchSortState
> {
  state: SearchSortState = {
    showSortByOptions: true
  };

  onFocus = hide => {
    if (!this.props.isMobile) this.setState({ showSortByOptions: hide });
  };

  render() {
    const {
      sortByOptions,
      updateDropdown,
      sortByStyles,
      onChange,
      isMobile
    } = this.props;

    const { showSortByOptions } = this.state;

    return (
      <div className={Styles.SearchSort}>
        {isMobile && (
          <>
            <div className={Styles.SearchSort_searchContainer}>
              <SearchBar isMobile onFocus={this.onFocus} onChange={onChange} />
            </div>
            {sortByOptions && (
              <SquareDropdown
                options={sortByOptions}
                onChange={updateDropdown}
                stretchOut={isMobile}
                sortByStyles={sortByStyles}
              />
            )}
          </>
        )}
        {!isMobile && (
          <>
            {sortByOptions &&
              showSortByOptions && (
                <SquareDropdown
                  options={sortByOptions}
                  onChange={updateDropdown}
                  stretchOut={isMobile}
                  sortByStyles={sortByStyles}
                />
              )}
            <div className={Styles.SearchSort_searchContainer}>
              <SearchBar onFocus={this.onFocus} onChange={onChange} />
            </div>
          </>
        )}
      </div>
    );
  }
}
