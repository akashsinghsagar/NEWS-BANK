import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchNewsById } from '../services/newsService'
import { fetchAdsByPosition, fetchAdsByArticle } from '../services/adService'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'

/**
 * News Details Page
 * Displays full article with image, content, and metadata
 */

const NewsDetails = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inlineAd, setInlineAd] = useState(null)
  const [sidebarAd, setSidebarAd] = useState(null)
  const [articleAds, setArticleAds] = useState([])

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

    const loadAds = async () => {
      // First try to load article-specific ads
      const { data: specificAds } = await fetchAdsByArticle(id)
      
      if (specificAds && specificAds.length > 0) {
        // Use article-specific ads
        setArticleAds(specificAds)
        const inline = specificAds.find(ad => ad.position === 'inline')
        const sidebar = specificAds.find(ad => ad.position === 'news_sidebar')
        setInlineAd(inline || null)
        setSidebarAd(sidebar || null)
      } else {
        // Fall back to global ads
        const { data: inline } = await fetchAdsByPosition('inline')
        const { data: sidebar } = await fetchAdsByPosition('news_sidebar')
        setInlineAd(inline)
        setSidebarAd(sidebar)
      }
    }

    loadArticle()
    loadAds()
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
    <main className="bg-gray-50 min-h-screen animate-fade-in-up">
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center text-secondary hover:underline mb-6 font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <article className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in-up focus-visible:ring-2 focus-visible:ring-green-500" tabIndex={0} aria-label={`Article: ${article?.title}`}>
          {/* Article Header */}
          <div className="mb-6">
            <div className="mb-4">
              <span className="text-gray-500 text-sm">{formatDate(article.created_at)}</span>
            </div>

            <h1 className="break-words text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 leading-snug tracking-wide">
              {article.title}
            </h1>

            {/* Share Buttons */}
            <ShareButtons 
              title={article.title} 
              url={window.location.href} 
            />
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

          {/* Ad Banner After Article */}
          <div className="rounded-lg overflow-hidden my-8">
            {inlineAd ? (
              <a href={inlineAd.link_url || '#'} target="_blank" rel="noopener noreferrer">
                <img 
                  src={inlineAd.image_url} 
                  alt={inlineAd.title} 
                  className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition"
                />
              </a>
            ) : (
              <div className="bg-gray-200 rounded-lg p-6">
                <p className="text-gray-600 text-center text-sm">
                  Advertisement Space - 728x90
                </p>
              </div>
            )}
          </div>

          {/* Article Footer */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                NB
              </div>
              <div>
                <p className="font-semibold text-primary">
                  {article.reporter_name || 'NEWS BANK'}
                </p>
                <p className="text-gray-600 text-sm">Reporter</p>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Sidebar Ad */}
          <div className="rounded-lg overflow-hidden sticky top-20 mb-6">
            {sidebarAd ? (
              <a href={sidebarAd.link_url || '#'} target="_blank" rel="noopener noreferrer">
                <img 
                  src={sidebarAd.image_url} 
                  alt={sidebarAd.title} 
                  className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition"
                />
              </a>
            ) : (
              <div className="bg-gray-200 rounded-lg p-6">
                <p className="text-gray-600 text-center text-sm">
                  Advertisement Space - 300x600
                </p>
              </div>
            )}
          </div>

          {/* Related Stories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Related Stories</h3>
            <div className="space-y-4">
              <a href="/" className="block pb-4 border-b">
                <p className="text-sm font-semibold text-primary hover:text-secondary">
                  More stories from {article.category || 'News'}
                </p>
              </a>
              <a href="/" className="block pb-4">
                <p className="text-sm font-semibold text-primary hover:text-secondary">
                  Latest updates
                </p>
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default NewsDetails
