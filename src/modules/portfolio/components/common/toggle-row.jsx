import React, { Component } from "react";
import PropTypes from "prop-types";

import ChevronFlip from "modules/common/components/chevron-flip/chevron-flip";

import Styles from "modules/portfolio/components/common/toggle-row.styles";

export default class ToggleRow extends Component {
  static propTypes = {
    rowContent: PropTypes.object.isRequired,
    toggleContent: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { rowContent, toggleContent, style } = this.props;
    const { open } = this.state;

    return (
      <div className={Styles.ToggleRow} style={style}>
        <div>
          <div className={Styles.ToggleRow__rowContent}>{rowContent}</div>
          <ChevronFlip
            containerClassName={Styles.ToggleRow__arrow} onClick={this.toggleRow}
            pointDown={!open}
            stroke="#fff"
            quick
          />
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