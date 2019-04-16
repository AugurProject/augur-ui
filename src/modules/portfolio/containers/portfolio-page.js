import { connect } from "react-redux";
import PortfolioPage from "modules/portfolio/components/portfolio-view/portfolio-page";

const mapStateToProps = state => ({
  isMobileSmall: state.appStatus.isMobileSmall
});

const PortfolioPageContainer = connect(mapStateToProps)(PortfolioPage);

export default PortfolioPageContainer;
