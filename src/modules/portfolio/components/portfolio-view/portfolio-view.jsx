import React from "react";

import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import OpenOrders from "modules/portfolio/containers/open-orders";
import FilledOrders from "modules/portfolio/containers/filled-orders";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

const PortfolioView = p => (
  <section className={Styles.PortfolioView}>
    <div className={Styles.PortfolioView__views}>
      <MyPositions />
      <OpenOrders />
      <MyMarkets />
      <FilledOrders />
    </div>
  </section>
);

export default PortfolioView;
