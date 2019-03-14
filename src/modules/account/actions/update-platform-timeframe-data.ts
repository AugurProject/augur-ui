import { augur } from "services/augurjs";
import { updateUniverse } from "modules/universe/actions/update-universe";
import logError from "utils/log-error";

export const updatePlatformTimeframeData = (
  options = {},
  callback = logError
) => (dispatch, getState) => {
  const { universe } = getState();
  if (universe.id == null) return callback(null);

  augur.augurNode.submitRequest(
    "getPlatformActivityStats",
    {
      universe: universe.id,
      endTime: options.endTime || null
    },
    (err, timeframeData) => {
      if (err) return callback(err);
      dispatch(
        updateUniverse({
          timeframeData
        })
      );
    }
  );
};
