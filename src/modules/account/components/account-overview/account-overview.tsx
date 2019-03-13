import React from "react";

import * as constants from "modules/common-elements/constants";
import QuadBox from "modules/portfolio/components/common/quads/quad-box";
import { PillSelection } from "modules/common-elements/selection";
import AccountOverviewStats from "modules/account/containers/account-overview-stats";

import Styles from "modules/account/components/account-overview/account-overview.styles";

export interface AccountOverviewProps {}

interface AccountOverviewState {
  selected: number;
}

export default class AccountOverview extends React.Component<
  AccountOverviewProps,
  AccountOverviewState
> {
  state: AccountOverviewState = {
    selected: constants.TIMEFRAME_OPTIONS[0].id
  };

  updateTimeSelection = id => {
    this.setState({ selected: id });
  };

  render() {
    const { selected } = this.state;

    return (
      <QuadBox
        title={constants.YOUR_OVERVIEW_TITLE}
        rightContent={
          <PillSelection
            options={constants.TIMEFRAME_OPTIONS}
            defaultSelection={constants.TIMEFRAME_OPTIONS[0].id}
            onChange={this.updateTimeSelection}
          />
        }
        rows={
          <div className={Styles.AccountOverview}>
            <AccountOverviewStats timeframe={selected} />
          </div>
        }
      />
    );
  }
}
