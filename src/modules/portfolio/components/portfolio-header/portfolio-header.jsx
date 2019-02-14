import React from "react";
import PropTypes from "prop-types";

// TODO: maybe change this to container and get performance graph data through a container
import PerformanceGraph from "modules/portfolio/containers/performance-graph";
import { ExportIcon } from "modules/common/components/icons";

import parsePath from "modules/routes/helpers/parse-path";
import {
  MY_POSITIONS,
  MY_MARKETS,
  FAVORITES,
  TRANSACTIONS,
  PORTFOLIO_REPORTS
} from "modules/routes/constants/views";

import Styles from "modules/portfolio/components/portfolio-header/portfolio-header.styles";

const PortfolioHeader = () => (
  <section className={Styles.PortfolioHeader}>
    <div className={Styles.PortfolioHeader__header}>
      <h1 className={Styles.PortfolioHeader__title}>
        portfolio
      </h1>
    </div>
  </section>
);

export default PortfolioHeader;
