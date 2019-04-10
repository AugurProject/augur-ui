import {
  ADD_PENDING_DATA,
  LOAD_PENDING_QUEUE,
  REMOVE_PENDING_DATA
} from "modules/pending-queue/actions/pending-queue-management";

const DEFAULT_STATE = () => ({});

export default function(pendingQueue = DEFAULT_STATE(), { type, data }) {
  switch (type) {
    case ADD_PENDING_DATA: {
      const { pendingId, queueName, status } = data;
      if (pendingQueue[queueName]) {
        pendingQueue[queueName][pendingId] = {
          status
        };
      } else {
        pendingQueue[queueName] = [];
        pendingQueue[queueName][pendingId] = {
          status
        };
      }

      return {
        ...pendingQueue
      };
    }
    case REMOVE_PENDING_DATA: {
      const { pendingId, queueName } = data;
      const queueData = pendingQueue[queueName] || [];
      delete queueData[queueName][pendingId];
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
