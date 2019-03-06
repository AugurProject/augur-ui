import React, { ReactNode } from "react";

import Styles from "modules/portfolio/components/common/headers/box-header.styles";

export interface BoxHeaderProps {
  title: string,
  rightContent?: ReactNode,
  rows?: ReactNode,
  bottomBarContent?: ReactNode,
  bottomRightBarContent?: ReactNode,
  isMobile?: Boolean,
}

const BoxHeader = (props: BoxHeaderProps) => (
  <div className={Styles.BoxHeader__header}>
    
    {props.isMobile ? 
      <div>
        {props.rightContent} 
        {props.bottomBarContent}
        {props.mostRightContent}
        {props.bottomRightBarContent}
      </div>

    :
      <div>
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
            {props.bottomRightBarContent}
          </div>
        }
      </div>
    }
  </div>
);

export default BoxHeader;