import React from 'react'
import { Link } from 'react-router-dom'
import NotificationBell from './NotificationBell'

/**
 * Navbar Component
 * Displays NEWS BANK branding and navigation
 */

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <img src="/LOGO.png" alt="NEWS BANK" className="h-12 sm:h-14 w-auto" />
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-xl font-bold text-secondary leading-tight">NEWS BANK</span>
              <p className="text-xs text-accent leading-tight">ख़बरों में आगे</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <NotificationBell />
            <Link
              to="/admin/login"
              className="bg-secondary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition active:scale-95 touch-manipulation"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
