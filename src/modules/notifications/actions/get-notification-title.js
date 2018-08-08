export function getNotificationTitle(notification) {
  let titleString
  switch (notification.type.toUpperCase()) {
    case 'CREATEMARKET':
    case 'CREATEYESNOMARKET':
    case 'CREATECATEGORICALMARKET':
    case 'CREATESCALARMARKET':
      titleString = 'Create new market ' + notification._description
      break
    case 'CREATEORDER':
    case 'PUBLICCREATEORDER':
    case 'PUBLICTRADE': // TBD
    case 'PUBLICTRADEWITHLIMIT': // TBD
      titleString = 'Place order for X shares(s) of [outcomeName] at Y ETH'
      break
    case 'FILLORDER':
    case 'PUBLICFILLBESTORDER':
    case 'PUBLICFILLBESTORDERWITHLIMIT':
    case 'PUBLICFILLORDER':
      titleString = 'Fill order for X shares(s) of [outcomeName] at Y ETH'
      break
    case 'BUY':
    case 'PUBLICBUY':
    case 'PUBLICBUYWITHLIMIT':
      titleString = 'Buy X share(s) of [outcomeName] at Y ETH'
      break
    case 'PUBLICSELL':
    case 'PUBLICSELLWITHLIMIT':
      titleString = 'Sell X share(s) of [outcomeName] at Y ETH'
      break
    case 'CANCELORDER':
      titleString = 'Cancel order for X share(s) of [outcomeName] at Y ETH'
      break
    case 'BUYCOMPLETESETS':
    case 'PUBLICBUYCOMPLETESETS':
    case 'PUBLICBUYCOMPLETESETSWITHCASH':
      titleString = 'Buy X complete sets for Y ETH'
      break
    case 'PUBLICSELLCOMPLETESETS':
    case 'PUBLICSELLCOMPLETESETSWITHCASH':
      titleString = 'Sell X complete sets for Y ETH'
      break
    case 'DOINITIALREPORT':
      titleString = 'Submit report on "[marketName]"'
      break
    case 'CONTRIBUTE':
      titleString = 'Place X REP on [outcomeName] dispute bond'
      break
    case 'BUYPARTICIPATIONTOKENS':
      titleString = 'Purchase X Participation Tokens'
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
    // TODO
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
