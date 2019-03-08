import React, { Component } from "react";
import classNames from "classnames";

import Styles from "modules/portfolio/components/common/headers/data-table-header.styles";
import SharedStyles from "modules/portfolio/components/common/rows/open-order.styles";

interface OpenOrdersHeaderProps { 
}

const OpenOrdersHeader = (props: OpenOrdersHeaderProps) => (
  <ul className={classNames(Styles.DataTableHeader)}>
    <li>Outcome</li>
    <li>Type</li>
    <li>Quantity</li>
    <li>Price</li>
    <li />
  </ul>
)

export default OpenOrdersHeader;