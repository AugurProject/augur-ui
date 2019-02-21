import React, { ReactNode } from "react";

import Styles from "modules/portfolio/components/common/headers/box-header.styles";

export interface BoxHeaderProps {
  title: string,
  rightContent?: ReactNode,
  rows?: ReactNode,
  bottomBarContent?: ReactNode
}

const BoxHeader = (props: BoxHeaderProps) => (
  <div className={Styles.BoxHeader__header}>
    <div className={Styles['BoxHeader__header--top-row']}>
      <div className={Styles['BoxHeader__title']}>
        {props.title}
      </div>
      {props.rightContent} 
    </div>
    {props.bottomBarContent && 
      <div className={Styles['BoxHeader__header--bottom-row']}>
        {props.bottomBarContent}
      </div>
    }
  </div>
);

export default BoxHeader;
