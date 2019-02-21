import React, { Component } from "react";
import classNames from "classnames";

import Styles from "modules/portfolio/components/common/headers/data-table-header.styles";
import SharedStyles from "modules/portfolio/components/common/rows/open-order.styles";

export default class FilledOrdersHeader extends Component {
  render() {
    return (
      <ul
        className={classNames(
          SharedStyles.Order,
          Styles.DataTableHeader,
          Styles.FilledOrdersHeader
        )}
      >
        <li>Outcome</li>
        <li>Type</li>
        <li>Quantity</li>
        <li>Price</li>
        <li>Fill Date</li>
        <li>
          Number
          <br />
          of Fills
        </li>
      </ul>
    );
  }
}
