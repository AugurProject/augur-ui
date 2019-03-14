import { connect } from "react-redux";

import Activity from "modules/account/components/augur-status/activity";
import { updatePlatformTimeframeData } from "modules/account/actions/update-platform-timeframe-data";

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = dispatch => ({
  updatePlatformTimeframeData: () => dispatch(updatePlatformTimeframeData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
