export default function getNotificationTitle(notification) {
  let titleString
  console.log('NOTIFICATION: ', notification)
  switch (notification.type.toUpperCase()) {
    case 'CREATEMARKET': // Not tested
    case 'CREATECATEGORICALMARKET':
    case 'CREATESCALARMARKET':
    case 'CREATEYESNOMARKET':
      titleString = 'Create new market "' + notification._description + '"'
      break
    case 'CREATEORDER': // Not tested
    case 'PUBLICCREATEORDER': // TODO: Look up outcome name
      titleString = 'Create order for ' + parseInt(notification._attoshares, 16) + ' share unit(s) of "' + parseInt(notification._outcome, 16) + '" at ' + (parseInt(notification._displayPrice, 16) / 10000) + ' ETH'
      break
    case 'PUBLICTRADE': // Not tested
    case 'PUBLICTRADEWITHLIMIT': // TODO: Look up outcome name
      titleString = 'Place order for ' + parseInt(notification._fxpAmount, 16) + ' share unit(s) of "' + parseInt(notification._outcome, 16) + '" at ' + (parseInt(notification._price, 16) / 10000) + ' ETH'
      break
    case 'FILLORDER': // Not tested
    case 'PUBLICFILLBESTORDER': // Not tested
    case 'PUBLICFILLORDER': // Not tested
    case 'PUBLICFILLBESTORDERWITHLIMIT': // TODO: Look up outcome name
      titleString = 'Fill order for ' + parseInt(notification._fxpAmount, 16) + ' share unit(s) of "' + parseInt(notification._outcome, 16) + '" at ' + (parseInt(notification._price, 16) / 10000) + ' ETH'
      break
    case 'CANCELORDER': // TODO: Look up share units, outcome name, and price
      titleString = 'Cancel order for X share unit(s) of [outcomeName] at Y ETH'
      break
    case 'DOINITIALREPORT': // TODO: Look up market name
      titleString = 'Submit report on "' + notification.marketName + "'"
      break
    case 'CONTRIBUTE': // TODO: Look up outcome name
      titleString = 'Place ' + notification._amount + ' REP on [outcomeName] dispute bond'
      break
    case 'BUYPARTICIPATIONTOKENS': // Not tested
    case 'BUY':
      titleString = 'Purchase ' + (notification._attotokens / 1000000000000000000) + ' Participation Token(s)'
      break
    case 'SENDETHER':
      titleString = 'Send ' + notification.etherToSend + ' ETH to ' + notification.to
      break
    case 'SENDREPUTATION': // Not tested
      titleString = 'Send ' + notification.reputationToSend + ' ETH to ' + notification.to
      break

    case 'FINALIZE':
      titleString = 'Finalize market "[marketName]"'
      break
    case 'CLAIMTRADINGPROCEEDS':
      titleString = 'Claim X ETH trading proceeds'
      break
    case 'FORK':
      titleString = 'Initiate Fork'
      break
    case 'DISAVOWCROWDSOURCERS':
      titleString = 'Make staked REP available for claiming'
      break
    case 'REDEEM':
    case 'FORKANDREDEEM':
    case 'REDEEMSTAKE':
      titleString = 'Claim X REP'
      break
    case 'FINALIZEFORK':
      titleString = 'Finalize Fork'
      break
    case 'MIGRATE':
      titleString = 'Migrate market "[marketName]" to child universe'
      break
    case 'MIGRATEREP':
      titleString = 'Migrate X REP to child universe [outcomeName]'
      break
    case 'CREATECHILDUNIVERSE':
      titleString = 'Create new child universe for outcome [outcomeName]'
      break
    case 'CREATEGENESISUNIVERSE':
      titleString = 'Create new genesis universe'
      break
    case 'DEPOSITETHER':
    case 'DEPOSITETHERFOR':
      titleString = 'Deposit X ETH to [address]'
      break
    case 'WITHDRAWETHER':
    case 'WITHDRAWETHERTO':
    case 'WITHDRAWETHERTOIFPOSSIBLE':
      titleString = 'Withdraw X ETH to [address]'
      break
    case 'WITHDRAWTOKENS':
      titleString = 'Withdraw X tokens'
      break

    // To test?
    case 'PUBLICBUY': // Not tested
    case 'PUBLICBUYWITHLIMIT': // Not tested
      titleString = 'Buy X share(s) of [outcomeName] at Y ETH'
      break
    case 'PUBLICSELL': // Not tested
    case 'PUBLICSELLWITHLIMIT': // Not tested
      titleString = 'Sell X share(s) of [outcomeName] at Y ETH'
      break
    case 'BUYCOMPLETESETS': // Not tested
    case 'PUBLICBUYCOMPLETESETS': // Not tested
    case 'PUBLICBUYCOMPLETESETSWITHCASH': // Not tested
      titleString = 'Buy X complete sets for Y ETH'
      break
    case 'PUBLICSELLCOMPLETESETS': // Not tested
    case 'PUBLICSELLCOMPLETESETSWITHCASH': // Not tested
      titleString = 'Sell X complete sets for Y ETH'
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
      titleString = result.charAt(0).toUpperCase() + result.slice(1)
      break
    }
  }
  return titleString
}
