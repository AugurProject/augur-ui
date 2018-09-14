import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConnectDropdown from "modules/auth/components/connect-dropdown/connect-dropdown";
import isMetaMaskPresent from "src/modules/auth/helpers/is-meta-mask";

const mapStateToProps = state => ({
  isMobile: state.appStatus.isMobile,
  isLogged: state.authStatus.isLogged,
  isMetaMaskPresent: isMetaMaskPresent(),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  connectMetaMask: () => dispatch(loginWithMetaMask(history))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectDropdown)
);
