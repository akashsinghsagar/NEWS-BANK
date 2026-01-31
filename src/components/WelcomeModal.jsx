import React, { useEffect } from 'react'

export default function WelcomeModal({ show, onClose }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center animate-scale-in">
        <img src="/LOGO.png" alt="NEWS BANK" className="w-24 h-24 mb-4 animate-bounce-in" />
        <h2 className="text-2xl font-bold text-primary mb-2 text-center animate-fade-in">
          Welcome to <span className="text-secondary">NEWS BANK</span>
        </h2>
        <p className="text-gray-600 text-center mb-6 animate-fade-in">Your trusted source for news</p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition animate-fade-in"
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
