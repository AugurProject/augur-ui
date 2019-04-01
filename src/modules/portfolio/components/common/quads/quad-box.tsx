import React, { ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import { NameValuePair } from "modules/portfolio/types";
import { SearchSort } from "modules/common-elements/search-sort";

import Styles from "modules/portfolio/components/common/quads/filter-box.styles";

export interface QuadBoxProps {
  title: string;
  showFilterSearch: Boolean;
  sortByOptions: Array<NameValuePair>;
  updateDropdown: Function;
  onSearchChange: Function;
  content?: ReactNode;
  bottomBarContent: ReactNode;
  isMobile?: Boolean;
  bottomRightBarContent?: ReactNode;
  rightContent?: ReactNode;
  sortByStyles?: Object;
}

const QuadBox = (props: QuadBoxProps) => (
  <div className={Styles.FilterBox}>
    <BoxHeader
      title={props.title}
      mostRightContent={
        (props.showFilterSearch && (
          <SearchSort
            sortByOptions={props.sortByOptions}
            options={props.sortByOptions}
            updateDropdown={props.updateDropdown}
            sortByStyles={props.sortByStyles}
            onChange={props.onSearchChange}
            isMobile={props.isMobile}
          />
        )) ||
        props.rightContent
      }
      bottomRightBarContent={props.bottomRightBarContent}
      bottomBarContent={props.bottomBarContent}
    />
    <div className={Styles.FilterBox__content}>{props.content}</div>
  </div>
);

export default QuadBox;
