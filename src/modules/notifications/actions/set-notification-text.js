import { augur } from 'services/augurjs'
import { formatShares } from 'utils/format-number'

export default function setNotificationText(notification) {
  console.log('NOTIFICATION: ', notification)
  switch (notification.type.toUpperCase()) {
    case 'CREATEMARKET': // Not tested
    case 'CREATECATEGORICALMARKET':
    case 'CREATESCALARMARKET':
    case 'CREATEYESNOMARKET':
      notification.title = 'Create new market "' + notification._description + '"'
      break
    case 'CREATEORDER': // Not tested
    case 'PUBLICCREATEORDER': // TODO: Look up outcome name
      notification.title = 'Create order for ' + formatShares(notification._attoshares).decimals + ' share unit(s) of "' + parseInt(notification._outcome, 16) + '" at ' + (parseInt(notification._displayPrice, 16) / 10000) + ' ETH'
      break
    case 'PUBLICTRADE': // Not tested
    case 'PUBLICTRADEWITHLIMIT': // TODO: Look up outcome name
      console.log("notification before", notification)
      augur.markets.getMarketsInfo({ marketIds: [notification._market] }, (err, marketsDataArray) => {
        if (err) {
          // Handle error
        }
        console.log("marketsDataArray", marketsDataArray)
        console.log(marketsDataArray[0][outcomes])
        notification.title = 'Place order for ' + parseInt(notification._fxpAmount, 16) + ' share unit(s) of "' + parseInt(notification._outcome, 16) + '" at ' + (parseInt(notification._price, 16) / 10000) + ' ETH'
      })
      break
    case 'FILLORDER': // Not tested
    case 'PUBLICFILLBESTORDER': // Not tested
    case 'PUBLICFILLORDER': // Not tested
    case 'PUBLICFILLBESTORDERWITHLIMIT': // TODO: Look up outcome name
      notification.title = 'Fill order for ' + parseInt(notification._fxpAmount, 16) + ' share unit(s) of "' + parseInt(notification._outcome, 16) + '" at ' + (parseInt(notification._price, 16) / 10000) + ' ETH'
      break
    case 'CANCELORDER': // TODO: Look up share units, outcome name, and price
      notification.title = 'Cancel order for X share unit(s) of [outcomeName] at Y ETH'
      break
    case 'DOINITIALREPORT': // TODO: Look up market name
      notification.title = 'Submit report on "' + notification.marketName + "'"
      break
    case 'CONTRIBUTE': // TODO: Look up outcome name
      notification.title = 'Place ' + notification._amount + ' REP on [outcomeName] dispute bond'
      break
    case 'BUYPARTICIPATIONTOKENS': // Not tested
    case 'BUY':
      notification.title = 'Purchase ' + (notification._attotokens / 1000000000000000000) + ' Participation Token(s)'
      break
    case 'SENDETHER':
      notification.title = 'Send ' + notification.etherToSend + ' ETH to ' + notification.to
      break
    case 'SENDREPUTATION': // Not tested
      notification.title = 'Send ' + notification.reputationToSend + ' ETH to ' + notification.to
      break

    case 'FINALIZE':
      notification.title = 'Finalize market "[marketName]"'
      break
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
    case 'CREATEGENESISUNIVERSE':
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

    // To test?
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

    // Create text?
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
    case 'TRANSFER':
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
