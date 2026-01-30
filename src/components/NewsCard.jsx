import React from 'react'
import { Link } from 'react-router-dom'

/**
 * News Card Component
 * Displays individual news article in a grid/list
 */

const NewsCard = ({ article }) => {
  const truncateText = (text, maxLength = 150) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <article className="card-premium bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group touch-manipulation active:scale-95">
      {/* Image */}
      {article.image_url && (
        <Link to={`/news/${article.id}`}>
          <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-200">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-3 sm:p-4">
        <Link to={`/news/${article.id}`}>
          <h3 className="text-base sm:text-lg font-bold text-primary hover:text-secondary transition mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">
          {truncateText(article.content)}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-col text-xs text-gray-500">
            <span>{formatDate(article.created_at)}</span>
            {article.reporter_name && (
              <span className="text-gray-600 font-medium">By: {article.reporter_name}</span>
            )}
          </div>
          <Link
            to={`/news/${article.id}`}
            className="text-secondary font-semibold text-xs sm:text-sm hover:underline transition active:scale-95"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
