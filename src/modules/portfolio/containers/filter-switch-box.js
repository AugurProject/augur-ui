import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FilterSwitchBox from "modules/portfolio/components/common/quads/filter-switch-box";

const mapStateToProps = state => ({
  isMobile: state.appStatus.isMobile
});

const FilterSwitchBoxContainer = withRouter(
  connect(mapStateToProps)(FilterSwitchBox)
);

export default FilterSwitchBoxContainer;
