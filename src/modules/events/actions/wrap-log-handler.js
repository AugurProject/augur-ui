import { find } from "lodash";
import { defaultLogHandler } from "modules/events/actions/default-log-handler";

export const wrapLogHandler = (logHandler = defaultLogHandler) => (
  dispatch,
  getState
) => (err, log) => {
  if (err) return console.error((log || {}).eventName, err, log);
  if (log) {
    // console.info(`${new Date().toISOString()} LOG ${log.removed ? 'REMOVED' : 'ADDED'} ${log.eventName} ${JSON.stringify(log)}`)
<<<<<<< HEAD
    const universeId = getState().universe.id
    const isInCurrentUniverse = find(Object.values(log), value => universeId === value)
    if (Array.isArray(log)) {
      if (isInCurrentUniverse) dispatch(logHandler(log))
      log.forEach((log) => {
        if (find(Object.values(log), value => universeId === value)) dispatch(logHandler(log))
      })
=======
    const universeId = getState().universe.id
    const isInCurrentUniverse = find(Object.values(log), value => universeId === value)
    if (Array.isArray(log)) {
      log.forEach(log => {
        if (find(Object.values(log), value => universeId === value))
          dispatch(logHandler(log));
      });
>>>>>>> ee59e41c7295965e1185233dc18c9ef2096bdefa
    } else {
      const isInCurrentUniverse = find(
        Object.values(log),
        value => universeId === value
      );
      if (isInCurrentUniverse) dispatch(logHandler(log));
    }
  }
};
