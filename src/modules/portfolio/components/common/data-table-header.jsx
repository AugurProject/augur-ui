import React, { Component } from "react";
import classNames from "classnames";

import Styles from "modules/portfolio/components/common/data-table-header.styles";
import SharedStyles from "modules/portfolio/components/common/open-order.styles";

export default class DataTableHeader extends Component {
  render() {
    return (
      <ul className={classNames(SharedStyles.Order, Styles.DataTableHeader)}>
        <li>Outcome</li>
        <li>Type</li>
        <li>Quantity</li>
        <li>Price</li>
        <li />
      </ul>
    );
  }
}
