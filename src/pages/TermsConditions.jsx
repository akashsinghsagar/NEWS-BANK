import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Mail, Phone, ChevronLeft } from 'lucide-react'

/**
 * Terms and Conditions Page
 * Legal terms of use for NEWS BANK
 */

const TermsConditions = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link to="/" className="flex items-center text-secondary hover:text-primary mb-6 font-medium">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-secondary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Terms & Conditions</h1>
          </div>
          <p className="text-gray-600">Last Updated: January 30, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Welcome to <strong>NEWS BANK</strong>. By accessing or using our website (the "Website"),
              you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to
              these Terms, please do not use the Website.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you and NEWS BANK. We reserve
              the right to modify these Terms at any time. Your continued use of the Website after
              changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Use of the Website</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Permitted Use</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You may use NEWS BANK for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Use the Website in any way that violates applicable laws or regulations</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use of the Website</li>
              <li>Attempt to gain unauthorized access to any portion of the Website</li>
              <li>Use automated systems (bots, scrapers) to access the Website without permission</li>
              <li>Transmit viruses, malware, or any harmful code</li>
              <li>Impersonate NEWS BANK or any other person or entity</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Account Security</h3>
            <p className="text-gray-700 leading-relaxed">
              If you create an account on our Website, you are responsible for maintaining the
              confidentiality of your login credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Ownership</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on NEWS BANK, including but not limited to text, graphics, logos, images,
              videos, and software, is the property of NEWS BANK or its content suppliers and is
              protected by Indian and international copyright, trademark, and other intellectual
              property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Limited License</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You are granted a limited, non-exclusive, non-transferable license to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Access and view content for personal, non-commercial use</li>
              <li>Share news articles via social media (with proper attribution)</li>
              <li>Print or download content for personal reference</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Restrictions</h3>
            <p className="text-gray-700 leading-relaxed mb-3">You may NOT:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Reproduce, distribute, or publicly display content for commercial purposes without
                written permission</li>
              <li>Modify, translate, or create derivative works from our content</li>
              <li>Remove copyright or proprietary notices from any content</li>
              <li>Use our content on other websites without authorization</li>
            </ul>
          </section>

          {/* User-Generated Content */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. User-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you submit comments, feedback, or other content ("User Content") to NEWS BANK:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>You retain ownership of your User Content</li>
              <li>You grant us a worldwide, royalty-free license to use, reproduce, and distribute
                your User Content</li>
              <li>You represent that your User Content does not violate any third-party rights</li>
              <li>We reserve the right to remove any User Content that violates these Terms</li>
            </ul>
          </section>

          {/* Disclaimer of Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Content Accuracy and Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NEWS BANK strives to provide accurate and up-to-date news and information. However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>We do not guarantee the accuracy, completeness, or reliability of any content</li>
              <li>News articles may contain opinions and views of authors, not necessarily those of
                NEWS BANK</li>
              <li>Content is provided "as is" without warranties of any kind</li>
              <li>We are not responsible for errors, omissions, or outdated information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You should independently verify any information before relying on it for important
              decisions.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Third-Party Links and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our Website may contain links to third-party websites or services that are not owned or
              controlled by NEWS BANK.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We have no control over the content, privacy policies, or practices of third-party
                sites</li>
              <li>We do not endorse or assume responsibility for any third-party content</li>
              <li>You access third-party links at your own risk</li>
              <li>We encourage you to review the terms and privacy policies of any third-party sites
                you visit</li>
            </ul>
          </section>

          {/* Advertisements */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Advertisements</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NEWS BANK displays advertisements through Google AdSense and other advertising networks.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We are not responsible for the content of advertisements</li>
              <li>Advertisers are solely responsible for their products and services</li>
              <li>We do not endorse any advertised products or services</li>
              <li>Your interactions with advertisers are solely between you and the advertiser</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>NEWS BANK shall not be liable for any indirect, incidental, special, or
                consequential damages</li>
              <li>We are not liable for any loss of profits, data, or business opportunities</li>
              <li>Our total liability shall not exceed the amount you paid to access the Website (if
                any)</li>
              <li>We are not responsible for technical failures, interruptions, or errors</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Some jurisdictions do not allow limitation of liability, so these limitations may not
              apply to you.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless NEWS BANK, its affiliates, officers, employees,
              and agents from any claims, damages, losses, or expenses (including legal fees) arising
              from your use of the Website, violation of these Terms, or infringement of any
              third-party rights.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the Website is also governed by our{' '}
              <Link to="/privacy-policy" className="text-secondary hover:underline font-semibold">
                Privacy Policy
              </Link>
              . Please review it to understand how we collect, use, and protect your information.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Website at any time,
              without notice, for any reason, including violation of these Terms. Upon termination,
              you must cease all use of the Website.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">12. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              These Terms shall be governed by and construed in accordance with the laws of
              <strong> India</strong>, without regard to conflict of law principles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these Terms or your use of the Website shall be subject to the
              exclusive jurisdiction of the courts located in India.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">13. Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may revise these Terms at any time by updating this page. You are expected to check
              this page periodically to be aware of any changes. Your continued use of the Website
              after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">14. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining
              provisions shall continue in full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">15. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about these Terms and Conditions, please contact us:
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
            <Link to="/privacy-policy" className="text-secondary hover:underline">
              Privacy Policy
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

export default TermsConditions
