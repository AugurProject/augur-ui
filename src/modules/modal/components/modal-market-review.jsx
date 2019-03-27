import React, { Component } from "react";
import PropTypes from "prop-types";

import Styles from "modules/modal/components/common/common.styles";

import ModalActions from "modules/modal/components/common/modal-actions";
import Checkbox from "src/modules/common/components/checkbox/checkbox";


export default class ModalMarketReview extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    markModalAsSeen: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      didCheck: false
    };

    this.checkCheckbox = this.checkCheckbox.bind(this);
  }

  checkCheckbox() {
    this.setState({ didCheck: !this.state.didCheck }, () => {
      if (this.state.didCheck) {
        this.props.markModalAsSeen();
      }
      else {
        this.props.unmarkModalAsSeen();
      }
    });
  }

  render() {
    const { closeModal, handleAction, marketDetails } = this.props;
    const { didCheck } = this.state;

    return (
      <section className={Styles.ModalMarketReview}>
        <h1>Review market details</h1>
        <div className={Styles.ModalMarketReview__Header}>
          <p>
            Review the markets details to confirm that there are <span>no conflicts</span>, in particular between the Markets Question, Additional Details and Reporting Start Time.
          </p>

          <p>
            If the reporting start time doesn’t match up to the title or description, the market might resolve as invalid.
          </p>
        </div>
        <div
          ref="containerText"
          className={Styles.ModalMarketReview__TextBox}
        >
          <div>
            <p>Market Question</p>
            {marketDetails.description}
          </div>

          { marketDetails.details && <div>
              <p>Additional details</p>
              <div>{marketDetails.details}</div>
          </div> }

          <div>
            <p>Reporting starts (UTC)</p>
            {(new Date(marketDetails.endTime.timestamp * 1000)).toUTCString()}
          </div>

          <div>
            <p>Resolution source</p>
            {marketDetails.resolutionSource ? marketDetails.resolutionSource : 'General knowledge'}
          </div>

        </div>

        <div
          className={Styles.ModalMarketReview__checkbox}
          onClick={e => {
            e.preventDefault();
            this.checkCheckbox();
          }}
        >
          <label htmlFor="marketReview">
            <Checkbox
              id="marketReview"
              type="checkbox"
              value={didCheck}
              isChecked={didCheck}
              onClick={e => {
                e.preventDefault();
                this.checkCheckbox();
              }}
            />
            Don’t show this message on any more markets
          </label>
        </div>

        <div className={Styles.ModalMarketReview__ActionButtons}>
          <ModalActions
            buttons={[
              {
                label: "Cancel",
                type: "gray",
                action: closeModal
              }
            ]}
          />
          <ModalActions
            buttons={[
              {
                label: "Confirm",
                type: "purple",
                action: handleAction
              }
            ]}
          />
        </div>
      </section>
    );
  }
}
