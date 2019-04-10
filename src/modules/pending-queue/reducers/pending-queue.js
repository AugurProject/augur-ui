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
<<<<<<< HEAD
      const { queueName } = data;
      const queueData = pendingQueue[queueName] || [];
      delete queueData[queueName];
      if (queueData.length > 0) {
        return {
          ...pendingQueue,
          [queueName]: queueData
        };
      }
      delete pendingQueue[queueName];
=======
      const { pendingId, queueName } = data;
      delete pendingQueue[queueName][pendingId];
>>>>>>> 8ab80c8613ddff289f2a4c64f7ae8e9b04149e0a
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
