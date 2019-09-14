import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  CUTOFF_READABLE,
  CUTOFF_URL
} from "modules/markets/constants/cutoff-date";
import { AlertIcon, Flag } from "modules/common/components/icons";
import {
  CREATE_MARKET,
  MARKET,
  REPORT,
  DISPUTE
} from "modules/routes/constants/views";

import Styles from "modules/app/components/inner-banner/inner-banner.styles";

const InnerBanner = ({ currentPath, style, className }) => (
  <section className={classNames(Styles.InnerBanner, className)} style={style}>
    <div>{currentPath === CREATE_MARKET ? AlertIcon : Flag}</div>
    <div>
      {currentPath === CREATE_MARKET && (
        <span>
          Due to a planned Augur v2 launch, no new markets can be created that
          end after {CUTOFF_READABLE}. Any markets that end after this date are
          at a higher risk of resolving incorrectly. Markets that end earlier
          still must meet an Initial Reporter Stake threshold in order to
          securely resolve and be visible to traders.
        </span>
      )}
      {(currentPath === DISPUTE) && (
        <span>
          Users are advised <b>not to dispute or report on</b> this market
          because it entered reporting after {CUTOFF_READABLE} for the Augur v2 release
          phase or lacked a sufficient Intitial Reporter stake. Doing so may put your REP at risk of getting stuck in Augur v1.
        </span>
      )}
      {currentPath === MARKET && (
        <span>
          This market ends after the cutoff date for the Augur v2 release
          phase or has an insufficient Intitial Reporter stake. Markets that end after {CUTOFF_READABLE} or that lack a sufficient Initial Reporter stake are at a higher risk of
          resolving incorrectly.
        </span>
      )}
      <a
        href={CUTOFF_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={Styles.ReadMore}
      >
        Read more
      </a>
    </div>
  </section>
);

InnerBanner.propTypes = {
  currentPath: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

InnerBanner.defaultProps = {
  style: {},
  className: ""
};

export default InnerBanner;
