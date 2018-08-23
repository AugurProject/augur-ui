<<<<<<< HEAD
import { augur } from 'services/augurjs'
import logError from 'utils/log-error'

import { updateNotification, addNotification } from 'modules/notifications/actions'
import { selectCurrentTimestampInSeconds } from 'src/select-state'
=======
import { augur } from "services/augurjs";
import logError from "utils/log-error";
import noop from "utils/noop";
>>>>>>> ee59e41c7295965e1185233dc18c9ef2096bdefa

export const sendFinalizeMarket = (marketId, callback = logError) => (
  dispatch,
  getState
) => {
  console.log("finalize market called");
  const { loginAccount } = getState();
  if (!loginAccount.address) return callback(null);
  augur.api.Market.finalize({
    tx: { to: marketId },
    meta: loginAccount.meta,
<<<<<<< HEAD
    onSent: (res) => {
      dispatch(addNotification({
        id: res.hash,
        market: marketId,
        status: 'Pending',
        timestamp: selectCurrentTimestampInSeconds(getState()),
        type: 'finalize',
      }))
    },
    onSuccess: (res) => {
      dispatch(updateNotification(res.hash, {
        status: 'Success',
        timestamp: selectCurrentTimestampInSeconds(getState()),
      }))
    },
    onFailed: err => callback(err),
  })
}
=======
    onSent: noop,
    onSuccess: noop,
    onFailed: err => callback(err)
  });
};
>>>>>>> ee59e41c7295965e1185233dc18c9ef2096bdefa
