import React, { useState, useEffect } from 'react'
import { X, Youtube } from 'lucide-react'

/**
 * YouTube Subscribe Modal
 * Popup to encourage users to subscribe to NEWS BANK YouTube channel
 */

const YouTubeSubscribeModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check how many times the popup has been shown
    const showCount = parseInt(localStorage.getItem('ytSubscribeCount') || '0')
    
    if (showCount < 2) {
      // First popup after 8 seconds
      const firstDelay = showCount === 0 ? 8000 : 10000
      
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, firstDelay)

      return () => clearTimeout(timer)
    } else {
      setIsDismissed(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    
    // Increment show count
    const currentCount = parseInt(localStorage.getItem('ytSubscribeCount') || '0')
    const newCount = currentCount + 1
    localStorage.setItem('ytSubscribeCount', newCount.toString())
    
    // If first time, schedule second popup after 10 seconds
    if (newCount === 1) {
      setTimeout(() => {
        setIsOpen(true)
      }, 10000)
    } else {
      setIsDismissed(true)
    }
  }

  const handleDismiss = () => {
    handleClose()
  }

  const handleSubscribe = () => {
    // Open YouTube channel in new tab
    const youtubeChannelURL = 'https://youtube.com/@newsbankpalamu?si=J0s40Kirorw4q0IO'
    window.open(youtubeChannelURL, '_blank')
    handleDismiss()
  }

  if (!isOpen || isDismissed) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in"
        onClick={handleDismiss}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 pointer-events-auto animate-scale-in relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* YouTube Icon with Animation */}
            <div className="mb-6 flex justify-center">
              <div className="bg-red-600 rounded-full p-4 animate-bounce">
                <Youtube className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Logo */}
            <img 
              src="/LOGO.png" 
              alt="NEWS BANK" 
              className="w-20 h-20 mx-auto mb-4 object-contain"
            />

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              Stay Updated!
            </h2>
            <p className="text-lg text-secondary font-semibold mb-4">
              ख़बरों में आगे
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              Subscribe to our <strong>YouTube channel</strong> for latest news videos, 
              breaking updates, and exclusive content in Hindi & English!
            </p>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-gray-800 mb-2">What you'll get:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Breaking news video updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>In-depth analysis & discussions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Live coverage of major events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Exclusive interviews & reports</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSubscribe}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg 
                         transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Youtube className="w-5 h-5" />
                <span>Subscribe Now</span>
              </button>
              
              <button
                onClick={handleDismiss}
                className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition"
              >
                Maybe Later
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 mt-4">
              Free to subscribe • No spam • Quality content
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default YouTubeSubscribeModal
