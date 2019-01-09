import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { twoArrows } from "modules/common/components/icons";

import Styles from "modules/market/components/market-view/market-outcome-selector.styles";

export default class MarketOutcomeSelector extends Component {
  static propTypes = {
    outcome: PropTypes.any,
    outcomeName: PropTypes.string,
    selectOutcome: PropTypes.func.isRequired
  };

  static defaultProps = {
    outcome: null,
    outcomeName: ""
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { outcomeName, outcome, selectOutcome } = this.props;

    return (
      <div className={Styles.MarketOutcomeSelector} onClick={selectOutcome}>
        <div>{outcome ? outcomeName : "Select an Outcome"}</div>
        <span>{twoArrows}</span>
      </div>
    );
  }
}
