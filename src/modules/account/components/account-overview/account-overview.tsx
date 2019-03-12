import React from "react";

import BoxHeader from "modules/portfolio/components/common/headers/box-header";
import * as constants from "modules/common-elements/constants";
import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import { PillSelection } from "modules/common-elements/selection";

import Styles from "modules/account/components/augur-status/augur-status.styles";

export interface AccountOverviewProps {
}

const AccountOverview = (props: AccountOverviewProps) => {

  return (
    <QuadBox 
      title={constants.YOUR_OVERVIEW_TITLE} 
      rightContent={<PillSelection options={['24hr', '1 day']}/>}
      rows={
        <div>
          chart
        </div>
      }
    />
  );
};

export default AccountOverview;
