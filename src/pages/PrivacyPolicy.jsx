import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Mail, Phone } from 'lucide-react'

/**
 * Privacy Policy Page
 * Comprehensive privacy policy for NEWS BANK
 */

const PrivacyPolicy = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-secondary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">Last Updated: January 30, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Welcome to NEWS BANK ("we", "our", or "us"). We are committed to protecting your privacy
              and ensuring the security of your personal information. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you visit our website
              <strong> newsbank.com</strong> (the "Website").
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using NEWS BANK, you agree to the terms of this Privacy Policy. If you
              do not agree with the terms, please do not access the Website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Contact information (name, email address) when you subscribe to our newsletter</li>
              <li>Comments or feedback submitted through our contact forms</li>
              <li>Any information you voluntarily provide when contacting us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Browser type and version</li>
              <li>Device information (type, operating system)</li>
              <li>IP address and geographic location</li>
              <li>Pages visited, time spent on pages, and navigation patterns</li>
              <li>Referral source (how you arrived at our Website)</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your browsing experience.
              Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Understand how you interact with our Website</li>
              <li>Improve our services and content</li>
              <li>Deliver personalized advertisements (via Google AdSense)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings. However, disabling cookies may
              affect the functionality of certain features on our Website.
            </p>
          </section>

          {/* Google AdSense */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Google AdSense and Advertising</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NEWS BANK uses <strong>Google AdSense</strong> to display advertisements. Google AdSense
              uses cookies to serve ads based on your prior visits to our Website or other websites.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Google's use of advertising cookies enables it and its partners to serve ads based on
                your visit to our site and/or other sites on the Internet</li>
              <li>You may opt out of personalized advertising by visiting
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
                  className="text-secondary hover:underline ml-1">Google Ads Settings</a>
              </li>
              <li>For more information, visit Google's
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                  className="text-secondary hover:underline ml-1">Privacy Policy</a>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To operate and maintain our Website</li>
              <li>To improve user experience and Website functionality</li>
              <li>To send newsletters and updates (with your consent)</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To analyze Website traffic and usage patterns</li>
              <li>To display relevant advertisements</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information to third parties. However, we
              may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our
                Website (e.g., hosting providers, analytics services)</li>
              <li><strong>Advertising Partners:</strong> Google AdSense and other ad networks for
                displaying advertisements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to
                protect our rights</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your personal information
              from unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100% secure. While we strive to
              protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of these external sites. We encourage you to review their
              privacy policies before providing any personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              NEWS BANK is not directed to individuals under the age of 13. We do not knowingly
              collect personal information from children. If you believe we have inadvertently
              collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated "Last Updated" date. We encourage you to review this policy
              periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your
              personal information, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:newsbankchannel@gmail.com" className="text-secondary hover:underline">
                  newsbankchannel@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <div className="text-gray-700">
                  <a href="tel:+918825336520" className="hover:text-secondary">+91 8825336520</a>
                  {' / '}
                  <a href="tel:+918271681962" className="hover:text-secondary">+91 8271681962</a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="border-t pt-6 flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/terms-and-conditions" className="text-secondary hover:underline">
              Terms & Conditions
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/disclaimer" className="text-secondary hover:underline">
              Disclaimer
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/contact" className="text-secondary hover:underline">
              Contact Us
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

export default PrivacyPolicy
