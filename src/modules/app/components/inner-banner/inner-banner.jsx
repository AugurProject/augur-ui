import React from "react";
import PropTypes from "prop-types";

import { CUTOFF_READABLE } from "modules/markets/constants/cutoff-date";
import { AlertIcon } from "modules/common/components/icons";
import { CREATE_MARKET } from "modules/routes/constants/views";

import Styles from "modules/app/components/inner-banner/inner-banner.styles";

const InnerBanner = ({ currentPath }) => (
  <section className={Styles.InnerBanner}>
    <div>{currentPath === CREATE_MARKET && AlertIcon}</div>
    {currentPath === CREATE_MARKET && (
      <span>
        Due to a planned Augur v2 launch, no new markets can be created that end
        after {CUTOFF_READABLE}. <br />
        Any markets that end after this date cannot be guaranteed to resolve
        correctly.
      </span>
    )}
    <a
      href="http://docs.augur.net"
      target="_blank"
      rel="noopener noreferrer"
      className={Styles.ReadMore}
    >
      Read more
    </a>
  </section>
);

InnerBanner.propTypes = {
  currentPath: PropTypes.string.isRequired
};
export default InnerBanner;
