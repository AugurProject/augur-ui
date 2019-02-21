import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ToggleRow from "modules/portfolio/components/common/toggle-row";

import Styles from "modules/portfolio/components/common/open-order.styles";

export default class FilledOrder extends Component {
  static propTypes = {
    filledOrder: PropTypes.object.isRequired,
    className: PropTypes.string,
    toggleClassName: PropTypes.string
  };

  render() {
    const { filledOrder, className, toggleClassName } = this.props;
    return (
      <ToggleRow
        className={toggleClassName}
        rowContent={
          <ul className={classNames(Styles.Order, className)}>
            <li>{filledOrder.outcome}</li>
            <li>{filledOrder.type}</li>
          </ul>
        }
        toggleContent={<div>info</div>}
      />
    );
  }
}
