import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ITEMS } from "modules/auth/constants/connect-nav";

import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";

// todo: need to update icons and get right sizes

export default class ConnectDropdown extends Component {
  static propTypes = {
    isLogged: PropTypes.bool,
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
      isLogged,
    } = this.props;
    const s = this.state;

    return (
      <div className={Styles.ConnectDropdown}>
        {ITEMS.map(item => (
          <div key={item.param} className={Styles.ConnectDropdown__item}>
            <div className={Styles.ConnectDropdown__icon}>{item.icon}</div>
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}
