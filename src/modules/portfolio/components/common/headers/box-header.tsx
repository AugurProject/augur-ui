import React, { ReactNode } from "react";
import classNames from "classnames";

import Styles from "modules/portfolio/components/common/headers/box-header.styles";

export interface BoxHeaderProps {
  title: string;
  rightContent?: ReactNode;
  rows?: ReactNode;
  bottomBarContent?: ReactNode;
  bottomRightBarContent?: ReactNode;
  switchHeaders?: boolean;
}

const BoxHeader = (props: BoxHeaderProps) => (
  <>
    <div
      className={classNames(
        Styles.BoxHeader__headerContainer,
        Styles.ShowOnMobile
      )}
    >
      <div className={Styles["BoxHeader__rightContent--mobile"]}>
        {props.rightContent}
      </div>
      {props.switchHeaders && (
        <>
          <div className={Styles["BoxHeader__bottomContent--mobile"]}>
            {props.bottomBarContent}
          </div>
          <div className={Styles["BoxHeader__mostRightContent--mobile"]}>
            {props.mostRightContent}
          </div>
        </>
      )}
      {!props.switchHeaders && (
        <>
          <div className={Styles["BoxHeader__bottomContent--mobile"]}>
            {props.bottomBarContent}
          </div>
          <div className={Styles["BoxHeader__mostRightContent--mobile"]}>
            {props.mostRightContent}
          </div>
        </>
      )}
      {props.bottomRightBarContent && (
        <div className={Styles["BoxHeader__bottomRightContent--mobile"]}>
          {props.bottomRightBarContent}
        </div>
      )}
    </div>
    <div className={Styles.HideOnMobile}>
      <div className={Styles["BoxHeader__header--top-row"]}>
        <div className={Styles.BoxHeader__title}>{props.title}</div>
        <div className={Styles.BoxHeader__right}>
          {props.rightContent}
          {props.mostRightContent}
        </div>
      </div>
      {props.bottomBarContent && (
        <div className={Styles["BoxHeader__header--bottom-row"]}>
          {props.bottomBarContent}
          {props.bottomRightBarContent}
        </div>
      )}
    </div>
  </>
);

export default BoxHeader;
