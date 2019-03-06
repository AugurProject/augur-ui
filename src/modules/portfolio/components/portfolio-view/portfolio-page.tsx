import React from "react";

import MyPositions from "modules/portfolio/containers/positions";
import MyMarkets from "modules/portfolio/containers/my-markets";
import OpenOrders from "modules/portfolio/containers/open-orders";
import FilledOrders from "modules/portfolio/containers/filled-orders";
import { Switch } from "react-router-dom";  
import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

import AuthenticatedRoute from "modules/routes/components/authenticated-route/authenticated-route";
import Styles from "modules/portfolio/components/portfolio-view/portfolio-view.styles";

export interface PortfolioPageProps {
  isMobile: Boolean;
}

const PortfolioPage = (props: PortfolioPageProps) => {
  if (props.isMobile) {
    return (
      <ModuleTabs selected={0} fillWidth noBorder>
        <ModulePane label="Positions">
          <MyPositions />
        </ModulePane>
        <ModulePane label="Orders">
          <div>
            <ModuleTabs selected={0} fillWidth noBorder darkBackground>
              <ModulePane label="Open Orders">
                <OpenOrders />
              </ModulePane> 
              <ModulePane label="Filled Orders">
                <FilledOrders />
              </ModulePane>
            </ModuleTabs>
          </div>
        </ModulePane>
        <ModulePane label="My Created Markets">
          <MyMarkets />
        </ModulePane>
      </ModuleTabs>
    );
  } 

  return (
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
};

export default PortfolioPage;
