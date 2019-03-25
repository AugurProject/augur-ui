import { connect } from "react-redux";

import Activity from "modules/account/components/augur-status/activity";
import { updatePlatformTimeframeData } from "modules/account/actions/update-platform-timeframe-data";
import { selectCurrentTimestampInSeconds } from "src/select-state";

const mapStateToProps = (state: any) => ({
  currentAugurTimestamp: selectCurrentTimestampInSeconds(state)
});

const mapDispatchToProps = dispatch => ({
  updatePlatformTimeframeData: startTime =>
    dispatch(updatePlatformTimeframeData({ startTime }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
