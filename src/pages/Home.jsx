import React, { useState, useEffect } from 'react'
import { fetchPublishedNews } from '../services/newsService'
import NewsCard from '../components/NewsCard'
import { AlertCircle } from 'lucide-react'

/**
 * Home Page
 * Displays all published news articles
 */

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadNews = async () => {
      const { data, error } = await fetchPublishedNews()
      if (error) {
        setError(error)
      } else {
        setArticles(data || [])
      }
      setLoading(false)
    }

    loadNews()
  }, [])

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section with Animated NEWS BANK - Mobile Optimized */}
      <section className="bg-gradient-to-br from-primary via-gray-900 to-secondary text-white py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 text-center relative z-10 w-full">
          <div className="animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 animate-pulse leading-tight">
              <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%] block">
                NEWS BANK
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent animate-slideIn font-light tracking-wide px-4">
              ख़बरों में आगे
            </p>
          </div>
          
          {/* Animated Background Elements - Responsive */}
          <div className="absolute inset-0 overflow-hidden opacity-10 sm:opacity-20">
            <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-secondary rounded-full blur-3xl animate-bounce"></div>
            <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-white rounded-full blur-3xl animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Content Section - Mobile Optimized */}
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 sm:border-b-4 border-secondary"></div>
                  <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading news...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-red-900 font-semibold text-sm sm:text-base">Error Loading News</h3>
                  <p className="text-red-700 text-xs sm:text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && articles.length === 0 && (
              <div className="bg-gray-100 rounded-lg p-8 sm:p-12 text-center">
                <p className="text-gray-600 text-base sm:text-lg">No news articles found.</p>
                <p className="text-gray-500 text-sm sm:text-base mt-2">Check back soon for the latest updates!</p>
              </div>
            )}

            {/* News Grid - Mobile Optimized */}
            {!loading && !error && articles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
      </section>
    </main>
  )
}

export default Home
