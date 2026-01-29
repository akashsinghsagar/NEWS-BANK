import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

/**
 * Contact Page
 * Contact form and information for NEWS BANK
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or news tip? We'd love to hear from you.
            Get in touch with the NEWS BANK team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Email</h3>
                    <a 
                      href="mailto:newsbankchannel@gmail.com" 
                      className="text-secondary hover:underline text-base"
                    >
                      newsbankchannel@gmail.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Send us an email anytime. We'll respond within 24-48 hours.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Phone</h3>
                    <div className="space-y-1">
                      <a 
                        href="tel:+918825336520" 
                        className="text-secondary hover:underline block text-base"
                      >
                        +91 8825336520
                      </a>
                      <a 
                        href="tel:+918271681962" 
                        className="text-secondary hover:underline block text-base"
                      >
                        +91 8271681962
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Available Mon-Sat, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Location</h3>
                    <p className="text-gray-700 text-base">India</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Serving news across the nation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg p-6 sm:p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">NEWS BANK</h2>
              <p className="text-lg mb-2 font-semibold text-accent">ख़बरों में आगे</p>
              <p className="text-white text-opacity-90 leading-relaxed">
                Your trusted source for the latest news and updates. We're committed to delivering
                accurate, timely, and comprehensive news coverage across all categories.
              </p>
              <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                <p className="text-sm text-white text-opacity-75">
                  For press releases, news tips, or partnership inquiries, please use the contact
                  form or email us directly.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for contacting NEWS BANK. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center space-x-2 active:scale-95 touch-manipulation"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our{' '}
                  <Link to="/privacy-policy" className="text-secondary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/privacy-policy" className="text-secondary hover:underline">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/terms-and-conditions" className="text-secondary hover:underline">
              Terms & Conditions
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/disclaimer" className="text-secondary hover:underline">
              Disclaimer
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/" className="text-secondary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
