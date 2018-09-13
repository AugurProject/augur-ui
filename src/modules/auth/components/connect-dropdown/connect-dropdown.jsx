import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";

export default class ConnectAccount extends Component {
  static propTypes = {
    availableEth: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      dropdownOpen: false,
    };
  }

  render() {
    const {
      availableEth,
    } = this.props;
    const s = this.state;

    return (
      <div className={Styles.ConnectDropdown}>
          dropdown
      </div>
    );
  }
}
