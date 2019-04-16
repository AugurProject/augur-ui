import React, { ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import { NameValuePair } from "modules/portfolio/types";
import { SearchSort } from "modules/common-elements/search-sort";
import { SquareDropdown } from "modules/common-elements/selection";

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
  switchHeaders?: Boolean;
  noBackgroundBottom?: Boolean;
}

const QuadBox = (props: QuadBoxProps) => {
  const boxHeader = (
    <BoxHeader
      title={props.title}
      switchHeaders={props.switchHeaders}
      rightContent={
        (props.showFilterSearch && (
          <SearchSort
            sortByOptions={!props.switchHeaders && props.sortByOptions}
            updateDropdown={props.updateDropdown}
            sortByStyles={props.sortByStyles}
            onChange={props.onSearchChange}
            isMobile={props.isMobile}
          />
        )) ||
        props.rightContent
      }
      mostRightContent={
        props.switchHeaders && (
          <SquareDropdown
            options={props.sortByOptions}
            onChange={props.updateDropdown}
            stretchOut={props.isMobile}
            sortByStyles={props.sortByStyles}
          />
        )
      }
      bottomRightBarContent={props.bottomRightBarContent}
      bottomBarContent={props.bottomBarContent}
      noBackgroundBottom={props.noBackgroundBottom}
    />
  );

  return (
    <div className={Styles.FilterBox}>
      {!props.isMobile && boxHeader}
      <div className={Styles.FilterBox__content}>
        <div className={Styles.FilterBox__container}>
          {props.isMobile && boxHeader}
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default QuadBox;
