import React from 'react'
import { Link } from 'react-router-dom'
import { Info, Target, Users, Award, Mail, Phone, ChevronLeft, Newspaper, Globe, Clock, Shield } from 'lucide-react'

/**
 * About Page
 * Professional about section for NEWS BANK
 */

const About = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link to="/" className="flex items-center text-secondary hover:text-primary mb-6 font-medium">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img 
              src="/LOGO.png" 
              alt="NEWS BANK" 
              className="w-24 h-24 object-contain"
            />
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                <Info className="w-7 h-7 text-secondary" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">About NEWS BANK</h1>
              </div>
              <p className="text-xl text-secondary font-semibold mb-1">ख़बरों में आगे</p>
              <p className="text-gray-600">Your Trusted Source for News and Information</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>NEWS BANK</strong> - your premier destination for comprehensive, reliable, and 
              timely news coverage. Established with a vision to keep our readers informed and empowered, 
              NEWS BANK is a dynamic digital news platform that brings you the latest updates from across India and around the world.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In an era of information overload, we stand committed to delivering authentic journalism that matters. 
              Our mission is simple yet powerful: to provide you with accurate, unbiased, and engaging news content 
              that helps you understand the world better and make informed decisions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're looking for breaking news, in-depth analysis, sports updates, entertainment coverage, 
              or business insights, NEWS BANK serves as your comprehensive news companion, available 24/7 at your fingertips.
            </p>
          </section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-secondary" />
                <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                To deliver credible, timely, and comprehensive news coverage that empowers our readers to stay 
                informed about local, national, and global events.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Provide accurate and verified information</li>
                <li>Uphold journalistic integrity and ethics</li>
                <li>Foster informed public discourse</li>
                <li>Bridge language barriers with bilingual content</li>
                <li>Deliver news that matters to you</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8 text-secondary" />
                <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                To become India's most trusted and widely-accessed digital news platform, known for our 
                commitment to truth, transparency, and quality journalism.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Be the go-to source for breaking news</li>
                <li>Expand our reach across all demographics</li>
                <li>Leverage technology for better news delivery</li>
                <li>Build a community of informed citizens</li>
                <li>Set new standards in digital journalism</li>
              </ul>
            </section>
          </div>

          {/* What We Offer */}
          <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Newspaper className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Comprehensive Coverage</h3>
                <p className="text-gray-600 text-sm">
                  Politics, Sports, Entertainment, Technology, Business, Health, and more
                </p>
              </div>

              <div className="text-center">
                <div className="bg-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-Time Updates</h3>
                <p className="text-gray-600 text-sm">
                  Breaking news and live updates as events unfold around the clock
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bilingual Content</h3>
                <p className="text-gray-600 text-sm">
                  News in both Hindi and English to reach wider audiences
                </p>
              </div>

              <div className="text-center">
                <div className="bg-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Verified Information</h3>
                <p className="text-gray-600 text-sm">
                  Fact-checked content from reliable sources you can trust
                </p>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Accuracy & Truth</h3>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to reporting facts accurately and verifying information from reliable sources 
                  before publication. Truth is the foundation of our journalism.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Impartiality</h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to present balanced perspectives and avoid bias in our reporting, allowing readers 
                  to form their own informed opinions on issues that matter.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Transparency</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe in being transparent about our sources, methods, and any potential conflicts of interest, 
                  maintaining accountability to our readers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrity</h3>
                <p className="text-gray-700 leading-relaxed">
                  We uphold the highest ethical standards in journalism, respecting privacy, dignity, and the 
                  rights of individuals while pursuing stories in the public interest.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Accessibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  We make news accessible to everyone through our user-friendly platform, bilingual content, 
                  and free access to quality journalism.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  We embrace technology and innovation to enhance news delivery, improve user experience, 
                  and adapt to the evolving digital landscape.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Why Choose NEWS BANK?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Credible Journalism</h3>
                  <p className="text-white text-opacity-90">
                    Our team verifies every story through multiple sources to ensure accuracy
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">24/7 Coverage</h3>
                  <p className="text-white text-opacity-90">
                    Round-the-clock news updates so you never miss important developments
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">User-Friendly Platform</h3>
                  <p className="text-white text-opacity-90">
                    Clean, intuitive design that makes finding and reading news effortless
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Free Access</h3>
                  <p className="text-white text-opacity-90">
                    No paywalls or subscriptions - quality journalism accessible to all
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Diverse Perspectives</h3>
                  <p className="text-white text-opacity-90">
                    Coverage that reflects multiple viewpoints and voices from across India
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Community Focus</h3>
                  <p className="text-white text-opacity-90">
                    We listen to our readers and continuously improve based on your feedback
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-secondary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">Our Team</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              NEWS BANK is powered by a dedicated team of experienced journalists, editors, content creators, 
              and technology professionals who share a common passion for quality journalism. Our team works 
              tirelessly to bring you news that matters, when it matters.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              With diverse backgrounds and expertise across various beats including politics, sports, entertainment, 
              technology, business, and more, our team ensures comprehensive coverage of stories that impact your life.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every member of our team is committed to upholding the highest standards of journalistic integrity, 
              accuracy, and ethics. We take pride in the trust you place in us and work every day to earn and maintain it.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Get In Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We value your feedback, suggestions, and story ideas. Whether you have questions, concerns, or 
              would like to contribute, we'd love to hear from you. Connect with us through any of the following channels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                  <a href="mailto:newsbankchannel@gmail.com" 
                     className="text-secondary hover:underline break-all">
                    newsbankchannel@gmail.com
                  </a>
                  <p className="text-gray-600 text-sm mt-1">
                    For general inquiries, feedback, and partnership opportunities
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                  <div className="space-y-1">
                    <a href="tel:+918825336520" className="block text-secondary hover:underline">
                      +91 8825336520
                    </a>
                    <a href="tel:+918271681962" className="block text-secondary hover:underline">
                      +91 8271681962
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    Available during business hours (10:00 AM - 6:00 PM IST)
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <Link to="/contact" 
                    className="inline-block bg-secondary text-white px-8 py-3 rounded-lg 
                               font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg">
                Visit Our Contact Page
              </Link>
            </div>
          </section>

          {/* Commitment Statement */}
          <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border-l-4 border-secondary">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Commitment to You</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At NEWS BANK, we understand the responsibility that comes with being a news platform in today's 
              fast-paced digital world. We are committed to:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-secondary mr-3 font-bold">•</span>
                <span><strong>Maintaining Editorial Independence:</strong> Our content is not influenced by 
                advertisers, corporate interests, or political affiliations</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 font-bold">•</span>
                <span><strong>Correcting Errors Promptly:</strong> When we make mistakes, we acknowledge and 
                correct them transparently</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 font-bold">•</span>
                <span><strong>Protecting Your Privacy:</strong> We handle your personal information responsibly 
                and respect your privacy rights</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 font-bold">•</span>
                <span><strong>Continuous Improvement:</strong> We constantly evolve and improve our platform 
                based on reader feedback and technological advancements</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 font-bold">•</span>
                <span><strong>Serving the Public Interest:</strong> We prioritize stories that matter to 
                society and contribute to informed public discourse</span>
              </li>
            </ul>
          </section>

          {/* Footer Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-700 mb-4 font-semibold">
              Thank you for choosing NEWS BANK as your trusted news source.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
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
      </div>
    </main>
  )
}

export default About
