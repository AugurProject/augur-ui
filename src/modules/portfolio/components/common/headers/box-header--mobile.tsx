import React, { ReactNode } from "react";

import Styles from "modules/portfolio/components/common/headers/box-header--mobile.styles";

export interface BoxHeaderMobileProps {
  rightContent?: ReactNode,
  rows?: ReactNode,
  bottomBarContent?: ReactNode,
  isMobile?: Boolean,
}

const BoxHeaderMobile = (props: BoxHeaderMobileProps) => (
  <div className={Styles.BoxHeader__header}>
    <div className={Styles['BoxHeader__header--top-row']}>
      {props.rightContent} 
    </div>
    {props.bottomBarContent && 
      <div className={Styles['BoxHeader__header--bottom-row']}>
        {props.bottomBarContent}
      </div>
    }
  </div>
);

export default BoxHeaderMobile;