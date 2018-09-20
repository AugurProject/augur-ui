import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import toggleHeight from "utils/toggle-height/toggle-height";
import {
  ITEMS,
  WALLET_TYPE,
  PARAMS,
  ERROR_TYPES
} from "modules/auth/constants/connect-nav";
import { errorIcon } from "modules/common/components/icons";

import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";

export default class ErrorContainer extends Component {
  static propTypes = {
    error: PropTypes.object,
    connect: PropTypes.func.isRequired,
    param: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      errorShown: false
    };

    this.hideError = this.hideError.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.error !== nextProps.error && nextProps.isSelected && nextProps.error) {
      this.showError()
    } else if (this.props.isSelected !== nextProps.isSelected && !nextProps.isSelected) {
      this.hideError()
    } else if (!nextProps.error && this.state.errorShown) {
      this.hideError()
    }
  }

  showError() {
    this.setState({ errorShown: true}, () => {
      toggleHeight(this.refs["error_" + this.props.param], false, () => {});
    });
  }

  hideError() {
    this.setState({ errorShown: false }, () => {
      toggleHeight(this.refs["error_" + this.props.param], true, () => {});
    });
  }

  render() {
    const {
      param,
      error,
      connect
    } = this.props;
    return (
      <div
        ref={"error_" + param}
        className={classNames(
          Styles.ConnectDropdown__hardwareContent,
          ToggleHeightStyles["toggle-height-target"]
        )}
      >
        <div className={classNames(Styles.ConnectDropdown__content)}>
          <div className={Styles.ErrorContainer__header}>
            <div className={Styles.ErrorContainer__headerIcon}>
              {error && errorIcon}
            </div>
            {error && error.header}
          </div>
          <div className={Styles.ErrorContainer__subheader}>
            {error === ERROR_TYPES.UNABLE_TO_CONNECT && (
              <div className={Styles.ErrorContainer__words}>
                Please install the MetaMask browser plug-in from{" "}
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.ErrorContainer__link}
                >
                  Metamask.io
                </a>
              </div>
            )}
            {error !== ERROR_TYPES.UNABLE_TO_CONNECT &&
              error &&
              error.subheader}
            {error === ERROR_TYPES.NOT_SIGNED_IN &&
              <div
                className={Styles.ConnectDropdown__retryContainer}
              >
                <button
                  className={Styles.ConnectDropdown__retryButton}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    connect(PARAMS.METAMASK);
                  }}
                >
                  Retry
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}