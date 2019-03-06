import React, { ReactNode } from "react";

import BoxHeaderMobile from "modules/portfolio/components/common/headers/box-header--mobile";
import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import { SquareDropdown } from "modules/common-elements/selection";
import { SearchBar } from "modules/common-elements/search";
import { NameValuePair, Market, Tab} from "modules/portfolio/types";

import Styles from "modules/portfolio/components/common/quads/filter-box.styles";

export interface QuadBoxProps {
  title: string,
  showFilterSearch: Boolean,
  search: string,
  sortByOptions:  Array<NameValuePair>,
  updateDropdown: Function,
  onSearchChange: Function,
  rows?: ReactNode,
  bottomBarContent: ReactNode,
  label?: string,
  isMobile?: Boolean,
  bottomRightBarContent?: ReactNode,
}

const QuadBox = (props: QuadBoxProps) => (
  <div className={Styles.FilterBox}>
    <BoxHeader 
      title={props.title}
      isMobile={props.isMobile}
      mostRightContent={props.sortByOptions && 
        <SquareDropdown
          options={props.sortByOptions}
          onChange={props.updateDropdown}
          stretchOut={props.isMobile}
        />
       }
      rightContent={props.showFilterSearch &&
        <SearchBar onChange={props.onSearchChange} label={props.label}/>
      }  
      bottomRightBarContent={props.bottomRightBarContent}
      bottomBarContent={props.bottomBarContent} 
     />
    <div className={Styles.FilterBox__content}>
      {props.rows}
    </div>
  </div>
);

export default QuadBox;
