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
  bottomRightBarContent?: ReactNode;
  rightContent?: ReactNode;
  sortByStyles?: Object;
  switchHeaders?: Boolean;
  noBackgroundBottom?: Boolean;
}

const QuadBox = (props: QuadBoxProps) => (
  <div className={Styles.FilterBox}>
    <div className={Styles.HideOnMobile}>
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
              isMobile={false}
            />
          )) ||
          props.rightContent
        }
        mostRightContent={
          props.switchHeaders && (
            <SquareDropdown
              options={props.sortByOptions}
              onChange={props.updateDropdown}
              stretchOutOnMobile
              sortByStyles={props.sortByStyles}
            />
          )
        }
        bottomRightBarContent={props.bottomRightBarContent}
        bottomBarContent={props.bottomBarContent}
        noBackgroundBottom={props.noBackgroundBottom}
      />
    </div>
    <div className={Styles.FilterBox__content}>
      <div className={Styles.FilterBox__container}>
        <div className={Styles.ShowOnMobile}>
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
                  isMobile
                />
              )) ||
              props.rightContent
            }
            mostRightContent={
              props.switchHeaders && (
                <SquareDropdown
                  options={props.sortByOptions}
                  onChange={props.updateDropdown}
                  stretchOutOnMobile
                  sortByStyles={props.sortByStyles}
                />
              )
            }
            bottomRightBarContent={props.bottomRightBarContent}
            bottomBarContent={props.bottomBarContent}
            noBackgroundBottom={props.noBackgroundBottom}
          />
        </div>
        {props.content}
      </div>
    </div>
  </div>
);

export default QuadBox;
