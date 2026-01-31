import React, { useState, useEffect } from 'react'
import { Bell, BellOff, X } from 'lucide-react'
import {
  isNotificationSupported,
  getPermissionStatus,
  subscribeToPush,
  unsubscribeFromPush,
  isPushEnabled
} from '../services/notificationService'

/**
 * Notification Bell Component
 * Allows users to enable/disable push notifications
 */

const NotificationBell = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported(isNotificationSupported())
    setIsEnabled(isPushEnabled())
  }, [])

  const handleToggle = async () => {
    if (!supported) {
      alert('Push notifications are not supported in your browser')
      return
    }

    setLoading(true)

    if (isEnabled) {
      // Disable notifications
      unsubscribeFromPush()
      setIsEnabled(false)
      setShowPopup(false)
    } else {
      // Enable notifications
      const result = await subscribeToPush()
      if (result.success) {
        setIsEnabled(true)
        setShowPopup(false)
      } else {
        alert(result.error || 'Failed to enable notifications')
      }
    }

    setLoading(false)
  }

  if (!supported) return null

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setShowPopup(!showPopup)}
        className={`relative p-2 rounded-full transition ${
          isEnabled
            ? 'bg-secondary text-white'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        title={isEnabled ? 'Notifications enabled' : 'Enable notifications'}
      >
        {isEnabled ? (
          <Bell className="w-5 h-5" />
        ) : (
          <BellOff className="w-5 h-5" />
        )}
        {isEnabled && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-xl border p-4 z-50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold text-primary">Notifications</h4>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {isEnabled
              ? 'You will receive breaking news alerts'
              : 'Get notified about breaking news and important updates'}
          </p>

          <button
            onClick={handleToggle}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition ${
              isEnabled
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-secondary text-white hover:bg-secondary/90'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading
              ? 'Please wait...'
              : isEnabled
              ? 'Turn Off Notifications'
              : 'Enable Notifications'}
          </button>

          {getPermissionStatus() === 'denied' && (
            <p className="text-xs text-red-500 mt-2">
              Notifications blocked. Please enable in browser settings.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
