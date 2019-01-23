import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TradingWrapper from "modules/trading/components/trading--wrapper/trading--wrapper";
import { isEqual } from "lodash";
import classNames from "classnames";
import { ACCOUNT_DEPOSIT } from "modules/routes/constants/views";
import { BigNumber } from "utils/create-big-number";
import { FindReact } from "utils/find-react";
import makePath from "modules/routes/helpers/make-path";
import Styles from "modules/market/components/market-trading-form/market-trading-form.styles";
import { Close } from "modules/common/components/icons";

class MarketTradingForm extends Component {
  static propTypes = {
    availableFunds: PropTypes.instanceOf(BigNumber).isRequired,
    clearTradeInProgress: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    market: PropTypes.object.isRequired,
    selectedOrderProperties: PropTypes.object.isRequired,
    selectedOutcome: PropTypes.string,
    updateSelectedOrderProperties: PropTypes.func.isRequired,
    handleFilledOnly: PropTypes.func.isRequired,
    gasPrice: PropTypes.number.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired,
    toggleMobileView: PropTypes.func.isRequired,
    updateTradeCost: PropTypes.func.isRequired,
    updateTradeShares: PropTypes.func.isRequired
  };

  static defaultProps = {
    selectedOutcome: null
  };

  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      selectedOutcome:
        props.selectedOutcome !== null && props.market.outcomes
          ? props.market.outcomes.find(
              outcome => outcome.id === props.selectedOutcome
            )
          : null
    };

    this.toggleForm = this.toggleForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { market, selectedOutcome } = this.props;
    if (
      (!isEqual(selectedOutcome, nextProps.selectedOutcome) ||
        !isEqual(market.outcomes, nextProps.market.outcomes)) &&
      (nextProps.market && nextProps.market.outcomes)
    ) {
      if (nextProps.selectedOutcome !== null) {
        this.setState({
          selectedOutcome: nextProps.market.outcomes.find(
            outcome => outcome.id === nextProps.selectedOutcome
          )
        });
      } else {
        this.setState({ selectedOutcome: null });
      }
    }
  }

  componentWillUnmount() {
    const { clearTradeInProgress, market } = this.props;
    clearTradeInProgress(market.id);
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    const {
      availableFunds,
      clearTradeInProgress,
      isLogged,
      isMobile,
      market,
      selectedOrderProperties,
      gasPrice,
      handleFilledOnly,
      updateSelectedOutcome,
      toggleMobileView,
      updateTradeCost,
      updateTradeShares
    } = this.props;
    const s = this.state;

    const hasFunds = availableFunds && availableFunds.gt(0);
    const hasSelectedOutcome = s.selectedOutcome !== null;

    let initialMessage = "";

    switch (true) {
      case !isLogged:
        initialMessage = "Connect a wallet to place an order.";
        break;
      case isLogged && !hasFunds:
        initialMessage = "Add funds to begin trading.";
        break;
      case isLogged && hasFunds && !hasSelectedOutcome:
        initialMessage = "Select an outcome to begin placing an order.";
        break;
      default:
        initialMessage = false;
    }

    return (
      <section className={classNames(Styles.MarketTradingForm)}>
        <TradingWrapper
          market={market}
          isLogged={isLogged}
          selectedOutcome={s.selectedOutcome}
          selectedOrderProperties={selectedOrderProperties}
          isMobile={isMobile}
          toggleForm={this.toggleForm}
          availableFunds={availableFunds}
          clearTradeInProgress={clearTradeInProgress}
          updateSelectedOrderProperties={
            this.props.updateSelectedOrderProperties
          }
          gasPrice={gasPrice}
          handleFilledOnly={handleFilledOnly}
          updateSelectedOutcome={updateSelectedOutcome}
          toggleMobileView={toggleMobileView}
          updateTradeCost={updateTradeCost}
          updateTradeShares={updateTradeShares}
        />
        {initialMessage && (
          <div className={Styles["MarketTradingForm__initial-message"]}>
            {isMobile && (
              <span
                role="button"
                tabIndex="-1"
                onClick={toggleMobileView}
                className={Styles.MarketTradingForm__close}
              >
                {Close}
              </span>
            )}
            {initialMessage && (
              <p>
                <span>{initialMessage}</span>
              </p>
            )}
            {!isLogged && (
              <div>
                <div>
                  <button
                    id="login-button"
                    className={Styles["MarketTradingForm__button--message"]}
                    onClick={() =>
                      FindReact(
                        document.getElementsByClassName(
                          "connect-account-styles_ConnectAccount"
                        )[0]
                      ).toggleDropdown()
                    }
                  >
                    Connect a Wallet
                  </button>
                </div>
              </div>
            )}
            {!hasFunds &&
              isLogged && (
                <Link to={makePath(ACCOUNT_DEPOSIT)}>
                  <span className={Styles["MarketTradingForm__deposit-button"]}>
                    Add Funds
                  </span>
                </Link>
              )}
          </div>
        )}
      </section>
    );
  }
}

export default MarketTradingForm;
