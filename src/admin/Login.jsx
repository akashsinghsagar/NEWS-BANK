import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../services/newsService'
import { AlertCircle, LogIn, ChevronLeft } from 'lucide-react'

/**
 * Admin Login Page
 * Handles admin authentication
 */

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Login attempt:', { email, password: '***' })
    const { data, error } = await signIn(email, password)
    console.log('Login response:', { data, error })

    if (error) {
      setError(error)
      setLoading(false)
    } else if (data) {
      // Redirect to admin dashboard
      console.log('Login successful, redirecting...')
      navigate('/admin/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center px-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center text-white hover:text-accent font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <img src="/LOGO.png" alt="NEWS BANK" className="h-20 w-auto mb-3" />
            <p className="text-secondary font-semibold text-lg">Admin Panel</p>
            <p className="text-gray-500 text-sm">ख़बरों में आगे</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-semibold text-sm">Login Failed</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@newsbank.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/admin/signup" className="text-secondary font-semibold hover:underline">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default AdminLogin
