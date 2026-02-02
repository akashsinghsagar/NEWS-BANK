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
          <p className="text-gray-600">Last Updated: February 2, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Welcome to <strong>NEWS BANK</strong> ("we", "our", "us", or "Company"). These Terms and Conditions ("Terms", "Terms of Service", or "Agreement")
              govern your access to and use of our website, mobile applications, and all related services
              (collectively, the "Website", "Platform", or "Service"). By accessing, browsing, or using any part of our Platform,
              you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>If you do not agree to these Terms in their entirety, you are not authorized to access or use the Website.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you ("User", "you", or "your") and NEWS BANK.
              We reserve the right to update, modify, or revise these Terms at any time without prior notice.
              All changes will be effective immediately upon posting. Your continued use of the Website after
              modifications are posted constitutes your acknowledgment and acceptance of the revised Terms.
              We recommend reviewing these Terms periodically to stay informed of any updates.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Eligibility and Registration</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Age Requirements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must be at least 13 years of age to use NEWS BANK. By using our Platform, you represent and warrant that you meet this minimum age requirement. 
              If you are between 13 and 18 years old, you must have your parent or legal guardian's permission to use the Website and they must agree to these Terms on your behalf.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Account Registration</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Certain features of NEWS BANK may require you to register for an account. When registering, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security and confidentiality of your password</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use or security breach</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate accounts that violate these Terms or are inactive for extended periods.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Use of the Website</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Permitted Use</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You may access and use NEWS BANK solely for lawful, personal, and non-commercial purposes. You expressly agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Use the Website in any manner that violates any applicable federal, state, local, or international law or regulation</li>
              <li>Engage in any conduct that restricts, inhibits, or disrupts anyone's use or enjoyment of the Website</li>
              <li>Attempt to gain unauthorized access to any portion of the Website, servers, or networks</li>
              <li>Use automated systems, bots, scrapers, or spiders to access the Website without our express written permission</li>
              <li>Transmit any viruses, worms, trojans, malware, ransomware, or any other harmful code or files</li>
              <li>Impersonate NEWS BANK, our employees, or any other person or entity</li>
              <li>Collect or harvest any personally identifiable information from the Website</li>
              <li>Interfere with or circumvent any security features of the Website</li>
              <li>Use the Website for any commercial exploitation without our written consent</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              The following activities are strictly prohibited:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Publishing, posting, or distributing any defamatory, obscene, or unlawful material</li>
              <li>Harassing, threatening, or abusing other users</li>
              <li>Promoting hate speech, violence, or discrimination</li>
              <li>Infringing on intellectual property rights of others</li>
              <li>Engaging in fraudulent or deceptive practices</li>
              <li>Attempting to manipulate or artificially inflate traffic or engagement metrics</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Ownership and Protection</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, features, and functionality on NEWS BANK, including but not limited to text, articles, news reports, graphics, photographs, 
              logos, trademarks, service marks, images, videos, audio files, data compilations, software, and the overall design and arrangement ("Content"),
              are the exclusive property of NEWS BANK, its licensors, or its content suppliers. All Content is protected by Indian and international 
              copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The NEWS BANK name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of NEWS BANK 
              or its affiliates. You may not use these marks without our prior written permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Limited License Grant</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Subject to your compliance with these Terms, NEWS BANK grants you a limited, non-exclusive, non-transferable, non-sublicensable, 
              revocable license to access and use the Website and Content solely for your personal, non-commercial purposes. This license permits you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Access and view content for personal information and education</li>
              <li>Share news articles via social media platforms with proper attribution to NEWS BANK</li>
              <li>Print or download content for personal, non-commercial reference and archival purposes</li>
              <li>Embed content using official embed features where provided</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Usage Restrictions</h3>
            <p className="text-gray-700 leading-relaxed mb-3">Unless expressly authorized by NEWS BANK in writing, you may NOT:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Reproduce, distribute, publicly display, or publicly perform any Content for commercial purposes</li>
              <li>Modify, adapt, translate, or create derivative works based on our Content</li>
              <li>Remove, alter, or obscure any copyright, trademark, or proprietary notices from any Content</li>
              <li>Use our Content on other websites, publications, or platforms without explicit authorization</li>
              <li>Frame or mirror any portion of the Website without written permission</li>
              <li>Systematically retrieve data or Content to create compilations, databases, or directories</li>
              <li>Use any meta tags or hidden text utilizing NEWS BANK's name or trademarks</li>
            </ul>
          </section>

          {/* User-Generated Content */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. User-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NEWS BANK may allow you to submit, post, or transmit comments, feedback, suggestions, ideas, reviews, or other content 
              (collectively, "User Content" or "Submissions"). By submitting User Content to NEWS BANK, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>You retain all ownership rights to your User Content</li>
              <li>You grant us a perpetual, irrevocable, worldwide, royalty-free, non-exclusive, transferable, sublicensable license 
                to use, reproduce, distribute, prepare derivative works of, display, publish, and perform your User Content 
                in connection with the Website and our business operations</li>
              <li>Your User Content does not and will not infringe, violate, or misappropriate any third-party intellectual property rights, 
                privacy rights, or other rights</li>
              <li>Your User Content is not defamatory, obscene, pornographic, abusive, or otherwise unlawful</li>
              <li>You have obtained all necessary permissions, releases, and consents for any User Content you submit</li>
              <li>We have the right (but not obligation) to monitor, edit, or remove any User Content that violates these Terms</li>
              <li>We are not responsible for any User Content posted by third parties</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to remove, modify, or refuse to post any User Content for any reason, including content that 
              violates these Terms, is inappropriate, or is deemed harmful to our Website or reputation.
            </p>
          </section>

          {/* Disclaimer of Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Content Accuracy and Disclaimer</h2>
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

          {/* Warranty Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Warranty Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong className="text-red-600">THE WEBSITE, CONTENT, AND ALL MATERIALS, INFORMATION, PRODUCTS, AND SERVICES ARE PROVIDED 
              ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              To the fullest extent permissible under applicable law, NEWS BANK disclaims all warranties, express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>Warranties regarding the accuracy, reliability, completeness, or timeliness of Content</li>
              <li>Warranties that the Website will be uninterrupted, secure, or error-free</li>
              <li>Warranties regarding the results obtained from use of the Website</li>
              <li>Warranties that defects will be corrected or that the Website is free of viruses or harmful components</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              No advice or information, whether oral or written, obtained from NEWS BANK or through the Website shall create any warranty not expressly stated herein.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Third-Party Links and Services</h2>
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
            <h2 className="text-2xl font-bold text-primary mb-4">9. Advertisements</h2>
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
            <h2 className="text-2xl font-bold text-primary mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong className="text-red-600">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL NEWS BANK, ITS AFFILIATES, 
              OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY DAMAGES WHATSOEVER.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              This includes, without limitation:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Indirect, Incidental, Special, Consequential, or Punitive Damages:</strong> Including but not limited to 
                loss of profits, revenue, data, goodwill, business opportunities, or reputation</li>
              <li><strong>Direct Damages:</strong> Arising from your use or inability to use the Website</li>
              <li><strong>Damages Resulting From:</strong> Unauthorized access to or alteration of your transmissions or data, 
                statements or conduct of any third party on the Website, or any other matter relating to the Website</li>
              <li><strong>Personal Injury or Property Damage:</strong> Resulting from your access to or use of the Website</li>
              <li><strong>Technical Failures:</strong> Including interruptions, errors, defects, delays in operation or transmission, 
                computer viruses, or line failures</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Our aggregate liability for all claims arising out of or relating to these Terms or your use of the Website 
              shall not exceed the greater of: (a) the amount you paid to NEWS BANK in the twelve months prior to the event giving rise to liability, or 
              (b) one hundred Indian Rupees (₹100).</strong>
            </p>
            <p className="text-gray-700 leading-relaxed">
              These limitations apply regardless of the legal theory on which the claim is based (contract, tort, negligence, strict liability, or otherwise), 
              even if NEWS BANK has been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of 
              incidental or consequential damages, so the above limitations may not apply to you.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree to defend, indemnify, and hold harmless NEWS BANK, its parent company, subsidiaries, affiliates, officers, 
              directors, employees, consultants, agents, suppliers, licensors, and service providers (collectively, "Indemnified Parties") 
              from and against any and all claims, liabilities, damages, losses, costs, expenses, and fees (including reasonable attorneys' fees and court costs) 
              arising out of or relating to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Your access to or use of the Website</li>
              <li>Your violation of these Terms or any applicable law or regulation</li>
              <li>Your violation of any third-party rights, including intellectual property, privacy, publicity, or other proprietary rights</li>
              <li>Any User Content you submit, post, or transmit through the Website</li>
              <li>Any fraudulent, negligent, or intentional misconduct on your part</li>
              <li>Any claim that your User Content caused damage to a third party</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This indemnification obligation will survive termination of these Terms and your use of the Website. 
              We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, 
              in which event you will cooperate with us in asserting any available defenses.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">12. Privacy</h2>
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
            <h2 className="text-2xl font-bold text-primary mb-4">13. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Website at any time,
              without notice, for any reason, including violation of these Terms. Upon termination,
              you must cease all use of the Website.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">14. Governing Law and Jurisdiction</h2>
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
            <h2 className="text-2xl font-bold text-primary mb-4">15. Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may revise these Terms at any time by updating this page. You are expected to check
              this page periodically to be aware of any changes. Your continued use of the Website
              after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">16. Severability and Waiver</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Severability:</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, 
              such provision shall be modified to the minimum extent necessary to make it valid and enforceable. If such modification is not possible, 
              the invalid provision shall be severed from these Terms. The remaining provisions shall continue in full force and effect.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Waiver:</strong> No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term. 
              Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">17. Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy and Disclaimer, constitute the entire agreement between you and NEWS BANK 
              regarding your use of the Website and supersede all prior or contemporaneous understandings, agreements, representations, and warranties, 
              whether written or oral, regarding the Website.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">18. Contact Us</h2>
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
