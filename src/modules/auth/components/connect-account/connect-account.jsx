import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Styles from "modules/auth/components/connect-account/connect-account.styles";

export default class ConnectAccount extends Component {
  static propTypes = {
    availableEth: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      connected: false,
    };
  }

  render() {
    const {
      availableEth,
    } = this.props;
    const s = this.state;

    return (
      <div>
        Connect
      </div>
    );
  }
}
