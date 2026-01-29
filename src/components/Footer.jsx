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
          <div>
            <img src="/newsbank-logo.png" alt="NEWS BANK" className="h-12 w-auto mb-3" />
            <p className="text-accent text-sm font-semibold mb-3">ख़बरों में आगे</p>
            <p className="text-gray-400 text-sm">
              Your trusted source for latest news and updates in Hindi and English.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/local" className="text-gray-400 hover:text-secondary transition">
                  Local News
                </Link>
              </li>
              <li>
                <Link to="/category/national" className="text-gray-400 hover:text-secondary transition">
                  National News
                </Link>
              </li>
              <li>
                <Link to="/category/business" className="text-gray-400 hover:text-secondary transition">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-400 hover:text-secondary transition">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/category/tech" className="text-gray-400 hover:text-secondary transition">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-secondary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-secondary transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-secondary transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-secondary transition">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Email: info@newsbank.com</p>
              <p className="text-gray-400 text-sm">Phone: +91 (123) 456-7890</p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-secondary hover:text-accent transition">
                  Facebook
                </a>
                <a href="#" className="text-secondary hover:text-accent transition">
                  Twitter
                </a>
                <a href="#" className="text-secondary hover:text-accent transition">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google AdSense Footer Banner */}
        <div className="border-t border-gray-700 py-4 my-8">
          <p className="text-xs text-gray-500 text-center">
            [Google AdSense Footer Banner - 728x90]
          </p>
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
