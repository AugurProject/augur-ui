import * as notificationLevels from 'src/modules/notifications/constants'
import setNotificationTitle from './set-notification-title'
import setNotificationDescription from './set-notification-description'

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'

export function addCriticalNotification(notification) {
  return addNotification({
    level: notificationLevels.CRITICAL,
    ...notification,
  })
}

export function addNotification(notification) {
  if (notification != null) {
    const callback = (notification) => {
      const fullNotification = {
        type: ADD_NOTIFICATION,
        data: {
          notification: {
            seen: false,
            level: notificationLevels.INFO,
            ...notification,
          },
        },
      }
      return fullNotification
    }

    return setNotificationTitle(notification, callback)
  }
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    data: id,
  }
}

export function updateNotification(id, notification) {
  const callback = (notification) => {
    const fullNotification = {
      type: UPDATE_NOTIFICATION,
      data: {
        id,
        notification,
      },
    }
    return fullNotification
  }

  return setNotificationDescription(notification, callback)
}

// We clear by 'notification level'.
// This will not surface in the UI just yet.
export function clearNotifications(notificationLevel = notificationLevels.INFO) {
  return {
    type: CLEAR_NOTIFICATIONS,
    data: {
      level: notificationLevel,
    },
  }
}
