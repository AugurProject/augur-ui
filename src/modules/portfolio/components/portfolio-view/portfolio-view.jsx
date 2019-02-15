import React from "react";

import PortfolioHeader from "modules/portfolio/containers/portfolio-header";
import MyPositions from "modules/portfolio/containers/positions";
// import MyMarkets from "modules/portfolio/containers/my-markets";
// import Favorites from "modules/portfolio/containers/favorites";
import FilterBox from "modules/portfolio/components/common/filter-box";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

const PortfolioView = p => (
  <section className={Styles.PortfolioView}>
    <PortfolioHeader />
    <div className={Styles.PortfolioView__views}>
      <MyPositions />
      <FilterBox title="Open Orders" />
      <FilterBox title="My Created Markets" />
      <FilterBox title="Filled Orders" />
    </div>
  </section>
);

export default PortfolioView;
