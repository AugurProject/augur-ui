/**
 * @todo Finish TODO descriptions
 * @todo Remove commented dispatch(callback(notification)) lines
 * @todo Remove "// Not called directly by UI" lines
 * @todo Add checks for hex params vs integer params?
 * @todo Test all transactions & canceling orphaned orders (src/modules/orphaned-orders/actions/index.js)
 */

import { augur } from 'services/augurjs'
import { selectMarket } from 'modules/market/selectors/market'
import { formatEther, formatRep, formatShares } from 'utils/format-number'

const ETHER_DIVISOR = 10000
const REP_DIVISOR = 1000000000000000000
const SHARES_DIVISOR = 100000000000000

function getOutcomeDescription(marketInfo, outcomeIndex) {
  if (marketInfo.marketType.toUpperCase() === 'YESNO') {
    return (outcomeIndex === 0) ? 'No' : 'Yes'
  }
  return marketInfo.outcomes[outcomeIndex].description
}

export default function setNotificationDescription(notification, callback) {
  return (dispatch, getState) => {
    // console.log('NOTIFICATION: ', notification)
    if (!notification) {
      throw new Error('Notification is not set')
    }
    if (!callback) {
      throw new Error('Callback function is not set')
    }
    if (!notification.type) {
      dispatch(callback(notification))
      return
    }

    switch (notification.type.toUpperCase()) {
      // Augur
      case 'CREATEGENESISUNIVERSE':
        break

      // CancelOrder
      case 'CANCELORDER': {
        augur.api.Orders.getAmount({ _orderId: notification._orderId }, (err, orderAmount) => {
          if (err) {
            throw err
          }
          augur.api.Orders.getMarket({ _orderId: notification._orderId }, (err, marketId) => {
            if (err) {
              throw err
            }
            augur.api.Orders.getOutcome({ _orderId: notification._orderId }, (err, orderOutcome) => {
              if (err) {
                throw err
              }
              augur.api.Orders.getPrice({ _orderId: notification._orderId }, (err, orderPrice) => {
                if (err) {
                  throw err
                }
                const marketInfo = selectMarket(marketId)
                const outcomeDescription = getOutcomeDescription(marketInfo, orderOutcome)
                notification.description = 'Cancel order for ' + formatShares(orderAmount / SHARES_DIVISOR).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(orderPrice / ETHER_DIVISOR).formatted + ' ETH'
                // dispatch(callback(notification))
              })
            })
          })
        })
        break
      }

      // Cash
      case 'WITHDRAWETHERTOIFPOSSIBLE': // TODO: Finish text
        notification.description = 'Withdraw X ETH to [address]'
        break

      // ClaimTradingProceeds
      case 'CALCULATEREPORTINGFEE':
        break
      case 'CLAIMTRADINGPROCEEDS': // TODO: Finish text
        notification.description = 'Claim X ETH trading proceeds'
        break

      // CompleteSets
      case 'BUYCOMPLETESETS':
      case 'PUBLICBUYCOMPLETESETS':
      case 'PUBLICBUYCOMPLETESETSWITHCASH': // TODO: Finish text
        notification.description = 'Buy X complete sets for Y ETH'
        break
      case 'PUBLICSELLCOMPLETESETSWITHCASH': // Not called directly by UI
      case 'PUBLICSELLCOMPLETESETS':
        notification.description = 'Sell ' + formatShares(parseInt(notification._amount, 16) / SHARES_DIVISOR).formatted + ' complete sets for Y ETH'
        break

      // CreateOrder
      case 'PUBLICCREATEORDER': { // TODO: Fix
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, notification._outcome)
        const orderType = (notification._type === '0x0') ? 'buy' : 'sell'
        notification.description = 'Create ' + orderType + ' order for ' + formatShares(parseInt(notification._attoshares, 16) / SHARES_DIVISOR).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._displayPrice, 16) / ETHER_DIVISOR).formatted + ' ETH'
        dispatch(callback(notification))
        break
      }

      // FeeWindow & Universe
      case 'BUY':
      case 'BUYPARTICIPATIONTOKENS':
        notification.description = 'Purchase ' + formatRep(notification._attotokens / REP_DIVISOR).formatted + ' Participation Token(s)'
        // dispatch(callback(notification))
        break

      // FillOrder & Trade
      case 'PUBLICFILLBESTORDER': // Not called directly by UI
      case 'PUBLICFILLBESTORDERWITHLIMIT':
      case 'PUBLICFILLORDER': { // Not called directly by UI
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, parseInt(notification._outcome, 16))
        const fillOrderType = (notification._type === '0x0') ? 'sell' : 'buy'
        notification.description = 'Fill ' + fillOrderType + ' order(s) for ' + formatShares(parseInt(notification._fxpAmount, 16) / SHARES_DIVISOR).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._price, 16) / ETHER_DIVISOR).formatted + ' ETH'
        // dispatch(callback(notification))
        break
      }

      // InitialReporter
      case 'MIGRATEREP': // TODO: Finish text
        notification.description = 'Migrate X REP to child universe [outcomeName]'
        break

      // Mailbox
      case 'WITHDRAWETHER': // TODO: Finish text
        notification.description = 'Withdraw X ETH to [address]'
        break
      case 'WITHDRAWTOKENS': // TODO: Finish text
        notification.description = 'Withdraw X tokens'
        break

      // Market
      case 'CONTRIBUTE': {
        const marketInfo = selectMarket(notification.market)
        const outcomeDescription = (notification._invalid) ? 'Invalid' : getOutcomeDescription(marketInfo, parseInt(notification.outcome, 10))
        notification.description = 'Place ' + formatRep(parseInt(notification._amount, 16) / REP_DIVISOR).formatted + ' REP on "' + outcomeDescription + '" dispute bond'
        // dispatch(callback(notification))
        break
      }
      case 'DISAVOWCROWDSOURCERS': // TODO: Write text
        notification.description = 'Make staked REP available for claiming'
        break
      case 'DOINITIALREPORT': {
        const marketDescription = selectMarket(notification.market).description
        notification.description = 'Submit report on "' + marketDescription + '"'
        // dispatch(callback(notification))
        break
      }
      case 'FINALIZE': {
        const marketDescription = selectMarket(notification.market).description
        notification.description = 'Finalize market "' + marketDescription + '"'
        // dispatch(callback(notification))
        break
      }
      case 'FINALIZEFORK':
        break
      case 'MIGRATETHROUGHONEFORK':
        break

      // ReputationToken
      case 'MIGRATEBALANCESFROMLEGACYREP':
        break
      case 'MIGRATEALLOWANCESFROMLEGACYREP':
        break
      case 'MIGRATEIN':
        break
      case 'MIGRATEOUT':
      case 'MIGRATEOUTBYPAYOUT':
        break
      case 'UPDATEPARENTTOTALTHEORETICALSUPPLY':
        break
      case 'UPDATESIBLINGMIGRATIONTOTAL':
        break

      // Trade
      case 'PUBLICBUY':
      case 'PUBLICBUYWITHLIMIT': // TODO: Finish text
        notification.description = 'Buy X share(s) of [outcomeName] at Y ETH'
        break
      case 'PUBLICSELL':
      case 'PUBLICSELLWITHLIMIT': // TODO: Finish text
        notification.description = 'Sell X share(s) of [outcomeName] at Y ETH'
        break
      case 'PUBLICTRADE': // Not called directly by UI
      case 'PUBLICTRADEWITHLIMIT': {
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, parseInt(notification._outcome, 16))
        const orderType = (notification._direction === '0x0') ? 'buy' : 'sell'
        notification.description = 'Place ' + orderType + ' order for ' + formatShares(parseInt(notification._fxpAmount, 16) / SHARES_DIVISOR).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._price, 16) / ETHER_DIVISOR).formatted + ' ETH'
        // dispatch(callback(notification))
        break
      }

      // TradingEscapeHatch
      case 'CLAIMSHARESINUPDATE':
        break
      case 'GETFROZENSHAREVALUEINMARKET':
        break

      // Universe
      case 'CREATEMARKET': // Not called directly by UI
      case 'CREATECATEGORICALMARKET':
      case 'CREATESCALARMARKET':
      case 'CREATEYESNOMARKET':
        notification.description = 'Create new market "' + notification._description + '"'
        // dispatch(callback(notification))
        break
      case 'CREATECHILDUNIVERSE': // TODO: Finish text
        notification.description = 'Create new child universe for outcome [outcomeName]'
        break
      case 'FORK':
        break
      case 'REDEEMSTAKE': // TODO: Finish text
        notification.description = 'Claim X REP'
        break
      case 'GETINITIALREPORTSTAKESIZE':
        break
      case 'GETORCACHEDESIGNATEDREPORTNOSHOWBOND':
        break
      case 'GETORCACHEDESIGNATEDREPORTSTAKE':
        break
      case 'GETORCACHEMARKETCREATIONCOST':
        break
      case 'GETORCACHEREPORTINGFEEDIVISOR':
        break
      case 'GETORCACHEVALIDITYBOND':
        break
      case 'GETORCREATECURRENTFEEWINDOW':
        break
      case 'GETORCREATEFEEWINDOWBYTIMESTAMP':
        break
      case 'GETORCREATENEXTFEEWINDOW':
        break
      case 'GETORCREATEPREVIOUSFEEWINDOW':
        break
      case 'UPDATEFORKVALUES':
        break

      // These transaction names are overloaded across multiple contracts
      case 'APPROVE':
        break
      case 'DECREASEAPPROVAL':
        break
      case 'DEPOSITETHER':
      case 'DEPOSITETHERFOR': // TODO: Finish text
        notification.description = 'Deposit X ETH to [address]'
        break
      case 'FORKANDREDEEM':
      case 'REDEEM': // TODO: Finish text
        notification.description = 'Claim X REP'
        break
      case 'REDEEMFORREPORTINGPARTICIPANT':
        break
      case 'INCREASEAPPROVAL':
        break
      case 'MIGRATE': // TODO: Finish text
        notification.description = 'Migrate market "[marketName]" to child universe'
        break
      case 'TRANSFER': // Ignore this case for now, as it seems redundant with SENDREPUTATION
        break
      case 'TRANSFERFROM':
        break
      case 'TRANSFEROWNERSHIP':
        break
      case 'WITHDRAWETHERTO': // TODO: Finish text
        notification.description = 'Withdraw X ETH to [address]'
        break
      case 'WITHDRAWINEMERGENCY':
        notification.description = ''
        break

      // augur.js functions
      case 'SENDETHER':
        notification.description = 'Send ' + formatEther(notification.etherToSend).formatted + ' ETH to ' + notification.to
        // dispatch(callback(notification))
        break
      case 'SENDREPUTATION':
        notification.description = 'Send ' + formatRep(notification.reputationToSend).formatted + ' REP to ' + notification._to
        // dispatch(callback(notification))
        break

      default: {
        const result = notification.type.replace(/([A-Z])/g, ' $1')
        notification.description = result.charAt(0).toUpperCase() + result.slice(1)
        break
      }
    }
    dispatch(callback(notification))
  }
}
