import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchNewsById } from '../services/newsService'
import { ChevronLeft, Share2, AlertCircle } from 'lucide-react'

/**
 * News Details Page
 * Displays full article with image, content, and metadata
 */

const NewsDetails = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadArticle = async () => {
      const { data, error } = await fetchNewsById(id)
      if (error) {
        setError(error)
      } else {
        setArticle(data)
        // Update page title and meta for SEO
        if (data) {
          document.title = `${data.title} | NEWS BANK`
        }
      }
      setLoading(false)
    }

    loadArticle()
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              <p className="mt-4 text-gray-600">Loading article...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !article) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="flex items-center text-secondary hover:underline mb-6 font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-red-900 font-semibold">Error Loading Article</h3>
              <p className="text-red-700 text-sm">{error || 'Article not found'}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center text-secondary hover:underline mb-6 font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">{formatDate(article.created_at)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Share Button */}
              <button className="flex items-center space-x-2 text-secondary hover:underline font-medium">
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
            </div>

            {/* Featured Image */}
            {article.image_url && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>

            {/* Google AdSense Between Content */}
            <div className="bg-gray-200 rounded-lg p-6 my-8">
              <p className="text-gray-600 text-center text-sm">
                [Google AdSense Inline Banner - 728x90]
              </p>
            </div>

            {/* Article Footer */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  NB
                </div>
                <div>
                  <p className="font-bold text-primary">NEWS BANK</p>
                  <p className="text-sm text-gray-600">ख़बरों में आगे</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Google AdSense Sidebar */}
            <div className="bg-gray-200 rounded-lg p-6 sticky top-20 mb-6">
              <p className="text-gray-600 text-center text-sm">
                [Google AdSense Sidebar - 300x600]
              </p>
            </div>

            {/* Related Stories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Related Stories</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <p className="text-sm font-semibold text-primary hover:text-secondary cursor-pointer">
                    More stories from {article.category}
                  </p>
                </div>
                <div className="pb-4 border-b">
                  <p className="text-sm font-semibold text-primary hover:text-secondary cursor-pointer">
                    Latest updates
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  )
}

export default NewsDetails
