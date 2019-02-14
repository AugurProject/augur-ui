import * as React from "react";
import { head, find } from "lodash";
import classNames from "classnames";
import Styles from "modules/common-elements/dropdown.styles";
import { downChevron } from "modules/common/components/icons";

export interface NameValuePair {
  label: string;
  value: string;
}

export interface DropdownProps {
  onChange(value: string): void;
  defaultValue: string | undefined;
  options: Array<NameValuePair>;
  style: string | undefined;
}

interface DropdownState {
  selected: NameValuePair;
  showList: boolean;
  defaultStyle: string;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  refDropdown: any = null;

  state: DropdownState = {
    selected: this.props.defaultValue
      ? find(this.props.options, { value: this.props.defaultValue })
      : head(this.props.options),
    defaultStyle: this.props.style ? this.props.style : Styles.Dropdown__square,
    showList: false
  };

  componentDidMount() {
    window.addEventListener("click", this.handleWindowOnClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowOnClick);
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
    const { options } = this.props;
    const { selected, showList, defaultStyle } = this.state;
    return (
      <div
        className={defaultStyle}
        ref={dropdown => {
          this.refDropdown = dropdown;
        }}
        onClick={this.toggleList}
      >
        <button className={Styles.Dropdown__label}>{selected.label}</button>
        <div
          className={classNames(Styles.Dropdown__list, {
            [`${Styles.active}`]: showList
          })}
        >
          {options.map(option => (
            <div>
              <button
                className={classNames({
                  [`${Styles.active}`]: option.value === selected.value
                })}
                key={option.value}
                value={option.value}
                onClick={() => this.dropdownSelect(option)}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
        <select
          className={Styles.Dropdown__select}
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
        {downChevron()}
      </div>
    );
  }
}

export const SquareDropdown = (props: DropdownProps) => (
  <Dropdown
    defaultValue={props.defaultValue}
    onChange={props.onChange}
    options={props.options}
    style={Styles.Dropdown__square}
  />
);

export const RoundedDropdown = (props: DropdownProps) => (
  <Dropdown
    defaultValue={props.defaultValue}
    onChange={props.onChange}
    options={props.options}
    style={Styles.Dropdown__rounded}
  />
);
