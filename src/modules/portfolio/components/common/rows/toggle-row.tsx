import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ChevronFlip from "modules/common/components/chevron-flip/chevron-flip";

import Styles from "modules/portfolio/components/common/rows/toggle-row.styles";


export interface ToggleRowProps {
  rowContent: ReactNode,
  toggleContent: ReactNode,
  style?: Object,
  className?: string,
  expandedClassName?: string,
}

interface ToggleRowState {
  open: Boolean,
}

export default class ToggleRow extends React.Component<ToggleRowProps, ToggleRowState>  {
  state: ToggleRowState = {
    open: false,
  };

  toggleRow = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { rowContent, toggleContent, className, expandedClassName } = this.props;
    const { open } = this.state;

    return (
      <div 
        className={
          classNames(
            className, 
            Styles.ToggleRow, {
              [Styles.ToggleRow__active]: open, 
              [`${expandedClassName}`]: open
            }
          )
        }
       >
        <div onClick={this.toggleRow}>
          <div className={Styles.ToggleRow__rowContent}>{rowContent}</div>
          <span className={Styles.ToggleRow__arrowContainer}>
            <ChevronFlip
              containerClassName={Styles.ToggleRow__arrow}
              pointDown={!open}
              stroke="#fff"
              quick
            />
          </span>
        </div>
        {open && 
          <div>
            {toggleContent}
          </div>
        }
      </div>
    )
  }
}