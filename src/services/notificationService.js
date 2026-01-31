/**
 * Push Notification Service
 * Handles browser push notifications for breaking news
 */

// Check if browser supports notifications
export const isNotificationSupported = () => {
  return 'Notification' in window && 'serviceWorker' in navigator
}

// Get current permission status
export const getPermissionStatus = () => {
  if (!isNotificationSupported()) return 'unsupported'
  return Notification.permission
}

// Request notification permission
export const requestPermission = async () => {
  if (!isNotificationSupported()) {
    return { success: false, error: 'Notifications not supported' }
  }

  try {
    const permission = await Notification.requestPermission()
    return { success: permission === 'granted', permission }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Show a notification
export const showNotification = (title, options = {}) => {
  if (getPermissionStatus() !== 'granted') {
    console.log('Notification permission not granted')
    return
  }

  const defaultOptions = {
    icon: '/LOGO.png',
    badge: '/LOGO.png',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    ...options
  }

  // Use service worker if available, otherwise use Notification API directly
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, defaultOptions)
    })
  } else {
    new Notification(title, defaultOptions)
  }
}

// Show breaking news notification
export const showBreakingNewsNotification = (article) => {
  showNotification(`🔴 Breaking News: ${article.title}`, {
    body: article.content?.substring(0, 100) + '...',
    icon: article.image_url || '/LOGO.png',
    tag: `news-${article.id}`,
    data: { url: `/news/${article.id}` },
    actions: [
      { action: 'read', title: 'Read Now' },
      { action: 'close', title: 'Dismiss' }
    ]
  })
}

// Subscribe to push notifications (for future server-side implementation)
export const subscribeToPush = async () => {
  if (!isNotificationSupported()) {
    return { success: false, error: 'Push not supported' }
  }

  try {
    const registration = await navigator.serviceWorker.ready
    
    // For now, just return success if permission granted
    // In production, you'd subscribe to a push service here
    const permission = await requestPermission()
    
    if (permission.success) {
      // Store subscription preference in localStorage
      localStorage.setItem('pushNotificationsEnabled', 'true')
      return { success: true, message: 'Notifications enabled!' }
    }
    
    return { success: false, error: 'Permission denied' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Unsubscribe from push notifications
export const unsubscribeFromPush = () => {
  localStorage.setItem('pushNotificationsEnabled', 'false')
  return { success: true, message: 'Notifications disabled' }
}

// Check if user has enabled notifications
export const isPushEnabled = () => {
  return localStorage.getItem('pushNotificationsEnabled') === 'true' &&
         getPermissionStatus() === 'granted'
}
