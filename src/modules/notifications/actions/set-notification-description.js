/**
 * @todo Add checks for hex params vs integer params?
 * @todo Test all transactions & canceling orphaned orders
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
    }

    switch (notification.type.toUpperCase()) {
      case 'CREATEMARKET': // Not called directly by UI
      case 'CREATECATEGORICALMARKET':
      case 'CREATESCALARMARKET':
      case 'CREATEYESNOMARKET':
        notification.description = 'Create new market "' + notification._description + '"'
        dispatch(callback(notification))
        break
      case 'CREATEORDER': // Not called directly by UI
      case 'PUBLICCREATEORDER': {
        // const marketInfo = selectMarket(notification._market)
        // const outcomeDescription = getOutcomeDescription(notification.marketObj, notification._outcome)
        // const orderType = (notification._type === '0x0') ? 'buy' : 'sell'
        // notification.description = 'Create ' + orderType + ' order for ' + formatShares(parseInt(notification._attoshares, 16) / SHARES_DIVISOR).formatted + ' share unit(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._displayPrice, 16) / ETHER_DIVISOR).formatted + ' ETH'
        // dispatch(callback(notification))
        break
      }
      case 'PUBLICTRADE': // Not called directly by UI
      case 'PUBLICTRADEWITHLIMIT': {
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, parseInt(notification._outcome, 16))
        const orderType = (notification._direction === '0x0') ? 'buy' : 'sell'
        notification.description = 'Place ' + orderType + ' order for ' + formatShares(parseInt(notification._fxpAmount, 16) / SHARES_DIVISOR).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._price, 16) / ETHER_DIVISOR).formatted + ' ETH'
        dispatch(callback(notification))
        break
      }
      case 'FILLORDER': // Not called directly by UI
      case 'PUBLICFILLBESTORDER': // Not called directly by UI
      case 'PUBLICFILLORDER': // Not called directly by UI
      case 'PUBLICFILLBESTORDERWITHLIMIT': {
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, parseInt(notification._outcome, 16))
        const fillOrderType = (notification._type === '0x0') ? 'sell' : 'buy'
        notification.description = 'Fill ' + fillOrderType + ' order(s) for ' + formatShares(parseInt(notification._fxpAmount, 16) / SHARES_DIVISOR).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._price, 16) / ETHER_DIVISOR).formatted + ' ETH'
        dispatch(callback(notification))
        break
      }
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
                dispatch(callback(notification))
              })
            })
          })
        })
        break
      }
      case 'DOINITIALREPORT': {
        const marketDescription = selectMarket(notification.market).description
        notification.description = 'Submit report on "' + marketDescription + '"'
        dispatch(callback(notification))
        break
      }
      case 'CONTRIBUTE': {
        const marketInfo = selectMarket(notification.market)
        const outcomeDescription = (notification._invalid) ? 'Invalid' : getOutcomeDescription(marketInfo, parseInt(notification.outcome, 10))
        notification.description = 'Place ' + formatRep(parseInt(notification._amount, 16) / REP_DIVISOR).formatted + ' REP on "' + outcomeDescription + '" dispute bond'
        dispatch(callback(notification))
        break
      }
      case 'BUYPARTICIPATIONTOKENS': // Not called directly by UI
      case 'BUY':
        notification.description = 'Purchase ' + formatRep(notification._attotokens / REP_DIVISOR).formatted + ' Participation Token(s)'
        dispatch(callback(notification))
        break
      case 'SENDETHER':
        notification.description = 'Send ' + formatEther(notification.etherToSend).formatted + ' ETH to ' + notification.to
        dispatch(callback(notification))
        break
      case 'SENDREPUTATION':
        notification.description = 'Send ' + formatRep(notification.reputationToSend).formatted + ' REP to ' + notification._to
        dispatch(callback(notification))
        break
      case 'TRANSFER': // Not called directly by UI. Ignore this case for now, as it seems redundant with SENDREPUTATION
        // notification.description = 'Transfer ' + formatRep(notification._value / REP_DIVISOR).formatted + ' REP to ' + notification._to
        // dispatch(callback(notification))
        break
      case 'FINALIZE': {
        const marketDescription = selectMarket(notification.market).description
        notification.description = 'Finalize market "' + marketDescription + '"'
        dispatch(callback(notification))
        break
      }
      case 'PUBLICSELLCOMPLETESETSWITHCASH': // Not called directly by UI
      case 'PUBLICSELLCOMPLETESETS':
        notification.description = 'Sell ' + formatShares(parseInt(notification._amount, 16) / SHARES_DIVISOR).formatted + ' complete sets for Y ETH'
        break
      case 'CLAIMTRADINGPROCEEDS':
        notification.description = 'Claim X ETH trading proceeds'
        break
      case 'WITHDRAWETHER':
      case 'WITHDRAWETHERTO':
      case 'WITHDRAWETHERTOIFPOSSIBLE':
        notification.description = 'Withdraw X ETH to [address]'
        break
      case 'MIGRATEOUTBYPAYOUT': // TODO: Write text
        break
      case 'MIGRATETHROUGHONEFORK': // TODO: Write text
        break

      // TODO: Events not called directly by UI. To be implemented/tested
      case 'REDEEM':
      case 'FORKANDREDEEM':
      case 'REDEEMSTAKE':
        notification.description = 'Claim X REP'
        break
      case 'FINALIZEFORK':
        notification.description = 'Finalize Fork'
        break
      case 'MIGRATE':
        notification.description = 'Migrate market "[marketName]" to child universe'
        break
      case 'MIGRATEREP':
        notification.description = 'Migrate X REP to child universe [outcomeName]'
        break
      case 'CREATECHILDUNIVERSE':
        notification.description = 'Create new child universe for outcome [outcomeName]'
        break
      case 'CREATEGENESISUNIVERSE':
        notification.description = 'Create new genesis universe'
        break
      case 'DEPOSITETHER':
      case 'DEPOSITETHERFOR':
        notification.description = 'Deposit X ETH to [address]'
        break
      case 'WITHDRAWTOKENS':
        notification.description = 'Withdraw X tokens'
        break
      case 'FORK':
        notification.description = 'Initiate Fork'
        break
      case 'DISAVOWCROWDSOURCERS':
        notification.description = 'Make staked REP available for claiming'
        break
      case 'PUBLICBUY':
      case 'PUBLICBUYWITHLIMIT':
        notification.description = 'Buy X share(s) of [outcomeName] at Y ETH'
        break
      case 'PUBLICSELL':
      case 'PUBLICSELLWITHLIMIT':
        notification.description = 'Sell X share(s) of [outcomeName] at Y ETH'
        break
      case 'BUYCOMPLETESETS':
      case 'PUBLICBUYCOMPLETESETS':
      case 'PUBLICBUYCOMPLETESETSWITHCASH':
        notification.description = 'Buy X complete sets for Y ETH'
        break
      // TODO: Create text for these as well as canceling orphaned order (src/modules/orphaned-orders/actions/index.js)
      case 'APPROVE':
      case 'APPROVESPENDERS':
      case 'CREATEUNIVERSE':
      case 'DECREASEAPPROVAL':
      case 'INCREASEAPPROVAL':
      case 'MIGRATEIN':
      case 'MIGRATEOUT':
      case 'REDEEMFORREPORTINGPARTICIPANT':
      case 'TRANSFERFROM':
      case 'TRANSFEROWNERSHIP':
      case 'UPDATEFORKVALUES':
      case 'UPDATEPARENTTOTALTHEORETICALSUPPLY':
      case 'UPDATESIBLINGMIGRATIONTOTAL':
      default: {
        const result = notification.description.replace(/([A-Z])/g, ' $1')
        notification.description = result.charAt(0).toUpperCase() + result.slice(1)
        break
      }
    }
  }
}
