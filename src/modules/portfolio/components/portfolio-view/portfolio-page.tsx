import React from "react";
import classNames from "classnames";

import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import OpenOrders from "modules/portfolio/containers/open-orders";
import FilledOrders from "modules/portfolio/containers/filled-orders";
import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

export interface PortfolioPageProps {}

const PortfolioPage = (props: PortfolioPageProps) => (
  <>
    <section className={classNames(Styles.PortfolioView, Styles.HideOnMobile)}>
      <div>
        <MyPositions />
        <MyMarkets />
      </div>
      <div>
        <OpenOrders />
        <FilledOrders />
      </div>
    </section>
    <ModuleTabs selected={0} fillWidth noBorder className={Styles.ShowOnMobile}>
      <ModulePane label="Positions">
        <MyPositions />
      </ModulePane>
      <ModulePane label="Open Orders">
        <OpenOrders />
      </ModulePane>
      <ModulePane label="Filled Orders">
        <FilledOrders />
      </ModulePane>
      <ModulePane label="My Created Markets">
        <MyMarkets />
      </ModulePane>
    </ModuleTabs>
  </>
);

export default PortfolioPage;
