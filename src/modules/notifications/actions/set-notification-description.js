/**
 * @todo Finish TODO descriptions
 * @todo Remove "// Not called directly by UI" lines
 * @todo Add checks for hex params vs integer params?
 * @todo Test all transactions & canceling orphaned orders (src/modules/orphaned-orders/actions/index.js)
 */

import { selectMarket } from "modules/market/selectors/market";
import { formatEther, formatRep, formatShares } from "utils/format-number";

const ETHER_DIVISOR = 10000;
const REP_DIVISOR = 1000000000000000000;
const SHARES_DIVISOR = 100000000000000;

function getOutcomeDescription(marketInfo, outcomeIndex) {
  console.log("marketInfo", marketInfo);
  if (marketInfo.marketType.toUpperCase() === "YESNO") {
    return outcomeIndex === 0 ? "No" : "Yes";
  }
  return marketInfo.outcomes[outcomeIndex].description;
}

export default function setNotificationDescription(
  notification,
  transactionParams,
  callback
) {
  console.log("setNotificationDescription notification:", notification);
  console.log(
    "setNotificationDescription transactionParams:",
    transactionParams
  );
  return (dispatch, getState) => {
    if (!notification) {
      throw new Error("Notification is not set");
    }
    if (!callback) {
      throw new Error("Callback function is not set");
    }
    if (
      !transactionParams ||
      !notification.log ||
      !notification.log.eventName
    ) {
      dispatch(callback(notification));
      return;
    }

    switch (transactionParams.type.toUpperCase()) {
      // Augur
      case "CREATEGENESISUNIVERSE":
        break;

      // CancelOrder
      case "CANCELORDER": {
        const marketInfo = selectMarket(notification.log.marketId);
        const outcomeDescription = getOutcomeDescription(
          marketInfo,
          notification.log.outcome
        );
        notification.description =
          'Cancel order for share(s) of "' +
          outcomeDescription +
          '" at ' +
          formatEther(notification.log.price).formatted +
          " ETH";
        break;
      }

      // Cash
      case "WITHDRAWETHERTOIFPOSSIBLE": // TODO: Test
        // notification.description =
        //   "Withdraw " +
        //   formatEther(transactionParams._amount / ETHER_DIVISOR) +
        //   " ETH to " +
        //   transactionParams._to;
        break;

      // ClaimTradingProceeds
      case "CALCULATEREPORTINGFEE":
        break;
      case "CLAIMTRADINGPROCEEDS": // TODO: Finish text. Use transactionParams._amount or ??? to get amount
        // notification.description = "Claim X ETH trading proceeds";
        break;

      // CompleteSets
      case "BUYCOMPLETESETS":
      case "PUBLICBUYCOMPLETESETS":
      case "PUBLICBUYCOMPLETESETSWITHCASH": // TODO: Finish text. Find a way to get cost in ETH
        // notification.description =
        //   "Buy " + transactionParams._amount + " complete sets for Y ETH";
        break;
      case "PUBLICSELLCOMPLETESETSWITHCASH": // Not called directly by UI
      case "PUBLICSELLCOMPLETESETS": // TODO: Finish text
        // notification.description =
        //   "Sell " +
        //   formatShares(parseInt(notification._amount, 16) / SHARES_DIVISOR)
        //     .formatted +
        //   " complete sets for Y ETH";
        break;

      // CreateOrder
      case "PUBLICCREATEORDER": {
        const marketInfo = selectMarket(notification.log.marketId);
        const outcomeDescription = getOutcomeDescription(
          marketInfo,
          notification.log.outcome
        );
        notification.description =
          "Create " +
          notification.log.orderType +
          " order for " +
          formatShares(notification.log.amount).formatted +
          ' share(s) of "' +
          outcomeDescription +
          '" at ' +
          formatEther(notification.log.price).formatted +
          " ETH";
        break;
      }

      // FeeWindow & Universe
      case "BUY":
      case "BUYPARTICIPATIONTOKENS":
        notification.description =
          "Purchase " +
          formatRep(notification.log.value / REP_DIVISOR).formatted +
          " Participation Token(s)";
        break;

      // FillOrder & Trade
      case "PUBLICFILLBESTORDER": // Not called directly by UI
      case "PUBLICFILLBESTORDERWITHLIMIT":
      case "PUBLICFILLORDER": { // TODO: Test
        // Not called directly by UI
        const marketInfo = selectMarket(notification.log.marketId);
        const outcomeDescription = getOutcomeDescription(
          marketInfo,
          notification.log.outcome
        );
        notification.description =
          "Fill " +
          notification.log.orderType +
          " order(s) for " +
          formatShares(parseInt(notification._fxpAmount, 16) / SHARES_DIVISOR)
            .formatted +
          " share(s) of " +
          outcomeDescription +
          " at " +
          formatEther(parseInt(notification._price, 16) / ETHER_DIVISOR)
            .formatted +
          " ETH";
        break;
      }

      // InitialReporter
      case "MIGRATEREP": // TODO: Finish text
        // notification.description =
        //   "Migrate X REP to child universe [outcomeName]";
        break;

      // Mailbox
      case "WITHDRAWETHER": // TODO: Finish text
        // notification.description = "Withdraw X ETH to [address]";
        break;
      case "WITHDRAWTOKENS": // TODO: Finish text
        // notification.description = "Withdraw X tokens";
        break;

      // Market
      case "CONTRIBUTE": {
        const marketInfo = selectMarket(notification.market);
        const outcomeDescription = notification._invalid
          ? "Invalid"
          : getOutcomeDescription(
              marketInfo,
              parseInt(notification.outcome, 10)
            );
        notification.description =
          "Place " +
          formatRep(parseInt(notification._amount, 16) / REP_DIVISOR)
            .formatted +
          " REP on " +
          outcomeDescription +
          " dispute bond";
        break;
      }
      case "DISAVOWCROWDSOURCERS":
        break;
      case "DOINITIALREPORT": {
        const marketDescription = selectMarket(notification.log.marketId)
          .description;
        notification.description = "Submit report on " + marketDescription + "";
        break;
      }
      case "FINALIZE": {
        const marketDescription = selectMarket(notification.log.marketId)
          .description;
        notification.description = "Finalize market " + marketDescription + "";
        break;
      }
      case "FINALIZEFORK":
        break;
      case "MIGRATETHROUGHONEFORK":
        break;

      // ReputationToken
      case "MIGRATEBALANCESFROMLEGACYREP":
        break;
      case "MIGRATEALLOWANCESFROMLEGACYREP":
        break;
      case "MIGRATEIN":
        break;
      case "MIGRATEOUT":
      case "MIGRATEOUTBYPAYOUT":
        break;
      case "UPDATEPARENTTOTALTHEORETICALSUPPLY":
        break;
      case "UPDATESIBLINGMIGRATIONTOTAL":
        break;

      // Trade
      case "PUBLICBUY":
      case "PUBLICBUYWITHLIMIT": // TODO: Finish text
        // notification.description = "Buy X share(s) of [outcomeName] at Y ETH";
        break;
      case "PUBLICSELL":
      case "PUBLICSELLWITHLIMIT": // TODO: Finish text
        // notification.description = "Sell X share(s) of [outcomeName] at Y ETH";
        break;
      case "PUBLICTRADE": // Not called directly by UI
      case "PUBLICTRADEWITHLIMIT": {
        const marketInfo = selectMarket(notification.log.marketId);
        const outcomeDescription = getOutcomeDescription(
          marketInfo,
          parseInt(transactionParams._outcome, 16)
        );
        const orderType = notification._direction === "0x0" ? "buy" : "sell";
        notification.description =
          "Place " +
          orderType +
          " order for " +
          formatShares(
            parseInt(transactionParams._fxpAmount, 16) / SHARES_DIVISOR
          ).formatted +
          " share(s) of " +
          outcomeDescription +
          " at " +
          formatEther(parseInt(transactionParams._price, 16) / ETHER_DIVISOR)
            .formatted +
          " ETH";
        break;
      }

      // TradingEscapeHatch
      case "CLAIMSHARESINUPDATE":
        break;
      case "GETFROZENSHAREVALUEINMARKET":
        break;

      // Universe
      case "CREATEMARKET": // Not called directly by UI
      case "CREATECATEGORICALMARKET":
      case "CREATESCALARMARKET":
      case "CREATEYESNOMARKET":
        notification.description =
          "Create new market " + notification._description + "";
        break;
      case "CREATECHILDUNIVERSE": // TODO: Finish text
        // notification.description =
        //   "Create new child universe for outcome [outcomeName]";
        break;
      case "FORK":
        break;
      case "REDEEMSTAKE": // TODO: Finish text
        // notification.description = "Claim X REP";
        break;
      case "GETINITIALREPORTSTAKESIZE":
        break;
      case "GETORCACHEDESIGNATEDREPORTNOSHOWBOND":
        break;
      case "GETORCACHEDESIGNATEDREPORTSTAKE":
        break;
      case "GETORCACHEMARKETCREATIONCOST":
        break;
      case "GETORCACHEREPORTINGFEEDIVISOR":
        break;
      case "GETORCACHEVALIDITYBOND":
        break;
      case "GETORCREATECURRENTFEEWINDOW":
        break;
      case "GETORCREATEFEEWINDOWBYTIMESTAMP":
        break;
      case "GETORCREATENEXTFEEWINDOW":
        break;
      case "GETORCREATEPREVIOUSFEEWINDOW":
        break;
      case "UPDATEFORKVALUES":
        break;

      // These transaction names are overloaded across multiple contracts
      case "APPROVE":
        break;
      case "DECREASEAPPROVAL":
        break;
      case "DEPOSITETHER":
      case "DEPOSITETHERFOR": // TODO: Finish text
        // notification.description = "Deposit X ETH to [address]";
        break;
      case "FORKANDREDEEM":
      case "REDEEM": // TODO: Finish text
        // notification.description = "Claim X REP";
        break;
      case "REDEEMFORREPORTINGPARTICIPANT":
        break;
      case "INCREASEAPPROVAL":
        break;
      case "MIGRATE": // TODO: Finish text
        // notification.description =
        //   "Migrate market [marketName] to child universe";
        break;
      case "TRANSFER": // Ignore this case for now, as it seems redundant with SENDREPUTATION
        break;
      case "TRANSFERFROM":
        break;
      case "TRANSFEROWNERSHIP":
        break;
      case "WITHDRAWETHERTO": // TODO: Finish text
        // notification.description = "Withdraw X ETH to [address]";
        break;
      case "WITHDRAWINEMERGENCY":
        break;

      // augur.js functions
      case "SENDETHER":
        notification.description =
          "Send " +
          formatEther(notification.etherToSend).formatted +
          " ETH to " +
          notification.to;
        break;
      case "SENDREPUTATION":
        notification.description =
          "Send " +
          formatRep(notification.reputationToSend).formatted +
          " REP to " +
          notification._to;
        break;

      // case "MARKETCREATED":
      //   notification.description =
      //     'Create new market "' + notification.log.description + '"';
      //   break;
      // case "ORDERCANCELED": {
      //   const marketInfo = selectMarket(notification.log.marketId);
      //   const outcomeDescription = getOutcomeDescription(
      //     marketInfo,
      //     notification.log.outcome
      //   );
      //   notification.description =
      //     "Cancel order for share(s) of " +
      //     outcomeDescription +
      //     " at " +
      //     formatEther(notification.log.price).formatted +
      //     " ETH";
      //   break;
      // }
      // case "ORDERCREATED": {
      //   const marketInfo = selectMarket(notification.log.marketId);
      //   const outcomeDescription = getOutcomeDescription(
      //     marketInfo,
      //     notification.log.outcome
      //   );
      //   notification.description =
      //     "Create " +
      //     notification.log.orderType +
      //     " order for " +
      //     formatShares(notification.log.fullPrecisionAmount).formatted +
      //     ' share(s) of "' +
      //     outcomeDescription +
      //     '" at ' +
      //     formatEther(notification.log.fullPrecisionPrice).formatted +
      //     " ETH";
      //   break;
      // }
      // case "TOKENSTRANSFERRED": {
      //   console.log(userInfo);
      //   console.log("!!!!!!", windowRef.localStorage.getItem(userInfo));
      //   const tokenType = "REP";
      //   notification.description =
      //     "Transferred " +
      //     formatRep(notification.log.value / REP_DIVISOR).formatted +
      //     " " +
      //     tokenType +
      //     " to " +
      //     notification.log.to;
      //   break;
      // }

      default: {
        const result = notification.log.eventName.replace(/([A-Z])/g, " $1");
        notification.description =
          result.charAt(0).toUpperCase() + result.slice(1);
        break;
      }
    }
    dispatch(callback(notification));
  };
}
