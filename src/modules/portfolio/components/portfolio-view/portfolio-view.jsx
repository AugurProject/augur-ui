import React from "react";
import { Switch } from "react-router-dom";

import AuthenticatedRoute from "modules/routes/components/authenticated-route/authenticated-route";

import PortfolioHeader from "modules/portfolio/containers/portfolio-header";
import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import Favorites from "modules/portfolio/containers/favorites";
import Transactions from "modules/portfolio/containers/transactions";
import Reports from "modules/portfolio/containers/reports";
import PortfolioBox from "modules/portfolio/components/common/portfolio-box";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";
import makePath from "modules/routes/helpers/make-path";

import {
  MY_POSITIONS,
  MY_MARKETS,
  FAVORITES,
  PORTFOLIO_TRANSACTIONS,
  PORTFOLIO_REPORTS
} from "modules/routes/constants/views";

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
