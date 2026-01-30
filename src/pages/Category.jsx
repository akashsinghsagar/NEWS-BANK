import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchNewsByCategory } from '../services/newsService'
import NewsCard from '../components/NewsCard'
import { AlertCircle, ChevronLeft } from 'lucide-react'

/**
 * Category Page
 * Displays news articles filtered by category
 */

const Category = () => {
  const { category } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCategoryNews = async () => {
      const { data, error } = await fetchNewsByCategory(category)
      if (error) {
        setError(error)
      } else {
        setArticles(data || [])
      }
      setLoading(false)
    }

    loadCategoryNews()
  }, [category])

  // Capitalize category name
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-accent hover:text-white mb-4 font-medium">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{categoryTitle}</h1>
          <p className="text-lg text-accent">Latest {categoryTitle} news and updates</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                  <p className="mt-4 text-gray-600">Loading {categoryTitle} news...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-red-900 font-semibold">Error Loading News</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && articles.length === 0 && (
              <div className="bg-gray-100 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">
                  No {categoryTitle} articles found yet.
                </p>
                <p className="text-gray-500">Check back soon for updates!</p>
              </div>
            )}

            {/* News Grid */}
            {!loading && !error && articles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Google AdSense Sidebar */}
            <div className="bg-gray-200 rounded-lg p-6 sticky top-20">
              <p className="text-gray-600 text-center text-sm">
                [Google AdSense Sidebar - 300x600]
              </p>
            </div>

            {/* Category Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-bold text-primary mb-4">{categoryTitle}</h3>
              <p className="text-gray-600 text-sm mb-4">
                Explore the latest news and updates in {categoryTitle} category.
              </p>
              <button className="w-full bg-secondary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
                Subscribe to {categoryTitle}
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Category
