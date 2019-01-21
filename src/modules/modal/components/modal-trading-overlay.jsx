import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ModalDescription from "modules/modal/components/common/modal-description";
import ModalActions from "modules/modal/components/common/modal-actions";
import { BigNumber } from "utils/create-big-number";
import MarketTradingForm from "modules/market/components/market-trading-form/market-trading-form";
import MarketOutcomesList from "modules/market/containers/market-outcomes-list";

import Styles from "modules/modal/components/common/common.styles";

const ModalTradingOverlay = ({ closeModal, outcomes, tradingForm, market, isLogged, selectedOrderProperties,selectedOutcome,isMobile, availableFunds, clearTradeInProgress, updateSelectedOutcome, updateSelectedOrderProperties, gasPrice, handleFilledOnly }) => (
  <section className={classNames(Styles.ModalContainer, Styles.ModalContainer__full)}>
    {tradingForm &&
      <MarketTradingForm
        market={market}
        isLogged={isLogged}
        selectedOrderProperties={selectedOrderProperties}
        selectedOutcome={selectedOutcome}
        isMobile={isMobile}
        availableFunds={availableFunds}
        clearTradeInProgress={clearTradeInProgress}
        updateSelectedOutcome={updateSelectedOutcome}
        updateSelectedOrderProperties={updateSelectedOrderProperties}
        gasPrice={gasPrice}
        handleFilledOnly={handleFilledOnly}
        toggleMobileView={closeModal}
      />
    }
    {!tradingForm &&
      <MarketOutcomesList
        marketId={marketId}
        outcomes={outcomes}
        selectedOutcome={selectedOutcome}
        updateSelectedOutcome={updateSelectedOutcome}
        isMobile={isMobile}
        popUp
      /> 
    }
  </section>
);

ModalTradingOverlay.propTypes = {
  tradingForm: PropTypes.bool,
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
  outcomes: PropTypes.array,
};

ModalTradingOverlay.defaultProps = {
  tradingForm: false,
  outcomes: [],
};

export default ModalTradingOverlay;
