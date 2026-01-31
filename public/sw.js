// Service Worker for NEWS BANK Push Notifications

const CACHE_NAME = 'newsbank-v1'

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
  event.waitUntil(clients.claim())
})

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received')
  
  let data = {
    title: 'NEWS BANK',
    body: 'New update available!',
    icon: '/LOGO.png',
    badge: '/LOGO.png'
  }

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() }
    } catch (e) {
      data.body = event.data.text()
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/LOGO.png',
    badge: data.badge || '/LOGO.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || [
      { action: 'open', title: 'Read Now' },
      { action: 'close', title: 'Dismiss' }
    ],
    requireInteraction: true,
    tag: data.tag || 'newsbank-notification'
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action)
  
  event.notification.close()

  if (event.action === 'close') {
    return
  }

  // Open the app or specific URL
  const urlToOpen = event.notification.data?.url || '/'
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(urlToOpen)
          return client.focus()
        }
      }
      // Open new window if none exists
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Notification close event
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed')
})
