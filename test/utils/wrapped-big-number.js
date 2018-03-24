import WrappedBigNumber from 'src/utils/wrapped-big-number'
import BigNumber from 'bignumber.js'
import * as sinon from 'sinon'

describe('src/utils/wrapped-big-number.js', () => {
  let spy
  beforeEach(() => {
    spy = sinon.spy()
    WrappedBigNumber.__Rewire__('logError', spy)
  })

  after(() => {
    WrappedBigNumber.__ResetDependency__('logError')
  })

  it('should console an error when a undefined is passed', () => {
    const result = new WrappedBigNumber(undefined)
    assert.instanceOf(result, WrappedBigNumber)
    assert.isNotOk(!result)
    assert.isOk(spy.called)
  })

  it('should console an error when a null value is passed', () => {
    const result = new WrappedBigNumber(null)
    assert.instanceOf(result, WrappedBigNumber)
    assert.isNotOk(!result)
    assert.isOk(spy.called)
  })

  it('should return a bignumber', () => {
    const result = new WrappedBigNumber('2500')

    assert.instanceOf(result, BigNumber)
    assert.isNotOk(spy.called)
  })
})
