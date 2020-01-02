import logError from "utils/log-error";
import { augur } from "services/augurjs";
import { useUnlockedAccount } from "modules/auth/actions/use-unlocked-account";
import { first } from "lodash";
import { windowRef } from "utils/window-ref";

export const loginWithMetaMask = (callback = logError) => dispatch => {
  const failure = () => callback("NOT_SIGNED_IN");
  const success = account => {
    // make sure we actually have an account before succeeding...
    if (!account) return failure();
    dispatch(useUnlockedAccount(account));
    callback(null, account);
  };

  if (!windowRef.ethereum || !windowRef.ethereum.isMetaMask) {
    throw new Error("Please install MetaMask.");
  }

  windowRef.ethereum.on("accountsChanged", account => success(first(account)));

  augur.rpc.eth.accounts((err, accounts) => {
    const account = first(accounts);
    if (err) return failure();
    if (account) {
      success(account);
    } else {
      // Handle connecting, per EIP 1102 */
      windowRef.ethereum
        .send("eth_requestAccounts")
        .then(account => success(first(account)))
        .catch(err => {
          if (err.code === 4001) {
            // EIP 1193 userRejectedRequest error
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
          failure();
        });
    }
  });
};
