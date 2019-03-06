import * as React from "react";
import { head, find } from "lodash";
import classNames from "classnames";
import Styles from "modules/common-elements/selection.styles";
import { Chevron, TwoArrows } from "modules/common-elements/icons";

export interface NameValuePair {
  label: string;
  value: string;
}

export interface DropdownProps {
  onChange(value: string): void;
  defaultValue: string | undefined;
  options: Array<NameValuePair>;
  large?: boolean;
  staticLabel?: string;
  stretchOut?: boolean;
}

interface DropdownState {
  selected: NameValuePair;
  showList: boolean;
}

interface SelectionOption {
  label: string;
  id: number;
}

interface PillSelectionProps {
  options: Array<SelectionOption>;
  onChange(value: number): void;
  defaultSelection: number;
}

interface PillSelectionState {
  selected: number;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  refDropdown: any = null;

  state: DropdownState = {
    selected: this.props.defaultValue
      ? find(this.props.options, { value: this.props.defaultValue })
      : head(this.props.options),
    showList: false
  };

  componentDidMount() {
    window.addEventListener("click", this.handleWindowOnClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowOnClick);
  }

  componentWillUpdate(nextProps: DropdownProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.dropdownSelect(
        find(this.props.options, { value: nextProps.defaultValue })
      );
    }
  }

  dropdownSelect = (selected: NameValuePair) => {
    const { onChange } = this.props;
    if (selected !== this.state.selected) {
      this.setState({
        selected
      });
      onChange(selected.value);
      this.toggleList();
    }
  };

  toggleList = () => {
    this.setState({ showList: !this.state.showList });
  };

  handleWindowOnClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.refDropdown && !this.refDropdown.contains(event.target)) {
      this.setState({ showList: false });
    }
  };

  render() {
    const { options, large, stretchOut } = this.props;
    const { selected, showList } = this.state;
    return (
      <div
        className={classNames({[Styles.Dropdown_Large]: large, [Styles.Dropdown_Normal]: !large, [Styles.Dropdown__stretchOut]: stretchOut})}
        ref={dropdown => {
          this.refDropdown = dropdown;
        }}
        onClick={this.toggleList}
      >
        <button className={Styles.Dropdown__label}>
          {selected.label} {large ? TwoArrows : Chevron}
        </button>
        <div
          className={classNames(Styles.Dropdown__list, {
            [`${Styles.active}`]: showList
          })}
        >
          {options.map(option => (
            <button
              key={option.value}
              value={option.value}
              onClick={() => this.dropdownSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <select
          onChange={e => {
            this.dropdownSelect(e.target.options[e.target.selectedIndex]);
          }}
          value={selected.value}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export const SquareDropdown = (props: DropdownProps) => (
  <Dropdown
    defaultValue={props.defaultValue}
    onChange={props.onChange}
    options={props.options}
    large={props.large}
    stretchOut={props.stretchOut}
  />
);

export class StaticLabelDropdown extends Dropdown {
  render() {
    const { options, large, staticLabel } = this.props;
    const { selected, showList } = this.state;
    return (
      <div
        className={large ? Styles.Dropdown_Large : Styles.Dropdown_Normal}
        ref={dropdown => {
          this.refDropdown = dropdown;
        }}
        onClick={this.toggleList}
      >
        <button className={Styles.Dropdown__label}>
          {staticLabel}
          &nbsp;
          <b>{selected.label}</b> {large ? TwoArrows : Chevron}
        </button>
        <div
          className={classNames(Styles.Dropdown__list, {
            [`${Styles.active}`]: showList
          })}
        >
          {options.map(option => (
            <button
              key={option.value}
              value={option.value}
              onClick={() => this.dropdownSelect(option)}
            >
              {staticLabel}
              &nbsp;
              <b>{option.label}</b>
            </button>
          ))}
        </div>
        <select
          onChange={e => {
            this.dropdownSelect(e.target.options[e.target.selectedIndex]);
          }}
          value={selected.value}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export class PillSelection extends React.Component<
  PillSelectionProps,
  PillSelectionState
> {
  state: PillSelectionState = {
    selected: this.props.defaultSelection || 0
  };

  buttonSelect = (option: SelectionOption) => {
    const { onChange } = this.props;
    if (option.id !== this.state.selected) {
      this.setState({
        selected: option.id
      });
      onChange(option.id);
    }
  };

  renderButton = (option: SelectionOption): React.ReactNode => (
    <li
      className={classNames({
        [Styles.Selected]: this.state.selected === option.id
      })}
      key={option.label}
    >
      <button onClick={() => this.buttonSelect(option)}>
        {option.label}
      </button>
    </li>
  );

  render() {
    const { options } = this.props;
    return (
      <ul className={Styles.PillSelection}>
        {options.map(
          (option: SelectionOption): React.ReactNode =>
            this.renderButton(option)
        )}
      </ul>
    );
  }
}
