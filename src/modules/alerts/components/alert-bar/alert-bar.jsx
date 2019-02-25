import React from "react";
import PropTypes from "prop-types";

import makePath from "modules/routes/helpers/make-path";
import Styles from "modules/alerts/components/alert-bar/alert-bar.styles";
import { CloseWithCircle } from "src/modules/common/components/icons";
import { Link } from "react-router-dom";
import { MY_POSITIONS } from "modules/routes/constants/views";

const numberToWords = require("number-to-words");

export const AlertBar = ({
  dismissFn,
  alerts,
  market,
  marketsNumber,
  isMobileSmall
}) =>
  alerts.map(alert => (
    <div key={alert.orderId} className={Styles.alertBar}>
      <div className={Styles.alertBar__row}>
        <div className={Styles.alertBar_textContainer}>
          <span className={Styles.alertBar_text}>
            {!market
              ? `You have ${numberToWords.toWords(
                  alerts.length
                )} orphaned orders across ${numberToWords.toWords(
                  marketsNumber
                )} ${
                  marketsNumber > 1 ? " markets" : " market"
                }. Please go to your portfolio to cancel these orders.`
              : `You have one orphaned order on market "${
                  market.description
                }". Please go to your portfolio to cancel this order.`}
          </span>
          <span className={Styles.alertBar_learnMore}>
            <a
              href="http://docs.augur.net/#orphaned-order"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </span>
        </div>
        {!isMobileSmall && (
          <div className={Styles.alertBar_container}>
            <Link
              to={makePath(MY_POSITIONS)}
              className={Styles.alertBar_button}
            >
              View Portfolio
            </Link>
          </div>
        )}
        <div className={Styles.alertBar_container}>
          <button
            className={Styles.alertBar_dismiss}
            onClick={() => dismissFn(alert)}
          >
            <div className={Styles.alertBar_dismissIcon}>
              {CloseWithCircle(
                Styles.alertBar_dismissIconImg,
                "#412468",
                "#FFF"
              )}
            </div>
          </button>
        </div>
      </div>
      {isMobileSmall && (
        <div className={Styles.alertBar__row}>
          <div className={Styles.alertBar_containerView}>
            <Link
              to={makePath(MY_POSITIONS)}
              className={Styles.alertBar_button}
            >
              View Portfolio
            </Link>
          </div>
        </div>
      )}
    </div>
  ));

AlertBar.propTypes = {
  dismissFn: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(PropTypes.object),
  market: PropTypes.object,
  marketsNumber: PropTypes.number.isRequired,
  isMobileSmall: PropTypes.bool.isRequired
};

AlertBar.defaultProps = {
  market: null,
  alerts: []
};
