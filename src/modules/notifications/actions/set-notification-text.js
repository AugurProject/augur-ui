/**
 * @todo Test un-tested notification types. (Must be done by making calls via the API.)
 */

import { augur } from 'services/augurjs'
import { selectMarket } from 'modules/market/selectors/market'
import { formatEther, formatRep, formatShares } from 'utils/format-number'

function getOutcomeDescription(marketInfo, outcomeIndex) {
  if (marketInfo.marketType.toUpperCase() === 'YESNO') {
    return (outcomeIndex === 0) ? 'No' : 'Yes'
  }
  return marketInfo.outcomes[outcomeIndex].description
}

export default function setNotificationText(notification, callback) {
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
      case 'CREATEMARKET': // Not tested
      case 'CREATECATEGORICALMARKET':
      case 'CREATESCALARMARKET':
      case 'CREATEYESNOMARKET':
        notification.title = 'Create new market "' + notification._description + '"'
        dispatch(callback(notification))
        break
      case 'CREATEORDER': // Not tested
      case 'PUBLICCREATEORDER': {
        const outcomeDescription = getOutcomeDescription(notification.marketObj, notification._outcome)
        const orderType = (notification._type === '0x0') ? 'buy' : 'sell'
        notification.title = 'Create ' + orderType + ' order for ' + formatShares(parseInt(notification._attoshares, 16) / 100000000000000).formatted + ' share unit(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._displayPrice, 16) / 10000).formatted + ' ETH'
        dispatch(callback(notification))
        break
      }
      case 'PUBLICTRADE': // Not tested
      case 'PUBLICTRADEWITHLIMIT': {
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, parseInt(notification._outcome, 16))
        const orderType = (notification._direction === '0x0') ? 'buy' : 'sell'
        notification.title = 'Place ' + orderType + ' order for ' + formatShares(parseInt(notification._fxpAmount, 16) / 100000000000000).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._price, 16) / 10000).formatted + ' ETH'
        dispatch(callback(notification))
        break
      }
      case 'FILLORDER': // Not tested
      case 'PUBLICFILLBESTORDER': // Not tested
      case 'PUBLICFILLORDER': // Not tested
      case 'PUBLICFILLBESTORDERWITHLIMIT': {
        const marketInfo = selectMarket(notification._market)
        const outcomeDescription = getOutcomeDescription(marketInfo, parseInt(notification._outcome, 16))
        const fillOrderType = (notification._type === '0x0') ? 'sell' : 'buy'
        notification.title = 'Fill ' + fillOrderType + ' order(s) for ' + formatShares(parseInt(notification._fxpAmount, 16) / 100000000000000).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(parseInt(notification._price, 16) / 10000).formatted + ' ETH'
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
                notification.title = 'Cancel order for ' + formatShares(orderAmount / 100000000000000).formatted + ' share(s) of "' + outcomeDescription + '" at ' + formatEther(orderPrice / 10000).formatted + ' ETH'
                dispatch(callback(notification))
              })
            })
          })
        })
        break
      }
      case 'DOINITIALREPORT': {
        const marketDescription = selectMarket(notification.market).description
        notification.title = 'Submit report on "' + marketDescription + '"'
        dispatch(callback(notification))
        break
      }
      case 'CONTRIBUTE': {
        const marketInfo = selectMarket(notification.market)
        const outcomeDescription = (notification._invalid) ? 'Invalid' : getOutcomeDescription(marketInfo, parseInt(notification.outcome, 10))
        notification.title = 'Place ' + formatRep(parseInt(notification._amount, 16) / 1000000000000000000).formatted + ' REP on "' + outcomeDescription + '" dispute bond'
        dispatch(callback(notification))
        break
      }
      case 'BUYPARTICIPATIONTOKENS': // Not tested
      case 'BUY':
        notification.title = 'Purchase ' + formatRep(notification._attotokens / 1000000000000000000).formatted + ' Participation Token(s)'
        dispatch(callback(notification))
        break
      case 'SENDETHER':
        notification.title = 'Send ' + formatEther(notification.etherToSend).formatted + ' ETH to ' + notification.to
        dispatch(callback(notification))
        break
      case 'SENDREPUTATION':
        notification.title = 'Send ' + formatRep(notification.reputationToSend).formatted + ' REP to ' + notification._to
        dispatch(callback(notification))
        break
      case 'TRANSFER':
        // Ignore this case for now, as it seems redundant with SENDREPUTATION

        // notification.title = 'Transfer ' + formatRep(notification._value / 1000000000000000000).formatted + ' REP to ' + notification._to
        // dispatch(callback(notification))
        break
      case 'FINALIZE': {
        const marketDescription = selectMarket(notification.market).description
        notification.title = 'Finalize market "' + marketDescription + '"'
        dispatch(callback(notification))
        break
      }
      case 'CLAIMTRADINGPROCEEDS':
        notification.title = 'Claim X ETH trading proceeds'
        break
      case 'FORK':
        notification.title = 'Initiate Fork'
        break
      case 'DISAVOWCROWDSOURCERS':
        notification.title = 'Make staked REP available for claiming'
        break
      case 'REDEEM':
      case 'FORKANDREDEEM':
      case 'REDEEMSTAKE':
        notification.title = 'Claim X REP'
        break
      case 'FINALIZEFORK':
        notification.title = 'Finalize Fork'
        break
      case 'MIGRATE':
        notification.title = 'Migrate market "[marketName]" to child universe'
        break
      case 'MIGRATEREP':
        notification.title = 'Migrate X REP to child universe [outcomeName]'
        break
      case 'CREATECHILDUNIVERSE':
        notification.title = 'Create new child universe for outcome [outcomeName]'
        break
      case 'CREATEGENESISUNIVERSE': // Not tested
        notification.title = 'Create new genesis universe'
        break
      case 'DEPOSITETHER':
      case 'DEPOSITETHERFOR':
        notification.title = 'Deposit X ETH to [address]'
        break
      case 'WITHDRAWETHER':
      case 'WITHDRAWETHERTO':
      case 'WITHDRAWETHERTOIFPOSSIBLE':
        notification.title = 'Withdraw X ETH to [address]'
        break
      case 'WITHDRAWTOKENS':
        notification.title = 'Withdraw X tokens'
        break

      case 'PUBLICBUY': // Not tested
      case 'PUBLICBUYWITHLIMIT': // Not tested
        notification.title = 'Buy X share(s) of [outcomeName] at Y ETH'
        break
      case 'PUBLICSELL': // Not tested
      case 'PUBLICSELLWITHLIMIT': // Not tested
        notification.title = 'Sell X share(s) of [outcomeName] at Y ETH'
        break
      case 'BUYCOMPLETESETS': // Not tested
      case 'PUBLICBUYCOMPLETESETS': // Not tested
      case 'PUBLICBUYCOMPLETESETSWITHCASH': // Not tested
        notification.title = 'Buy X complete sets for Y ETH'
        break
      case 'PUBLICSELLCOMPLETESETS': // Not tested
      case 'PUBLICSELLCOMPLETESETSWITHCASH': // Not tested
        notification.title = 'Sell X complete sets for Y ETH'
        break

      // TODO: Create text for these as well as canceling orphaned order (src/modules/orphaned-orders/actions/index.js)
      case 'APPROVE':
      case 'APPROVESPENDERS':
      case 'CREATEUNIVERSE':
      case 'DECREASEAPPROVAL':
      case 'INCREASEAPPROVAL':
      case 'MIGRATEIN':
      case 'MIGRATEOUT':
      case 'MIGRATEOUTBYPAYOUT':
      case 'MIGRATETHROUGHONEFORK':
      case 'REDEEMFORREPORTINGPARTICIPANT':
      case 'TRANSFERFROM':
      case 'TRANSFEROWNERSHIP':
      case 'UPDATEFORKVALUES':
      case 'UPDATEPARENTTOTALTHEORETICALSUPPLY':
      case 'UPDATESIBLINGMIGRATIONTOTAL':
      default: {
        const result = notification.title.replace(/([A-Z])/g, ' $1')
        notification.title = result.charAt(0).toUpperCase() + result.slice(1)
        break
      }
    }
  }
}
