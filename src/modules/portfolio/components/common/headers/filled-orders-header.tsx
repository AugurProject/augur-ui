import React, { Component } from "react";
import classNames from "classnames";

import Styles from "modules/portfolio/components/common/headers/data-table-header.styles";
import SharedStyles from "modules/portfolio/components/common/rows/open-order.styles";

interface FilledOrdersHeaderProps { 
  extendedView?: boolean;
}

const FilledOrdersHeader = (props: FilledOrdersHeaderProps) => (
 <ul
    className={classNames(
      Styles.DataTableHeader,
      Styles.FilledOrdersHeader,
      {
        [Styles.DataTableHeader__extended]: props.extendedView,
        [Styles.FilledOrdersHeader__extended]: props.extendedView
      })}
  >
    <li>Outcome</li>
    <li>Type</li>
    {!props.extendedView && <li>Quantity</li>}
    <li>
      Quantity 
      <br />
      Filled
    </li>
    <li>Price</li>
    <li>Fill Date</li>
    <li>
      No. of<br/>Fills
    </li>
  </ul>
);

export default FilledOrdersHeader;

