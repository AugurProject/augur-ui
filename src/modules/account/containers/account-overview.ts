import { connect } from "react-redux";

import AccountOverview from "modules/account/components/account-overview/account-overview";
import { updateTimeframeData } from "modules/account/actions/update-timeframe-data";

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = dispatch => ({
  updateTimeframeData: () => dispatch(updateTimeframeData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountOverview);
