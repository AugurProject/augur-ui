import * as React from "react";
import classNames from "classnames";
import Styles from "modules/common-elements/search.styles";
import { SearchIcon } from "modules/common-elements/icons";

export interface SearchBarProps {
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export interface SearchBarState {
  isFocused: boolean;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  refContainer: any = null;
  refSearch: any = null;

  state: SearchBarState = {
    isFocused: false
  };

  componentDidMount() {
    window.addEventListener("click", this.handleWindowOnClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowOnClick);
  }

  handleWindowOnClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.refContainer && !this.refContainer.contains(event.target)) {
      this.setState({ isFocused: false });
    } else if (this.refContainer && this.refContainer.contains(event.target)) {
      this.setState({ isFocused: true });
      this.refSearch.focus();
    }
  };

  render() {
    const { label, onChange, placeholder } = this.props;
    const placeholderText = placeholder || "Search";
    return (
      <div
        className={classNames(Styles.SearchBar,{
          [Styles.isFocused]: this.state.isFocused
        })}
        ref={container => {
          this.refContainer = container;
        }}
      >
      <span>{`(${label && label.length ? label : placeholderText})`}</span>
      {SearchIcon}
      <input
        ref={search => {
          this.refSearch = search;
        }}
        type="search"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderText}
      />
      </div>
    );
  }
}
