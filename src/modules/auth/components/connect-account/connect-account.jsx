import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ConnectDropdown from "modules/auth/components/connect-dropdown/connect-dropdown";
import ChevronFlip from "modules/common/components/chevron-flip/chevron-flip"; 
import Styles from "modules/auth/components/connect-account/connect-account.styles";

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

    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  render() {
    const {
      availableEth,
    } = this.props;
    const s = this.state;

    return (
      <div className={Styles.ConnectAccount}>
        <div className={Styles.ConnectAccount__container} onClick={this.toggleDropdown}>
          <div className={Styles.ConnectAccount__column}>
            <div className={Styles.ConnectAccount__status}>
              <div className={Styles['ConnectAccount__status-indicator']} />
              Disconnected
            </div>
            <div className={Styles.ConnectAccount__title}>Connect A Wallet</div>
          </div>
          <div className={Styles.ConnectAccount__arrow}>
            <ChevronFlip pointDown={s.dropdownOpen} stroke="#fff" filledInIcon/>
          </div>
        </div>
        <ConnectDropdown dropdownOpen={s.dropdownOpen} />
      </div>
    );
  }
}
