import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import getValue from "utils/get-value";
import MarketOutcomeTradingIndicator from "modules/market/containers/market-outcome-trading-indicator";
import Styles from "modules/market/components/market-outcomes-categorical/market-outcomes-categorical.styles";

const CategoricalOutcome = ({ className, outcome, lastTradeStatus }) => (
  <div className={className || Styles.MarketOutcomesCategorical__outcome}>
    <span className={Styles["MarketOutcomesCategorical__outcome-name"]}>
      {outcome.name}
    </span>
    <span className={Styles["MarketOutcomesCategorical__outcome-value"]}>
      {getValue(outcome, "lastPricePercent.full")}
    </span>
    <span className={Styles["MarketOutcomesCategorical__outcome-value"]}>
      {lastTradeStatus}
    </span>
    <MarketOutcomeTradingIndicator
      outcome={outcome}
      style={{
        top: "0.0125rem",
        bottom: "1rem",
        right: "0",
        width: "0.325rem"
      }}
    />
  </div>
);

class MarketOutcomesCategorical extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outcomeWrapperHeight: 0,
      isOpen: false
    };

    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    const outcomeWrapperHeight = this.state.isOpen
      ? 0
      : `${this.outcomeTable.clientHeight}px`;

    this.setState({
      outcomeWrapperHeight,
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { outcomes } = this.props;
    const totalOutcomes = outcomes.length;

    const displayShowMore = totalOutcomes > 3;
    const showMoreText = this.state.isOpen
      ? `- ${totalOutcomes - 3} less`
      : `+ ${totalOutcomes - 3} more`;

    const outcomeWrapperStyle = {
      minHeight: this.state.outcomeWrapperHeight
    };

    return (
      <div
        className={Styles.MarketOutcomesCategorical}
        style={outcomeWrapperStyle}
      >
        {outcomes.length > 0 && (
          <CategoricalOutcome
            className={Styles["MarketOutcomesCategorical__height-sentinel"]}
            outcome={outcomes[0]}
          />
        )}
        <div
          className={classNames(
            Styles["MarketOutcomesCategorical__outcomes-container"],
            {
              [`${Styles["show-more"]}`]: displayShowMore
            }
          )}
        >
          {displayShowMore && (
            <button
              className={Styles["MarketOutcomesCategorical__show-more"]}
              onClick={this.showMore}
            >
              {showMoreText}
            </button>
          )}
          <div
            ref={outcomeTable => {
              this.outcomeTable = outcomeTable;
            }}
            className={Styles.MarketOutcomesCategorical__outcomes}
          >
            {outcomes.length > 0 &&
              outcomes.map(outcome => (
                <CategoricalOutcome key={outcome.id} outcome={outcome} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

MarketOutcomesCategorical.propTypes = {
  outcomes: PropTypes.array.isRequired
};

CategoricalOutcome.propTypes = {
  outcome: PropTypes.object.isRequired,
  className: PropTypes.string,
  lastTradeStatus: PropTypes.string
};

export default MarketOutcomesCategorical;
