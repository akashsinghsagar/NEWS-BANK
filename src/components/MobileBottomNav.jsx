import React from 'react'
import { Home, Search, Clock3, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const MobileBottomNav = () => {
  const location = useLocation()
  const items = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Latest', to: '/?latest=true', icon: Clock3 },
    { label: 'Search', to: '/?search=true', icon: Search },
    { label: 'Profile', to: '/admin/login', icon: User },
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(({ label, to, icon: Icon }) => {
        const active = label === 'Home'
          ? location.pathname === '/' && !location.search
          : location.pathname === to.split('?')[0] && (label !== 'Profile' || location.pathname.startsWith('/admin'))

        return (
          <Link
            key={label}
            to={to}
            className={`mobile-bottom-nav__item ${active ? 'is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon aria-hidden="true" size={19} strokeWidth={active ? 2.4 : 1.8} />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default MobileBottomNav
