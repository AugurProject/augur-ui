import React, { ReactNode } from "react";

import BoxHeader from "modules/portfolio/components/common/box-header";

import Styles from "modules/portfolio/components/common/portfolio-box.styles";

export interface PortfolioBoxProps {
  title: string,
  rightContent?: ReactNode,
  rows?: ReactNode,
  bottomBarContent?: ReactNode
}

const PortfolioBox = (props: PortfolioBoxProps) => (
  <div className={Styles.PortfolioBox}>
    <BoxHeader title={props.title} rightContent={props.rightContent} bottomBarContent={props.bottomBarContent} />
    <div className={Styles.PortfolioBox__content}>
      {props.rows}
    </div>
  </div>
);

export default PortfolioBox;
