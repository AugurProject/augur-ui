import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from 'modules/routes/components/authenticated-route/authenticated-route'
import ReportingDisputeMarkets from 'modules/reporting/containers/reporting-dispute-markets'
import ReportingReporting from 'modules/reporting/containers/reporting-reporting'
import makePath from 'modules/routes/helpers/make-path'

import { REPORTING_DISPUTE_MARKETS, REPORTING_REPORTING } from 'modules/routes/constants/views'

const ReportingView = p => (
  <section>
    <Switch>
      <AuthenticatedRoute path={makePath(REPORTING_DISPUTE_MARKETS)} component={ReportingDisputeMarkets} />
      <AuthenticatedRoute path={makePath(REPORTING_REPORTING)} component={ReportingReporting} />
    </Switch>
  </section>
)

export default ReportingView
