import React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Mail, Phone } from 'lucide-react'

/**
 * Disclaimer Page
 * Legal disclaimer for NEWS BANK content
 */

const Disclaimer = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-secondary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Disclaimer</h1>
          </div>
          <p className="text-gray-600">Last Updated: January 30, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-8">
          {/* General Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. General Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The information provided by <strong>NEWS BANK</strong> ("we", "us", or "our") on our
              website (the "Website") is for general informational purposes only. All information on
              the Website is provided in good faith; however, we make no representation or warranty of
              any kind, express or implied, regarding the accuracy, adequacy, validity, reliability,
              availability, or completeness of any information on the Website.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-red-600">UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO
              YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE WEBSITE
              OR RELIANCE ON ANY INFORMATION PROVIDED ON THE WEBSITE. YOUR USE OF THE WEBSITE AND YOUR
              RELIANCE ON ANY INFORMATION ON THE WEBSITE IS SOLELY AT YOUR OWN RISK.</strong>
            </p>
          </section>

          {/* News Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. News Content Accuracy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NEWS BANK strives to provide accurate, timely, and reliable news content. However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>News articles are compiled from various sources, including press releases, wire
                services, and independent reporting</li>
              <li>We do not guarantee the accuracy, timeliness, or completeness of any news content</li>
              <li>News events are subject to change, and information may become outdated</li>
              <li>We are not responsible for errors, omissions, or inaccuracies in news reporting</li>
              <li>News content should not be used as the sole basis for making important decisions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We encourage readers to verify critical information through multiple independent sources
              before taking action based on news content.
            </p>
          </section>

          {/* Opinion and Commentary */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Opinion-Based Content</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Some articles on NEWS BANK may contain opinions, commentary, analysis, or editorial
              content. Please note:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Opinion pieces reflect the views of the individual author(s), not necessarily those
                of NEWS BANK</li>
              <li>Commentary and analysis are subjective interpretations of events</li>
              <li>We do not endorse or take responsibility for opinions expressed by contributors</li>
              <li>Readers should form their own independent opinions and judgments</li>
              <li>Opinion content is clearly labeled as such where applicable</li>
            </ul>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. External Links Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The Website may contain links to external websites that are not provided or maintained
              by NEWS BANK.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>We do not guarantee the accuracy, relevance, or completeness of external content</li>
              <li>We have no control over the nature, content, and availability of external sites</li>
              <li>The inclusion of any links does not imply endorsement or recommendation</li>
              <li>We are not responsible for the content of linked websites</li>
              <li>You access external links at your own risk</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Please review the terms and privacy policies of any third-party websites you visit.
            </p>
          </section>

          {/* Advertisement Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Advertisement Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NEWS BANK displays advertisements through Google AdSense and other advertising networks.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>We do not endorse, recommend, or take responsibility for any advertised products or
                services</li>
              <li>Advertisers are solely responsible for the accuracy of their claims</li>
              <li>We do not verify the claims made in advertisements</li>
              <li>Your interactions with advertisers are entirely at your own risk</li>
              <li>We are not liable for any loss or damage resulting from advertised products or
                services</li>
              <li>Advertisement placement does not constitute editorial endorsement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Please conduct your own research and due diligence before purchasing any products or
              services advertised on our Website.
            </p>
          </section>

          {/* Professional Advice */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. No Professional Advice</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The information on NEWS BANK does not constitute professional advice. We are not
              responsible for any decisions made based on information from our Website.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Legal Advice:</strong> Content is not legal advice. Consult a qualified
                lawyer for legal matters</li>
              <li><strong>Financial Advice:</strong> We do not provide financial or investment advice.
                Consult a certified financial advisor</li>
              <li><strong>Medical Advice:</strong> Health-related content is informational only.
                Consult a qualified healthcare professional</li>
              <li><strong>Political Advice:</strong> Political content is for informational purposes
                and does not constitute advocacy</li>
            </ul>
          </section>

          {/* Technical Issues */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Technical Errors and Interruptions</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              While we strive to maintain the Website's availability:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We do not guarantee uninterrupted access to the Website</li>
              <li>Technical errors, server failures, or maintenance may cause temporary unavailability</li>
              <li>We are not liable for any loss resulting from Website downtime</li>
              <li>Content may contain typographical errors or technical inaccuracies</li>
              <li>We reserve the right to correct errors without notice</li>
            </ul>
          </section>

          {/* User Responsibility */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. User Responsibility</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              As a user of NEWS BANK, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You are solely responsible for your use of the Website and its content</li>
              <li>You must independently verify any information before relying on it</li>
              <li>You will not hold NEWS BANK liable for any consequences of your decisions</li>
              <li>You understand that news content may be time-sensitive and subject to updates</li>
              <li>You will use the Website in compliance with all applicable laws</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>NEWS BANK shall not be liable for any direct, indirect, incidental, consequential,
                or punitive damages</li>
              <li>We are not liable for any loss of profits, data, revenue, or business opportunities</li>
              <li>We are not responsible for damages arising from your use or inability to use the
                Website</li>
              <li>Our liability is limited even if we have been advised of the possibility of such
                damages</li>
            </ul>
          </section>

          {/* Updates and Changes */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Updates to Content</h2>
            <p className="text-gray-700 leading-relaxed">
              NEWS BANK reserves the right to update, modify, or remove content at any time without
              prior notice. We do not guarantee that all information will remain current or available.
              News stories may be updated as new information becomes available, and we are not
              obligated to notify users of such updates.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              This Disclaimer is governed by the laws of India. Any disputes arising from this
              Disclaimer or your use of the Website shall be subject to the exclusive jurisdiction of
              the courts of India.
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">12. Acceptance of Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              By using NEWS BANK, you acknowledge that you have read, understood, and agree to this
              Disclaimer. If you do not agree with any part of this Disclaimer, you must discontinue
              use of the Website immediately.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">13. Questions and Concerns</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Disclaimer, please contact us:
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
            <Link to="/terms-and-conditions" className="text-secondary hover:underline">
              Terms & Conditions
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

export default Disclaimer
