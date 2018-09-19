import { connect } from "react-redux";
import Trezor from "modules/auth/components/trezor/trezor2";
import loginWithTrezor from "src/modules/auth/actions/login-with-trezor";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loginWithTrezor: (address, connect, addressPath) =>
    dispatch(loginWithTrezor(address, connect, addressPath))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trezor);
