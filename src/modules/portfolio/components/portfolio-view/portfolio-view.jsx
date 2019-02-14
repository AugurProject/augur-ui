import React from "react";

import PortfolioHeader from "modules/portfolio/containers/portfolio-header";
import MyPositions from "modules/portfolio/containers/positions";
// import MyMarkets from "modules/portfolio/containers/my-markets";
// import Favorites from "modules/portfolio/containers/favorites";
import PortfolioBox from "modules/portfolio/components/common/portfolio-box";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

const PortfolioView = p => (
  <section className={Styles.PortfolioView}>
    <PortfolioHeader />
    <div className={Styles.PortfolioView__views}>
      <MyPositions />
      <PortfolioBox title="Open Orders" />
      <PortfolioBox title="My Created Markets" />
      <PortfolioBox title="Filled Orders" />
    </div>
  </section>
);

export default PortfolioView;
