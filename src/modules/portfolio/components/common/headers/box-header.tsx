import React, { ReactNode } from "react";

import Styles from "modules/portfolio/components/common/headers/box-header.styles";

export interface BoxHeaderProps {
  title: string,
  rightContent?: ReactNode,
  rows?: ReactNode,
  bottomBarContent?: ReactNode,
  isMobile?: Boolean,
}

const BoxHeader = (props: BoxHeaderProps) => (
  <div className={Styles.BoxHeader__header}>
    <div className={Styles['BoxHeader__header--top-row']}>
      <div className={Styles['BoxHeader__title']}>
        {props.title}
      </div>
      <div className={Styles['BoxHeader__right']}>
        {props.rightContent} 
        {props.mostRightContent}
      </div>
    </div>
    {props.bottomBarContent && 
      <div className={Styles['BoxHeader__header--bottom-row']}>
        {props.bottomBarContent}
      </div>
    }
  </div>
);

export default BoxHeader;