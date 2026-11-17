import React from 'react'
import { Link } from 'react-router-dom'

/**
 * News Card Component
 * Displays individual news article in a grid/list
 */

const NewsCard = ({ article }) => {
  const truncateText = (text = '', maxLength = 150) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const readingTime = Math.max(1, Math.ceil((article.content || '').trim().split(/\s+/).length / 200))

  return (
  <article className="news-card group">
      {/* Image */}
      {article.image_url && (
        <Link to={`/news/${article.id}`}>
          <div className="news-card__image">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="news-card__body">
        <Link to={`/news/${article.id}`}>
          <h3 className="news-card__title">
            {article.title}
          </h3>
        </Link>

        <p className="news-card__summary">
          {truncateText(article.content)}
        </p>

        <div className="news-card__meta">
          <div>
            <span>{article.reporter_name || 'News Bank'}</span>
            <span>{formatDate(article.created_at)} · {readingTime} min read</span>
          </div>
          <Link to={`/news/${article.id}`} className="news-card__read">Read story <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
