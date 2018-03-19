import { connect } from 'react-redux'

import MarketBasics from 'modules/market/components/market-basics/market-basics'

import { selectCurrentTimestamp } from 'src/select-state'

import getValue from 'utils/get-value'

const mapStateToProps = (state, ownProps) => {
  return {
    currentTimestamp: selectCurrentTimestamp(state),
  }
}

const MarketBasicsContainer = connect(mapStateToProps)(MarketBasics)

export default MarketBasicsContainer
