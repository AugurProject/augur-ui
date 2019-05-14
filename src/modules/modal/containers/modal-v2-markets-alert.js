import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModalMarketsV2Alert from "modules/modal/components/modal-v2-markets-alert";
import { closeModal } from "modules/modal/actions/close-modal";
import { V2_MARKETS_REVIEW_SEEN } from "src/modules/modal/constants/local-storage-keys";
import { selectMarkets } from "src/modules/markets/selectors/markets-all";
import { isPastV2Cutoff } from "modules/markets/helpers/is-market-past-v2-cutoff";

const localStorageRef = typeof window !== "undefined" && window.localStorage;

const mapStateToProps = state => {
  const markets = selectMarkets(state);

  const hasPositionsInCutoffMarkets = markets
    .filter(market => isPastV2Cutoff(market.endTime.timestamp))
    .filter(market => market && market.myPositionOutcomes);

  return {
    account: state.loginAccount.address,
    modal: state.modal,
    hasPositionsInCutoffMarkets: hasPositionsInCutoffMarkets.legnth > 0,
    markets: hasPositionsInCutoffMarkets
  };
};

const mapDispatchToProps = dispatch => ({
  markModalAsSeen: account => {
    if (localStorageRef) {
      const accountsSeen =
        JSON.parse(localStorage.getItem(V2_MARKETS_REVIEW_SEEN)) || {};
      accountsSeen[account] = true;
      localStorageRef.setItem(
        V2_MARKETS_REVIEW_SEEN,
        JSON.stringify(accountsSeen)
      );
    }
  },
  markModalAsUnSeen: account => {
    if (localStorageRef) {
      const accountsSeen =
        JSON.parse(localStorage.getItem(V2_MARKETS_REVIEW_SEEN)) || {};
      delete accountsSeen[account];
      localStorageRef.setItem(
        V2_MARKETS_REVIEW_SEEN,
        JSON.stringify(accountsSeen)
      );
    }
  },
  closeModal: () => {
    dispatch(closeModal());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalMarketsV2Alert)
);
