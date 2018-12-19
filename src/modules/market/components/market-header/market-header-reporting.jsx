/* eslint react/no-array-index-key: 0 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "modules/market/components/market-header/market-header-reporting.sytles";
import { constants } from "services/constants";
import MarketLink from "modules/market/components/market-link/market-link";
import MarketHeaderStyles from "modules/market/components/market-header/market-header.styles";

export default class MarketHeaderReporting extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    isMobileSmall: PropTypes.bool,
    isDesignatedReporter: PropTypes.bool,
    finalizeMarket: PropTypes.func.isRequired,
    tentativeWinner: PropTypes.object,
    location: PropTypes.object.isRequired,
    isLogged: PropTypes.bool
  };

  static defaultProps = {
    isMobileSmall: false,
    isDesignatedReporter: false,
    tentativeWinner: {},
    isLogged: false
  };

  constructor(props) {
    super(props);
    this.state = {
      disableFinalize: false
    };
  }

  render() {
    const {
      market,
      isMobileSmall,
      isDesignatedReporter,
      finalizeMarket,
      tentativeWinner,
      isLogged
    } = this.props;
    const { reportingState, id, consensus } = market;
    let content = null;
    if (consensus && consensus.winningOutcome) {
      content = [
        <div
          key="consensus"
          className={Styles.MarketHeaderReporting__winner__container}
        >
          <div>
            <span className={MarketHeaderStyles.MarketHeader__property__header}>
              Winning Outcome
            </span>
            <span>
              <div className={Styles.MarketHeaderReporting__winner}>
                {consensus.winningOutcome}
              </div>
            </span>
          </div>
          {isLogged &&
            reportingState ===
              constants.REPORTING_STATE.AWAITING_FINALIZATION && (
              <div>
                <button
                  className={Styles.MarketHeaderReporting__button}
                  onClick={() => {
                    this.setState({ disableFinalize: true });
                    finalizeMarket(id, err => {
                      if (err) {
                        this.setState({ disableFinalize: false });
                      }
                    });
                  }}
                  disabled={this.state.disableFinalize}
                >
                  Finalize
                </button>
              </div>
            )}
        </div>
      ];
    }
    return (
      <div className={Styles.MarketHeaderReporting__container}>{content}</div>
    );
  }
}
