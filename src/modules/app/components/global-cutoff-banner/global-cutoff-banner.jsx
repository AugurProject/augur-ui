import React from "react";

import {
  CUTOFF_READABLE,
  CUTOFF_URL
} from "modules/markets/constants/cutoff-date";
import { AlertIcon } from "modules/common/components/icons";

import Styles from "modules/app/components/global-cutoff-banner/global-cutoff-banner.styles";

const GlobalCutoffBanner = () => (
  <section className={Styles.GlobalCutoffBanner}>
    <div>{AlertIcon}</div>
    <div>
      <span>
        Due to a planned Augur v2 launch, users are advised not to trade or
        report on any markets that end after {CUTOFF_READABLE} or that lack a
        sufficient Initial Reporter Stake.
      </span>
      <a href={CUTOFF_URL} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  </section>
);

export default GlobalCutoffBanner;
