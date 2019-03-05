import React from "react";

import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import OpenOrders from "modules/portfolio/containers/open-orders";
import FilledOrders from "modules/portfolio/containers/filled-orders";
import { Switch } from "react-router-dom";  

import AuthenticatedRoute from "modules/routes/components/authenticated-route/authenticated-route";
import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

export interface PortfolioPageProps {}

const PortfolioPage = (props: PortfolioPageProps) => (
  <section className={Styles.PortfolioView}>
    <div>
      <MyPositions />
      <MyMarkets />
    </div>
    <div>
      <OpenOrders />
      <FilledOrders />
    </div>
  </section>
);

export default PortfolioPage;
