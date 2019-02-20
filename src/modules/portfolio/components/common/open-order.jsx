import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ToggleRow from "modules/portfolio/components/common/toggle-row";

import Styles from "modules/portfolio/components/common/open-order.styles";

export default class OpenOrder extends Component {
  static propTypes = {
    openOrder: PropTypes.object.isRequired,
    className: PropTypes.string,
    toggleClassName: PropTypes.string
  };

  render() {
    const { openOrder, className, toggleClassName } = this.props;

    return (
      <ToggleRow
        className={toggleClassName}
        rowContent={
          <ul className={classNames(Styles.Order, className)}>
            <li>{openOrder.description || openOrder.name}</li>
            <li>{openOrder.type}</li>
            <li>{openOrder.unmatchedShares.formatted}</li>
            <li>{openOrder.avgPrice.formatted}</li>
            <li>cancel</li>
          </ul>
        }
        toggleContent={<div>info</div>}
      />
    );
  }
}
