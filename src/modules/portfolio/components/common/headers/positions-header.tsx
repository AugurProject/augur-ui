import React, { Component } from "react";
import classNames from "classnames";

import { CompactButton } from "modules/common-elements/buttons";
// import { EthIcon, PercentIcon } from "modules/common/components/icons";

import Styles from "modules/portfolio/components/common/headers/data-table-header.styles";
import SharedStyles from "modules/portfolio/components/common/rows/open-order.styles";

interface PositionsHeaderProps {
  showPercent: Boolean; 
  updateShowPercent: Function;
}

const PositionsHeader = (props: PositionsHeaderProps) => (
 <ul
    className={classNames(
      SharedStyles.Order,
      Styles.DataTableHeader,
      SharedStyles.Position,
      Styles.PositionHeader
    )}
  >
    <li>Outcome</li>
    <li>Type</li>
    <li>Quantity</li>
    <li>Average<br />Price</li>
    <li>Total<br />Cost</li>
    <li>
      Current
      <br />
      Value
    </li>
    <li>
      Last
      <br />
      Price
    </li>
    <li>
      <span>
        Total
        <br />
        Returns
      </span>
      <CompactButton
        text={props.showPercent ? "eth" : "%"}
        action={props.updateShowPercent}
      />
    </li>

  </ul>
);

export default PositionsHeader;

