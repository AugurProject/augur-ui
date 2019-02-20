import React from "react";

import PortfolioHeader from "modules/portfolio/containers/portfolio-header";
import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import FilterBox from "modules/portfolio/components/common/filter-box";
import OpenOrders from "modules/portfolio/containers/open-orders";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

const PortfolioView = p => (
  <section className={Styles.PortfolioView}>
    <PortfolioHeader />
    <div className={Styles.PortfolioView__views}>
      <MyPositions />
      <OpenOrders />
      <MyMarkets />
      <FilterBox title="Filled Orders" />
    </div>
  </section>
);

export default PortfolioView;
