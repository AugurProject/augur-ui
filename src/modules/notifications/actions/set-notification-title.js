/**
 * @todo Write titles
 * @todo Figure out how to handle overloaded transaction names
 * @todo Have John's code convert hex params to integers (or vice versa)?
 * @todo Determine how to handle non-documented transactions (such as addMarketTo)?
 * @todo Test titles
 */

import { formatEther, formatRep, formatShares } from 'utils/format-number'

const ETHER_DIVISOR = 10000
const REP_DIVISOR = 1000000000000000000
const SHARES_DIVISOR = 100000000000000

export default function setNotificationTitle(notification, callback) {
  return (dispatch, getState) => {
    // console.log('NOTIFICATION: ', notification)
    if (!notification) {
      throw new Error('Notification is not set')
    }
    if (!callback) {
      throw new Error('Callback function is not set')
    }
    if (!notification.title) {
      dispatch(callback(notification))
    }

    switch (notification.title.toUpperCase()) {
      // Augur
      case 'CREATEGENESISUNIVERSE':
        notification.title = 'Create genesis universe'
        break
      // CancelOrder
      case 'CANCELORDER':
        notification.title = 'Cancel order'
        break
      // Cash
      case 'WITHDRAWETHERTOIFPOSSIBLE':
        notification.title = 'Withdraw ' + formatEther(notification._amount / ETHER_DIVISOR).formatted + ' ETH to ' + notification._address
        break
      // ClaimTradingProceeds
      case 'CALCULATEREPORTINGFEE':
        notification.title = 'Calculate reporting fee for ' + formatShares(notification._amount / SHARES_DIVISOR).formatted + ' shares in market ' + notification._market
        break
      case 'CLAIMTRADINGPROCEEDS':
        notification.title = 'Claim trading proceeds for ' + notification._shareHolder + ' in market ' + notification._market
        break
      // CompleteSets
      case 'PUBLICBUYCOMPLETESETS':
      case 'PUBLICBUYCOMPLETESETSWITHCASH':
        notification.title = 'Buy ' + formatShares(notification._amount / SHARES_DIVISOR).formatted + ' complete sets in market ' + notification._market
        break
      case 'PUBLICSELLCOMPLETESETS':
      case 'PUBLICSELLCOMPLETESETSWITHCASH':
        notification.title = 'Sell ' + formatShares(notification._amount / SHARES_DIVISOR).formatted + ' complete sets in market ' + notification._market
        break
      // CreateOrder
      case 'PUBLICCREATEORDER': {
        const orderType = (notification._type === '0x0') ? 'buy' : 'sell'
        notification.title = 'Create ' + orderType + ' order'
        break
      }
      // DisputeCrowdsourcer

      // FeeWindow
      case 'BUY':
        notification.title = 'Buy ' + formatRep(notification._attotokens / REP_DIVISOR) + ' Participation Tokens'
        break
      // FillOrder
      case 'PUBLICFILLORDER':
        notification.title = 'Fill order for ' + formatShares(notification._amountFillerWants / SHARES_DIVISOR) + ' shares'
        break
      // InitialReporter

      // Mailbox
      case 'WITHDRAWETHER':
        notification.title = 'Withdraw Ether from mailbox'
        break
      case 'WITHDRAWTOKENS':
        notification.title = 'Withdraw tokens from mailbox'
        break
      // Market
      case 'CONTRIBUTE':
        notification.title = 'Contribute ' + formatRep(notification._amount / REP_DIVISOR) + ' REP to crowdsourcer'
        break
      case 'DISAVOWCROWDSOURCERS':
        notification.title = 'Make staked REP available for claiming'
        break
      case 'DOINITIALREPORT':
        notification.title = 'Submit report'
        break
      case 'FINALIZE':
        notification.title = 'Finalize market'
        break
      case 'FINALIZEFORK':
        notification.title = 'Finalize forked market'
        break
      case 'MIGRATETHROUGHONEFORK':
        notification.title = 'Migrate market to winning child universe'
        break
      // ReputationToken
      case 'MIGRATEFROMLEGACYREPUTATIONTOKEN':
        notification.title = 'Migrate REP tokens from old contract to new contract'
        break
      case 'MIGRATEOUT':
        notification.title = ''
        break
      case 'MIGRATEOUTBYPAYOUT':
        notification.title = ''
        break
      case 'UPDATEPARENTTOTALTHEORETICALSUPPLY':
        notification.title = ''
        break
      case 'UPDATESIBLINGMIGRATIONTOTAL':
        notification.title = ''
        break
      // ShareToken

      // Trade
      case 'PUBLICBUY':
        notification.title = ''
        break
      case 'PUBLICBUYWITHLIMIT':
        notification.title = ''
        break
      case 'PUBLICSELL':
        notification.title = ''
        break
      case 'PUBLICSELLWITHLIMIT':
        notification.title = ''
        break
      case 'PUBLICTRADE':
        notification.title = ''
        break
      case 'PUBLICTRADEWITHLIMIT':
        notification.title = ''
        break
      case 'PUBLICFILLBESTORDER':
        notification.title = ''
        break
      case 'PUBLICFILLBESTORDERWITHLIMIT':
        notification.title = ''
        break
      // TradingEscapeHatch
      case 'CLAIMSHARESINUPDATE':
        notification.title = ''
        break
      case 'GETFROZENSHAREVALUEINMARKET':
        notification.title = ''
        break
      // Universe
      case 'CREATECATEGORICALMARKET':
        notification.title = ''
        break
      case 'CREATECHILDUNIVERSE':
        notification.title = ''
        break
      case 'CREATESCALARMARKET':
        notification.title = ''
        break
      case 'CREATEYESNOMARKET':
        notification.title = ''
        break
      case 'GETINITIALREPORTSTAKESIZE':
        notification.title = ''
        break
      case 'GETORCACHEDESIGNATEDREPORTNOSHOWBOND':
        notification.title = ''
        break
      case 'GETORCACHEDESIGNATEDREPORTSTAKE':
        notification.title = ''
        break
      case 'GETORCACHEMARKETCREATIONCOST':
        notification.title = ''
        break
      case 'GETORCACHEREPORTINGFEEDIVISOR':
        notification.title = ''
        break
      case 'GETORCACHEVALIDITYBOND':
        notification.title = ''
        break
      case 'GETORCREATECURRENTFEEWINDOW':
        notification.title = ''
        break
      case 'GETORCREATEFEEWINDOWBYTIMESTAMP':
        notification.title = ''
        break
      case 'GETORCREATENEXTFEEWINDOW':
        notification.title = ''
        break
      case 'GETORCREATEPREVIOUSFEEWINDOW':
        notification.title = ''
        break
      case 'REDEEMSTAKE':
        notification.title = ''
        break

      // Overloaded transaction names
      case 'APPROVE':
        notification.title = ''
        break
      case 'DECREASEAPPROVAL':
        notification.title = ''
        break
      case 'FORKANDREDEEM':
        notification.title = ''
        break
      case 'INCREASEAPPROVAL':
        notification.title = ''
        break
      case 'REDEEM':
        notification.title = ''
        break
      case 'TRANSFER':
        notification.title = ''
        break
      case 'TRANSFERFROM':
        notification.title = ''
        break
      case 'TRANSFEROWNERSHIP':
        notification.title = ''
        break
      case 'WITHDRAWINEMERGENCY':
        notification.title = ''
        break
      default: {
        const result = notification.title.replace(/([A-Z])/g, ' $1')
        notification.title = result.charAt(0).toUpperCase() + result.slice(1)
        break
      }
    }
    dispatch(callback(notification))
  }
}
