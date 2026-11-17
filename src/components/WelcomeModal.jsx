import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function WelcomeModal({ show, onClose }) {
  const closeModal = () => {
    localStorage.setItem('newsBankWelcomeShown', 'true')
    onClose()
  }

  useEffect(() => {
    if (!show) return undefined

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="welcome-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) closeModal()
    }}>
      <div className="welcome-card" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
        <button onClick={closeModal} className="welcome-close" aria-label="Close welcome message">
          <X size={19} />
        </button>
        <img src="/LOGO.png" alt="NEWS BANK" className="welcome-logo" />
        <h2 id="welcome-title">
          Welcome to <span className="text-secondary">NEWS BANK</span>
        </h2>
        <p>Your trusted source for news</p>
        <button
          onClick={closeModal}
          className="welcome-enter"
        >
          Enter Site
        </button>
      </div>
    </div>
  )
}

// Tailwind CSS custom animations (add to your global CSS if not present):
// .animate-fade-in { animation: fadeIn 0.7s both; }
// .animate-scale-in { animation: scaleIn 0.7s both; }
// .animate-bounce-in { animation: bounceIn 0.8s both; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
// @keyframes bounceIn { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
