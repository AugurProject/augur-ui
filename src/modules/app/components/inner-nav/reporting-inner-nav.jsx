import BaseInnerNav from 'modules/app/components/inner-nav/base-inner-nav'
import { REPORTING_DISPUTE_MARKETS, REPORTING_REPORTING } from 'modules/routes/constants/views'

export default class ReportingInnerNav extends BaseInnerNav {
  getMainMenuData() {
    return [
      {
        label: 'Dispute',
        visible: true,
        isSelected: (this.props.currentBasePath === REPORTING_DISPUTE_MARKETS),
        link: {
          pathname: REPORTING_DISPUTE_MARKETS,
        },
      },
      {
        label: 'Reporting',
        visible: true,
        isSelected: (this.props.currentBasePath === REPORTING_REPORTING),
        link: {
          pathname: REPORTING_REPORTING,
        },
      },
    ]
  }
}
