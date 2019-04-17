import React from "react";
import Media from "react-media";

import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import OpenOrders from "modules/portfolio/containers/open-orders";
import FilledOrders from "modules/portfolio/containers/filled-orders";
import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

export interface PortfolioPageProps {}

const PortfolioPage = (props: PortfolioPageProps) => (
  <div>
    <Media query="(max-width: 768px)">
      {matches =>
        matches ? (
          <ModuleTabs selected={0} fillWidth noBorder>
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
        ) : (
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
        )
      }
    </Media>
  </div>
);

export default PortfolioPage;
