/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { twoArrows } from "modules/common/components/icons";
import { DashlineLong } from "modules/common/components/dashline/dashline";

import Styles from "modules/trading/components/trading-outcomes-dropdown/trading-outcomes-dropdown.styles";

class TradingOutcomesDropdown extends Component {
  constructor(props) {
    super(props);

    const defaultOption =
      props.options.find(option => option.value === props.default) || false;

    this.state = {
      label: (defaultOption && defaultOption.label) || props.options[0].label,
      value: (defaultOption && defaultOption.value) || props.options[0].value,
      showList: false
    };

    this.dropdownSelect = this.dropdownSelect.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.handleWindowOnClick = this.handleWindowOnClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.handleWindowOnClick);
  }

  componentWillUpdate(nextProps) {
    if (this.props.default !== nextProps.default) {
      this.setDefaultValue(nextProps.default, nextProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowOnClick);
  }

  setDefaultValue(defaultValue, props) {
    const defaultOption =
      props.options.find(option => option.value === defaultValue) || false;

    this.setState({
      label: !defaultOption
        ? defaultValue
        : (defaultOption && defaultOption.label) || props.options[0].label,
      value: !defaultOption
        ? ""
        : (defaultOption && defaultOption.value) || props.options[0].value
    });
  }

  dropdownSelect(label, value) {
    const { onChange } = this.props;
    if (value !== this.state.value) {
      this.setState({
        label,
        value
      });
      onChange(value);
      this.toggleList();
    }
  }

  toggleList() {
    if (this.props.isMobile) {
      return this.props.showSelectOutcome(true);
    }
    this.setState({ showList: !this.state.showList });
  }

  handleWindowOnClick(event) {
    if (this.refDropdown && !this.refDropdown.contains(event.target)) {
      this.setState({ showList: false });
    }
  }

  render() {
    const { options, alignLeft } = this.props;
    return (
      <section className={Styles.TradingOutcomesDropdown__sect}>
        <div
          className={classNames(Styles.TradingOutcomesDropdown, {
            [`${Styles.active}`]: this.state.showList
          })}
          ref={dropdown => {
            this.refDropdown = dropdown;
          }}
          onClick={this.toggleList}
        >
          <div className={Styles.TradingOutcomesDropdown__label}>
            {this.state.label}
          </div>
          <span>{twoArrows}</span>
          <span>
            <DashlineLong />
          </span>
        </div>
        <div
          className={classNames(
            Styles.TradingOutcomesDropdown__list,
            { [Styles.TradingOutcomesDropdown__listLeft]: alignLeft },
            { [`${Styles.active}`]: this.state.showList }
          )}
        >
          {options.map(option => (
            <button
              className={classNames({
                [`${Styles.active}`]: option.value === this.state.value
              })}
              key={option.value}
              value={option.value}
              onClick={() => this.dropdownSelect(option.label, option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

TradingOutcomesDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  default: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  alignLeft: PropTypes.bool,
  isMobile: PropTypes.bool,
  showSelectOutcome: PropTypes.func.isRequired
};

TradingOutcomesDropdown.defaultProps = {
  alignLeft: false,
  isMobile: false
};

export default TradingOutcomesDropdown;
