import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { BigNumber } from "utils/create-big-number";
import MarketTradingForm from "modules/market/components/market-trading-form/market-trading-form";
import MarketOutcomesList from "modules/market/containers/market-outcomes-list";
import { Close } from "modules/common/components/icons";

import Styles from "modules/modal/components/common/common.styles";

export default class ModalTradingOverlay extends Component {
  static propTypes = {
    tradingForm: PropTypes.bool,
    marketId: PropTypes.string.isRequired,
    availableFunds: PropTypes.instanceOf(BigNumber).isRequired,
    isLogged: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    market: PropTypes.object.isRequired,
    selectedOrderProperties: PropTypes.object.isRequired,
    selectedOutcome: PropTypes.string,
    updateSelectedOrderProperties: PropTypes.func.isRequired,
    handleFilledOnly: PropTypes.func.isRequired,
    gasPrice: PropTypes.number.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired,
    outcomes: PropTypes.array,
    closeModal: PropTypes.func.isRequired,
    updateTradeShares: PropTypes.func.isRequired,
    updateTradeCost: PropTypes.func.isRequired,
    showSelectOutcome: PropTypes.func.isRequired
  };

  static defaultProps = {
    tradingForm: false,
    outcomes: [],
    selectedOutcome: null
  };

  constructor(props) {
    super(props);

    this.updateSelectedOutcome = this.updateSelectedOutcome.bind(this);
  }

  updateSelectedOutcome(outcome) {
    this.props.closeModal();
    this.props.updateSelectedOutcome(outcome);
  }

  render() {
    const {
      closeModal,
      marketId,
      outcomes,
      tradingForm,
      market,
      isLogged,
      selectedOrderProperties,
      selectedOutcome,
      isMobile,
      availableFunds,
      updateSelectedOutcome,
      updateSelectedOrderProperties,
      gasPrice,
      handleFilledOnly,
      updateTradeCost,
      updateTradeShares,
      showSelectOutcome
    } = this.props;

    return (
      <section
        className={classNames(
          Styles.ModalContainer,
          Styles.ModalContainer__full
        )}
      >
        {tradingForm && (
          <MarketTradingForm
            market={market}
            isLogged={isLogged}
            selectedOrderProperties={selectedOrderProperties}
            selectedOutcome={selectedOutcome}
            isMobile={isMobile}
            availableFunds={availableFunds}
            updateSelectedOutcome={updateSelectedOutcome}
            updateSelectedOrderProperties={updateSelectedOrderProperties}
            gasPrice={gasPrice}
            handleFilledOnly={handleFilledOnly}
            toggleMobileView={closeModal}
            updateTradeCost={updateTradeCost}
            updateTradeShares={updateTradeShares}
            showSelectOutcome={showSelectOutcome}
          />
        )}
        {!tradingForm && (
          <section>
            <div className={Styles.Modal__overlayHeader}>
              <span role="button" tabIndex="-1" onClick={closeModal}>
                {Close}
              </span>
              <div>Select an Outcome</div>
            </div>
            <MarketOutcomesList
              marketId={marketId}
              outcomes={outcomes}
              selectedOutcome={selectedOutcome}
              updateSelectedOutcome={this.updateSelectedOutcome}
              isMobile={isMobile}
              popUp
            />
          </section>
        )}
      </section>
    );
  }
}
