import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConnectDropdown from "modules/auth/components/connect-dropdown/connect-dropdown";

const mapStateToProps = state => ({
  isMobile: state.isMobile,
  isLogged: state.isLogged

});

export default withRouter(connect(mapStateToProps)(ConnectDropdown));
