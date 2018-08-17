/**
 * @todo Finish writing title text
 * @todo Figure out how to handle overloaded transaction names
 * @todo Have John's code convert hex params to integers (or vice versa)?
 * @todo Determine how to handle non-documented transactions (such as Universe.addMarketTo)
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
        notification.title = 'Create ' + orderType + ' liquidity order'
        break
      }
      // DisputeCrowdsourcer

      // FeeWindow
      case 'BUY':
        notification.title = 'Buy ' + formatRep(notification._attotokens / REP_DIVISOR).formatted + ' Participation Tokens'
        break
      // FillOrder
      case 'PUBLICFILLORDER':
        notification.title = 'Fill order for ' + formatShares(notification._amountFillerWants / SHARES_DIVISOR).formatted + ' shares'
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
        notification.title = 'Contribute ' + formatRep(notification._amount / REP_DIVISOR).formatted + ' REP to crowdsourcer'
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
      case 'MIGRATEBALANCESFROMLEGACYREP':
        notification.title = 'Migrate balances from legacy REP contract'
        break
      case 'MIGRATEALLOWANCESFROMLEGACYREP':
        notification.title = 'Migrate allowances from legacy REP contract'
        break
      case 'MIGRATEOUT':
        notification.title = 'Migrate ' + formatRep(notification._attotokens / REP_DIVISOR).formatted + ' REP to ' + notification._destination
        break
      case 'MIGRATEOUTBYPAYOUT':
        notification.title = 'Migrate ' + formatRep(notification._attotokens / REP_DIVISOR).formatted + ' REP by payout set'
        break
      case 'UPDATEPARENTTOTALTHEORETICALSUPPLY':
        notification.title = 'Update theoretical REP supply for parent universe'
        break
      case 'UPDATESIBLINGMIGRATIONTOTAL':
        notification.title = 'Update theoretical REP supply for sibling universe'
        break
      // ShareToken

      // Trade
      case 'PUBLICBUY':
      case 'PUBLICBUYWITHLIMIT':
        notification.title = 'Buy ' + formatShares(notification._fxpAmount / SHARES_DIVISOR).formatted + ' at ' + formatEther(notification._price / ETHER_DIVISOR).formatted
        break
      case 'PUBLICSELL':
      case 'PUBLICSELLWITHLIMIT':
        notification.title = 'Sell ' + formatShares(notification._fxpAmount / SHARES_DIVISOR).formatted + ' at ' + formatEther(notification._price / ETHER_DIVISOR).formatted
        break
      case 'PUBLICTRADE':
      case 'PUBLICTRADEWITHLIMIT': {
        const orderType = (notification._direction === '0x0') ? 'Buy' : 'Sell'
        notification.title = orderType + ' ' + formatShares(notification._fxpAmount / SHARES_DIVISOR).formatted + ' at ' + formatEther(notification._price / ETHER_DIVISOR).formatted
        break
      }
      case 'PUBLICFILLBESTORDER':
      case 'PUBLICFILLBESTORDERWITHLIMIT':
        notification.title = 'Fill order for ' + formatShares(notification._fxpAmount / SHARES_DIVISOR).formatted + ' shares at ' + formatEther(notification._price / ETHER_DIVISOR).formatted
        break
      // TradingEscapeHatch
      case 'CLAIMSHARESINUPDATE':
        notification.title = 'Claim shares from market ' + notification._market
        break
      case 'GETFROZENSHAREVALUEINMARKET':
        notification.title = 'Liquidate shares in market ' + notification._market + ' to Ether'
        break
      // Universe
      case 'CREATEMARKET':
      case 'CREATECATEGORICALMARKET':
      case 'CREATESCALARMARKET':
      case 'CREATEYESNOMARKET':
        notification.title = 'Create new market ' + notification._description
        break
      case 'CREATECHILDUNIVERSE':
        notification.title = 'Create child universe'
        break
      case 'REDEEMSTAKE':
        notification.title = 'Claim staked REP/Ether'
        break
      case 'GETINITIALREPORTSTAKESIZE':
        notification.title = 'Get initial report stake size'
        break
      case 'GETORCACHEDESIGNATEDREPORTNOSHOWBOND':
        notification.title = 'Get no-show bond size for markets'
        break
      case 'GETORCACHEDESIGNATEDREPORTSTAKE':
        notification.title = 'Get stake size required for desginated reports'
        break
      case 'GETORCACHEMARKETCREATIONCOST':
        notification.title = 'Get market creation cost'
        break
      case 'GETORCACHEREPORTINGFEEDIVISOR':
        notification.title = 'Get reporting fee divisor'
        break
      case 'GETORCACHEVALIDITYBOND':
        notification.title = 'Get validity bond size required for market creation'
        break
      case 'GETORCREATECURRENTFEEWINDOW':
        notification.title = 'Get/create current fee window address'
        break
      case 'GETORCREATEFEEWINDOWBYTIMESTAMP':
        notification.title = 'Get/create fee window by timestamp'
        break
      case 'GETORCREATENEXTFEEWINDOW':
        notification.title = 'Get/create next fee window'
        break
      case 'GETORCREATEPREVIOUSFEEWINDOW':
        notification.title = 'Get/create previous fee window'
        break

      // TODO: The transaction names below are overloaded across contracts.
      // We probably need a way for the notification system to indicate
      // which contract these correspond to.
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
