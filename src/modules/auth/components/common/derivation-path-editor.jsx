import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "modules/auth/components/connect-dropdown/connect-dropdown.styles";
import FormStyles from "modules/common/less/form";
import { DEFAULT_DERIVATION_PATH } from "modules/auth/helpers/derivation-path";

export default class DerivationPathEditor extends Component {
  static propTypes = {
    validatePath: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDefaultPath: true,
      customPath: ""
    };

    this.selectDerivationPath = this.selectDerivationPath.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.setPath = this.setPath.bind(this);
  }

  setPath(value) {
    this.setState({ customPath: value });
    this.props.validatePath(value);
  }

  selectDerivationPath(value) {
    this.setState({ selectedDefaultPath: value });
    if (!value && this.state.customPath !== "") {
      this.props.validatePath(this.state.customPath);
    } else if (value) {
      this.props.validatePath(DEFAULT_DERIVATION_PATH);
    }
    if (!value) {
      this.focusTextInput();
    } else {
      this.derivationInput.blur();
    }
  }

  focusTextInput() {
    this.derivationInput.focus();
  }

  render() {
    const s = this.state;

    return (
      <section className={Styles.DerivationPathEditor}>
        <div className={Styles.DerivationPathEditor__title}>
          Derivation Path
        </div>
        <div className={Styles.DerivationPathEditor__row}>
          <ul
            className={classNames(
              FormStyles["Form__radio-buttons--per-line"],
              Styles.DerivationPathEditor__radioButtons
            )}
          >
            <li>
              <button
                className={classNames({
                  [`${FormStyles.active}`]: s.selectedDefaultPath
                })}
                onClick={() => this.selectDerivationPath(true)}
              >
                <span className={Styles.DerivationPathEditor__path}>
                  {DEFAULT_DERIVATION_PATH}
                </span>
                <span className={Styles.DerivationPathEditor__pathDetails}>
                  (default)
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className={Styles.DerivationPathEditor__row}>
          <ul
            className={classNames(
              FormStyles["Form__radio-buttons--per-line"],
              Styles.DerivationPathEditor__radioButtons,
              Styles.DerivationPathEditor__radioButtonsInput
            )}
          >
            <li>
              <button
                className={classNames({
                  [`${FormStyles.active}`]: !s.selectedDefaultPath
                })}
                onClick={() => this.selectDerivationPath(false)}
              >
                <span
                  className={classNames(
                    Styles.DerivationPathEditor__path,
                    Styles.DerivationPathEditor__pathInputContainer
                  )}
                >
                  <input
                    className={Styles.DerivationPathEditor__pathInput}
                    type="text"
                    ref={derivationInput => {
                      this.derivationInput = derivationInput;
                    }}
                    value={s.customPath}
                    placeholder={DEFAULT_DERIVATION_PATH}
                    onChange={e => this.setPath(e.target.value)}
                  />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
