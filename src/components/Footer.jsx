import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Footer Component
 * Displays company info and links
 */

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <img src="/LOGO.png" alt="NEWS BANK" className="h-16 w-auto mb-2" />
            <p className="text-accent text-sm font-semibold mb-2">ख़बरों में आगे</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for latest news and updates in Hindi and English.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-secondary transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-secondary transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-400 hover:text-secondary transition text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-secondary transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-secondary transition text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-secondary transition text-sm">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                <a href="mailto:newsbankchannel@gmail.com" className="hover:text-secondary transition">
                  newsbankchannel@gmail.com
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                <a href="tel:+918825336520" className="hover:text-secondary transition">
                  +91 8825336520
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                <a href="tel:+918271681962" className="hover:text-secondary transition">
                  +91 8271681962
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} NEWS BANK. All rights reserved. | ख़बरों में आगे</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
