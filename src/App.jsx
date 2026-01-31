import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WelcomeModal from './components/WelcomeModal'
import ScrollToTopButton from './components/ScrollToTopButton'

// Public Pages
import Home from './pages/Home'
import NewsDetails from './pages/NewsDetails'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import Disclaimer from './pages/Disclaimer'
import Contact from './pages/Contact'

// Admin Pages
import AdminLogin from './admin/Login'
import AdminSignup from './admin/Signup'
import AdminDashboard from './admin/Dashboard'
import AddNews from './admin/AddNews'
import EditNews from './admin/EditNews'
import ManageAds from './admin/ManageAds'

// Styles
import './styles/index.css'

/**
 * Main App Component
 * Routes and layout for NEWS BANK application
 */

function App() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Auto-close after 3 seconds, or let user close
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showWelcome])

  return (
    <Router>
      <div className="flex flex-col min-h-screen animate-fade-in">
        <WelcomeModal show={showWelcome} onClose={() => setShowWelcome(false)} />
        <ScrollToTopButton />
        {/* Navbar - Shows on all pages except admin login */}
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Routes>
                  <Route path="/admin/login" element={null} />
                </Routes>
                <Navbar />
              </>
            }
          />
        </Routes>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-news"
              element={
                <ProtectedRoute>
                  <AddNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-news/:id"
              element={
                <ProtectedRoute>
                  <EditNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-ads"
              element={
                <ProtectedRoute>
                  <ManageAds />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer - Hide on admin pages */}
        <Routes>
          <Route
            path="*"
            element={
              <Routes>
                <Route path="/admin/*" element={null} />
                <Route path="*" element={<Footer />} />
              </Routes>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
