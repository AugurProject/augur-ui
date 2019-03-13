import React from "react";

import { PillSelection } from "modules/common-elements/selection";
import PlatformOverviewStats from "modules/account/containers/platform-overview-stats";
import * as constants from "modules/common-elements/constants";

import Styles from "modules/account/components/augur-status/activity.styles";

export interface ActivityProps {}

interface ActivityState {
  selected: number;
}

export default class Activity extends React.Component<
  ActivityProps,
  ActivityState
> {
  state: ActivityState = {
    selected: constants.TIMEFRAME_OPTIONS[0].id
  };

  updateTimeSelection = id => {
    this.setState({ selected: id });
  };

  render() {
    return (
      <div className={Styles.Activity}>
        <span>Activity</span>
        <PillSelection
          options={constants.TIMEFRAME_OPTIONS}
          defaultSelection={constants.TIMEFRAME_OPTIONS[0].id}
          onChange={this.updateTimeSelection}
        />
        <PlatformOverviewStats timeframe={this.state.selected} />
      </div>
    );
  }
}
