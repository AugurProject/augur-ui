import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConnectDropdown from "modules/auth/components/connect-dropdown/connect-dropdown";
import isMetaMaskPresent from "src/modules/auth/helpers/is-meta-mask";
import { loginWithMetaMask } from "src/modules/auth/actions/login-with-metamask";
import { logout } from "modules/auth/actions/logout";

const mapStateToProps = state => ({
  isMobile: state.appStatus.isMobile,
  isLogged: state.authStatus.isLogged,
  isMetaMaskPresent: isMetaMaskPresent(),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  connectMetaMask: (cb) => dispatch(loginWithMetaMask(history, cb)),
  logout: () => dispatch(logout()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectDropdown)
);
