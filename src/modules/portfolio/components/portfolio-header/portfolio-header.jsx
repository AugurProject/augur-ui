import React from "react";

import Styles from "modules/portfolio/components/portfolio-header/portfolio-header.styles";

const PortfolioHeader = () => (
  <section className={Styles.PortfolioHeader}>
    <div className={Styles.PortfolioHeader__header}>
      <h1 className={Styles.PortfolioHeader__title}>portfolio</h1>
    </div>
  </section>
);

export default PortfolioHeader;
