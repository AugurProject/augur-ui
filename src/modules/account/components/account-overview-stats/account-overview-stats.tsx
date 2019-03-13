import React from "react";

import { LinearPropertyLabel } from "modules/common-elements/labels";

import Styles from "modules/account/components/account-overview-stats/account-overview-stats.styles";

export interface AccountOverviewProps {
  properties: Array<KeyValuePair>;
}

const AccountOverviewStats = (props: AccountOverviewStatsProps) => (
  <div className={Styles.AccountOverviewStats}>
    {props.properties.map(property =>
      <LinearPropertyLabel
        large
        key={property.key}
        label={property.label}
        value={property.value}
      />
    )}
  </div>
);

export default AccountOverviewStats;

