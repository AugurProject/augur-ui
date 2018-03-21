import { describe, it } from 'mocha'
import { assert } from 'chai'
import insufficientFunds from 'modules/create-market/selectors/insufficient-funds'

describe('src/modules/create-market/selectors/insufficient-funds.js', () => {
  describe('when user has insufficient ETH', () => {
    it('should.....', () => {
      const validityBond = 0.01
      const gasCost = 0
      const creationFee = 0.025
      const designatedReportNoShowReputationBond = 0.03
      const availableEth = 0.0001
      const availableRep = 10

      const expected = 'ETH'
      const result = insufficientFunds(validityBond, gasCost, creationFee, designatedReportNoShowReputationBond, availableEth, availableRep)

      assert.equal(result, expected)
    })
  })
  describe('when user has insufficient REP', () => {
    it('should.....', () => {
      const validityBond = 0.01
      const gasCost = 0
      const creationFee = 0.025
      const designatedReportNoShowReputationBond = 0.03
      const availableEth = 10
      const availableRep = 0.0001

      const expected = 'REP'
      const result = insufficientFunds(validityBond, gasCost, creationFee, designatedReportNoShowReputationBond, availableEth, availableRep)

      assert.equal(result, expected)
    })
  })
  describe('when user has insufficient ETH and REP', () => {
    it('should.....', () => {
      const validityBond = 0.01
      const gasCost = 0
      const creationFee = 0.025
      const designatedReportNoShowReputationBond = 0.03
      const availableEth = 0.0001
      const availableRep = 0.0001

      const expected = 'ETH and REP'
      const result = insufficientFunds(validityBond, gasCost, creationFee, designatedReportNoShowReputationBond, availableEth, availableRep)

      assert.equal(result, expected)
    })
  })
  describe('when user has sufficient funds', () => {
    it('should.....', () => {
      const validityBond = 0.01
      const gasCost = 0
      const creationFee = 0.025
      const designatedReportNoShowReputationBond = 0.03
      const availableEth = 10
      const availableRep = 10

      const expected = ''
      const result = insufficientFunds(validityBond, gasCost, creationFee, designatedReportNoShowReputationBond, availableEth, availableRep)

      assert.equal(result, expected)
    })
  })
})
