import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Navbar Component
 * Displays NEWS BANK branding and navigation
 */

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <img src="/newsbank-logo.png" alt="NEWS BANK" className="h-8 sm:h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3 sm:space-x-6">
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
