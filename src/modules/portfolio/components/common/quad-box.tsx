import React, { ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/box-header";
import { SquareDropdown } from "modules/common-elements/dropdown";
import Input from "modules/common/components/input/input";
import Styles from "modules/portfolio/components/common/filter-box.styles";
import { NameValuePair, Market, Tab} from "modules/portfolio/constants";

export interface QuadBoxProps {
  title: string,
  showFilterSearch: Boolean,
  search: string,
  sortByOptions:  Array<NameValuePair>,
  updateDropdown: Function,
  onSearchChange: Function,
  rows?: ReactNode,
  bottomBarContent: ReactNode
}

const QuadBox = (props: QuadBoxProps) => (
  <div className={Styles.FilterBox}>
    <BoxHeader 
      title={props.title} 
      rightContent={props.showFilterSearch &&
        <div style={{ display: 'flex', maxHeight: '30px'}}>
          <Input
            isSearch
            isClearable
            noFocus
            placeholder={'Search'}
            value={props.search}
            onChange={props.onSearchChange}
          />
          <SquareDropdown
            options={props.sortByOptions}
            onChange={props.updateDropdown}
          />
        </div>
      }  
      bottomBarContent={props.bottomBarContent} 
     />
    <div className={Styles.FilterBox__content}>
      {props.rows}
    </div>
  </div>
);

export default QuadBox;
