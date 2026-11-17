import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import NotificationBell from './NotificationBell'
import AnimatedTagline from './AnimatedTagline'

/**
 * Navbar Component
 * Displays NEWS BANK branding and navigation
 */

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const openSearch = () => {
    if (location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('newsbank:focus-search'))
    } else {
      navigate('/?search=true')
    }
  }

  return (
    <nav className="site-header">
      <div className="site-header__inner">
        <button className="icon-button mobile-only" aria-label="Open menu">
          <Menu size={21} />
        </button>
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <Link to="/" className="brand-lockup">
            <img src="/LOGO.png" alt="NEWS BANK" className="brand-lockup__image" />
            <div className="flex flex-col justify-center">
              <span className="brand-lockup__name">NEWS BANK</span>
              <AnimatedTagline />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="header-actions">
            <button onClick={openSearch} className="icon-button" aria-label="Search news">
              <Search size={20} />
            </button>
            <NotificationBell />
            <Link to="/admin/login" className="admin-link">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
