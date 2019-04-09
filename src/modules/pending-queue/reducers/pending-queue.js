import {
  ADD_PENDING_DATA,
  LOAD_PENDING_QUEUE,
  REMOVE_PENDING_DATA
} from "modules/pending-queue/actions/pending-queue-management";

const DEFAULT_STATE = () => ({});

export default function(pendingQueue = DEFAULT_STATE(), { type, data }) {
  switch (type) {
    case ADD_PENDING_DATA: {
      const { pendingId, queueName } = data;
      const queueData = pendingQueue[queueName] || [];
      if (pendingId) queueData.push(pendingId);

      return {
        ...pendingQueue,
        [queueName]: queueData
      };
    }
    case REMOVE_PENDING_DATA: {
      const { pendingId, queueName } = data;
      let queueData = pendingQueue[queueName] || [];
      queueData = queueData.filter(obj => obj !== pendingId);
      if (queueData.length > 0) {
        return {
          ...pendingQueue,
          [queueName]: queueData
        };
      }
      delete pendingQueue[queueName];
      return {
        ...pendingQueue
      };
    }
    case LOAD_PENDING_QUEUE: {
      return data.pendingQueue;
    }
    default:
      return pendingQueue;
  }
}
