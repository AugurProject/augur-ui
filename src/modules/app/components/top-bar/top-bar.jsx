import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { Alerts } from "modules/common/components/icons";
import ConnectAccount from "modules/auth/containers/connect-account";
import GasPriceEdit from "modules/app/containers/gas-price-edit";
import BlockInfoData from "modules/block-info/containers/block-info-data";
import {
  MovementLabel,
  LinearPropertyLabel,
  LinearPropertyLabelMovement
} from "modules/common-elements/labels";

import makePath from "modules/routes/helpers/make-path";
import { MARKETS } from "modules/routes/constants/views";
import Styles from "modules/app/components/top-bar/top-bar.styles";

const TopBar = props => (
  <header className={Styles.TopBar}>
    {props.isLogged && (
      <div className={Styles.TopBar__statsContainer}>
        <div
          className={classNames(
            Styles.TopBar__stats,
            Styles["TopBar__regular-stats"]
          )}
        >
          <LinearPropertyLabel
            label={props.stats[0].availableFunds.label}
            value={props.stats[0].availableFunds.value}
          />
          <LinearPropertyLabel
            label={props.stats[0].frozenFunds.label}
            value={props.stats[0].frozenFunds.value}
          />
          <LinearPropertyLabel
            label={props.stats[0].totalFunds.label}
            value={props.stats[0].totalFunds.value}
          />
          <LinearPropertyLabelMovement
            showColors
            label={props.stats[1].realizedPL.label}
            numberValue={props.stats[1].realizedPL.value}
          />
        </div>
        <div
          className={classNames(
            Styles.TopBar__stats,
            Styles.TopBar__performance,
            Styles.TopBar__hideForSmallScreens,
            {
              [Styles.TopBar__leftBorder]: props.isMobileSmall
            }
          )}
        >
          <div>
            <span>{props.stats[1].realizedPL.label}</span>
            <MovementLabel
              showColors
              value={props.stats[1].realizedPL.value}
              size="normal"
            />
          </div>
        </div>
      </div>
    )}
    <BlockInfoData />
    {props.isLogged && (
      <GasPriceEdit className={Styles.TopBar__hideForSmallScreens} />
    )}
    <ConnectAccount
      className={classNames({
        [Styles.TopBar__hideForSmallScreens]: props.isLogged
      })}
    />
    <div
      className={classNames(Styles.TopBar__alerts, {
        [Styles.TopBar__alertsDark]: props.alertsVisible,
        [Styles.TopBar__alertsDisabled]: !props.isLogged
      })}
      onClick={e => {
        props.toggleAlerts();
      }}
      role="button"
      tabIndex="-1"
    >
      <div className={Styles["TopBar__alerts-container"]}>
        <div className={Styles["TopBar__alert-icon"]}>
          {props.unseenCount > 99
            ? Alerts(
                "99+",
                "7.4591451",
                props.isLogged ? "#FFFFFF" : "rgba(255,255,255,.125)"
              )
            : Alerts(
                props.unseenCount,
                "6.4591451",
                props.isLogged ? "#FFFFFF" : "rgba(255,255,255,.125)"
              )}
        </div>
      </div>
    </div>
    <span className={Styles["TopBar__logo-text"]}>
      <Link to={makePath(MARKETS)}>Augur</Link>
    </span>
  </header>
);

TopBar.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  stats: PropTypes.array.isRequired,
  unseenCount: PropTypes.number.isRequired,
  toggleAlerts: PropTypes.func.isRequired,
  alertsVisible: PropTypes.bool.isRequired,
  isMobileSmall: PropTypes.bool.isRequired
};

export default TopBar;
