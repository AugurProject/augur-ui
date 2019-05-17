import React, { Component } from "react";
import PropTypes from "prop-types";

import Styles from "modules/modal/components/common/common.styles";

import ModalActions from "modules/modal/components/common/modal-actions";
import Checkbox from "src/modules/common/components/checkbox/checkbox";
import { MY_POSITIONS } from "modules/routes/constants/views";
import {
  CUTOFF_READABLE,
  CUTOFF_URL
} from "modules/markets/constants/cutoff-date";
import makePath from "modules/routes/helpers/make-path";

export default class ModalMarketsV2Alert extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    markModalAsSeen: PropTypes.func.isRequired,
    markModalAsUnSeen: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    markets: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      didCheck: false
    };

    this.checkCheckbox = this.checkCheckbox.bind(this);
  }

  checkCheckbox() {
    const { account } = this.props;
    this.setState({ didCheck: !this.state.didCheck }, () => {
      if (this.state.didCheck) {
        this.props.markModalAsSeen(account);
      } else {
        this.props.markModalAsUnSeen(account);
      }
    });
  }

  render() {
    const { closeModal, markets } = this.props;

    const { didCheck } = this.state;
    const marketsRows = markets.map(market => (
      <div key={market.id}>{market.description}</div>
    ));

    return (
      <section className={Styles.ModalMarketsV2Alert}>
        <h1>Alert</h1>
        <div className={Styles.ModalMarketsV2Alert__Header}>
          <p>
            You have open orders and/or positions on markets that expire after
            the cutoff date for the Augur v2 release phase. Markets ending after{" "}
            {CUTOFF_READABLE} are at a higher risk of resolving incorrectly.{" "}
            <a href={CUTOFF_URL} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </p>

          <p>You may be at risk in the following markets:</p>
        </div>

        <div className={Styles.ModalMarketsV2Alert__Markets}>{marketsRows}</div>

        <div className={Styles.ModalMarketsV2Alert__Warning}>
          <p>
            Users are advised to consider closing any positions and cancelling
            any open orders in these markets (unless such orders would decrease
            their current exposure).
          </p>
        </div>

        <div
          className={Styles.ModalMarketReview__checkbox}
          role="button"
          tabIndex="0"
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
            Don’t show this message anymore
          </label>
        </div>

        <div className={Styles.ModalMarketReview__ActionButtons}>
          <ModalActions
            buttons={[
              {
                label: "close",
                type: "gray",
                action: () => {
                  closeModal();
                }
              }
            ]}
          />
          <ModalActions
            buttons={[
              {
                label: "view portfolio",
                type: "purple",
                action: () => {
                  this.props.history.push(makePath(MY_POSITIONS));
                }
              }
            ]}
          />
        </div>
      </section>
    );
  }
}
