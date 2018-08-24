export default function setNotificationTitle(notification, callback) {
  // console.log(notification);
  return (dispatch, getState) => {
    if (!notification) {
      throw new Error("Notification is not set");
    }
    if (!callback) {
      throw new Error("Callback function is not set");
    }
    if (!notification.type) {
      dispatch(callback(notification));
      return;
    }

    switch (notification.type.toUpperCase()) {
      // Augur
      case "CREATEGENESISUNIVERSE":
        notification.title = "Create genesis universe";
        break;

      // CancelOrder
      case "CANCELORDER":
        notification.title = "Cancel order";
        break;

      // Cash
      case "WITHDRAWETHERTOIFPOSSIBLE":
        notification.title = "Withdraw ETH";
        break;

      // ClaimTradingProceeds
      case "CALCULATEREPORTINGFEE":
        notification.title = "Calculate reporting fee";
        break;
      case "CLAIMTRADINGPROCEEDS":
        notification.title = "Claim trading proceeds";
        break;

      // CompleteSets
      case "PUBLICBUYCOMPLETESETS":
      case "PUBLICBUYCOMPLETESETSWITHCASH":
        notification.title = "Buy complete set(s)";
        break;
      case "PUBLICSELLCOMPLETESETS":
      case "PUBLICSELLCOMPLETESETSWITHCASH":
        notification.title = "Sell complete set(s)";
        break;

      // CreateOrder
      case "PUBLICCREATEORDER": {
        notification.title = "Create liquidity order";
        break;
      }

      // FeeWindow & Universe
      case "BUY":
      case "BUYPARTICIPATIONTOKENS":
        notification.title = "Buy participation token(s)";
        break;

      // FillOrder & Trade
      case "PUBLICFILLBESTORDER":
      case "PUBLICFILLBESTORDERWITHLIMIT":
      case "PUBLICFILLORDER":
        notification.title = "Fill order(s)";
        break;

      // InitialReporter
      case "MIGRATEREP":
        notification.title = "Migrate REP";
        break;

      // Mailbox
      case "WITHDRAWETHER":
        notification.title = "Withdraw ETH from mailbox";
        break;
      case "WITHDRAWTOKENS":
        notification.title = "Withdraw tokens from mailbox";
        break;

      // Market
      case "CONTRIBUTE":
        notification.title = "Contribute REP to crowdsourcer";
        break;
      case "DISAVOWCROWDSOURCERS":
        notification.title = "Make staked REP available for claiming";
        break;
      case "DOINITIALREPORT":
        notification.title = "Submit report";
        break;
      case "FINALIZE":
        notification.title = "Finalize market";
        break;
      case "FINALIZEFORK":
        notification.title = "Finalize forked market";
        break;
      case "MIGRATETHROUGHONEFORK":
        notification.title = "Migrate market to winning child universe";
        break;

      // ReputationToken
      case "MIGRATEBALANCESFROMLEGACYREP":
        notification.title = "Migrate balances from legacy REP contract";
        break;
      case "MIGRATEALLOWANCESFROMLEGACYREP":
        notification.title = "Migrate allowances from legacy REP contract";
        break;
      case "MIGRATEIN":
        notification.title = "Migrate REP into universe";
        break;
      case "MIGRATEOUT":
      case "MIGRATEOUTBYPAYOUT":
        notification.title = "Migrate REP out of universe";
        break;
      case "UPDATEPARENTTOTALTHEORETICALSUPPLY":
        notification.title =
          "Update theoretical REP supply for parent universe";
        break;
      case "UPDATESIBLINGMIGRATIONTOTAL":
        notification.title =
          "Update theoretical REP supply for sibling universe";
        break;

      // Trade
      case "PUBLICBUY":
      case "PUBLICBUYWITHLIMIT":
        notification.title = "Buy share(s)";
        break;
      case "PUBLICSELL":
      case "PUBLICSELLWITHLIMIT":
        notification.title = "Sell share(s)";
        break;
      case "PUBLICTRADE":
      case "PUBLICTRADEWITHLIMIT": {
        notification.title = "Place trade";
        break;
      }

      // TradingEscapeHatch
      case "CLAIMSHARESINUPDATE":
        notification.title = "Claim share(s) from market";
        break;
      case "GETFROZENSHAREVALUEINMARKET":
        notification.title = "Liquidate share(s) in market to ETH";
        break;

      // Universe
      case "CREATEMARKET":
      case "CREATECATEGORICALMARKET":
      case "CREATESCALARMARKET":
      case "CREATEYESNOMARKET":
        notification.title = "Create new market";
        break;
      case "CREATECHILDUNIVERSE":
        notification.title = "Create child universe";
        break;
      case "FORK":
        notification.title = "Initiate fork";
        break;
      case "REDEEMSTAKE":
        notification.title = "Claim staked REP/Ether";
        break;
      case "GETINITIALREPORTSTAKESIZE":
        notification.title = "Get initial report stake size";
        break;
      case "GETORCACHEDESIGNATEDREPORTNOSHOWBOND":
        notification.title = "Get no-show bond size for markets";
        break;
      case "GETORCACHEDESIGNATEDREPORTSTAKE":
        notification.title = "Get stake size required for desginated reports";
        break;
      case "GETORCACHEMARKETCREATIONCOST":
        notification.title = "Get market creation cost";
        break;
      case "GETORCACHEREPORTINGFEEDIVISOR":
        notification.title = "Get reporting fee divisor";
        break;
      case "GETORCACHEVALIDITYBOND":
        notification.title =
          "Get validity bond size required for market creation";
        break;
      case "GETORCREATECURRENTFEEWINDOW":
        notification.title = "Get/create current fee window address";
        break;
      case "GETORCREATEFEEWINDOWBYTIMESTAMP":
        notification.title = "Get/create fee window by timestamp";
        break;
      case "GETORCREATENEXTFEEWINDOW":
        notification.title = "Get/create next fee window";
        break;
      case "GETORCREATEPREVIOUSFEEWINDOW":
        notification.title = "Get/create previous fee window";
        break;
      case "UPDATEFORKVALUES":
        notification.title = "Update fork values";
        break;

      // These transaction names are overloaded across multiple contracts
      case "APPROVE":
        notification.title = "Approve spending";
        break;
      case "DECREASEAPPROVAL":
        notification.title = "Decrease spending approval";
        break;
      case "DEPOSITETHER":
      case "DEPOSITETHERFOR":
        notification.title = "Deposit ETH";
        break;
      case "FORKANDREDEEM":
      case "REDEEM":
      case "REDEEMFORREPORTINGPARTICIPANT":
        notification.title = "Claim funds";
        break;
      case "INCREASEAPPROVAL":
        notification.title = "Increase spending approval";
        break;
      case "MIGRATE":
        notification.title = "Migrate funds";
        break;
      case "TRANSFER":
      case "TRANSFERFROM":
      case "TRANSFEROWNERSHIP":
        notification.title = "Transfer funds";
        break;
      case "WITHDRAWETHERTO":
        notification.title = "Withdraw ETH";
        break;
      case "WITHDRAWINEMERGENCY":
        notification.title = "Withdraw funds";
        break;

      // augur.js functions
      case "SENDETHER":
        notification.title = "Send ETH";
        break;
      case "SENDREPUTATION":
        notification.title = "Send REP";
        break;

      default: {
        const result = notification.type.replace(/([A-Z])/g, " $1");
        notification.title = result.charAt(0).toUpperCase() + result.slice(1);
        break;
      }
    }
    notification.description = "";
    dispatch(callback(notification));
  };
}
