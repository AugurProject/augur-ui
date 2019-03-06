import BaseInnerNav from "modules/app/components/inner-nav/base-inner-nav";
import {
  MY_POSITIONS,
  PORTFOLIO_REPORTS
} from "modules/routes/constants/views";

export default class PorfolioInnerNav extends BaseInnerNav {
  getMainMenuData() {
    const { currentBasePath } = this.props;
    return [
      {
        label: "Summary",
        visible: true,
        isSelected: currentBasePath === MY_POSITIONS,
        link: {
          pathname: MY_POSITIONS
        }
      },
      {
        label: "My Reporting",
        visible: true,
        isSelected: currentBasePath === PORTFOLIO_REPORTS,
        link: {
          pathname: PORTFOLIO_REPORTS
        }
      }
    ];
  }
}
