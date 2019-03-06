import React from "react";

import PortfolioPage from "modules/portfolio/containers/portfolio-page";
import { Switch } from "react-router-dom";
import Reports from "modules/portfolio/containers/reports";
import AuthenticatedRoute from "modules/routes/components/authenticated-route/authenticated-route";

import makePath from "modules/routes/helpers/make-path";

import {
  MY_POSITIONS,
  PORTFOLIO_REPORTS
} from "modules/routes/constants/views";

const PortfolioView = p => (
  <section>
    <Switch>
      <AuthenticatedRoute
        path={makePath(MY_POSITIONS)}
        component={PortfolioPage}
      />
      <AuthenticatedRoute
        path={makePath(PORTFOLIO_REPORTS)}
        component={Reports}
      />
    </Switch>
  </section>
);

export default PortfolioView;
