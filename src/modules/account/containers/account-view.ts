import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AccountView from "modules/account/components/account-view/account-view";

const mapStateToProps = state => ({
  isMobile: state.appStatus.isMobile
});

const AccountViewContainer = withRouter(connect(mapStateToProps)(AccountView));

export default AccountViewContainer;
