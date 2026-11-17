import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, ArrowRight, Search, Sparkles } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchAdsByPosition } from '../services/adService'
import { fetchPublishedNews } from '../services/newsService'
import AdSlider from '../components/AdSlider'
import NewsCard from '../components/NewsCard'
import AnimatedTagline from '../components/AnimatedTagline'

const formatDate = (value) => new Date(value).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [searchParams] = useSearchParams()
  const searchRef = useRef(null)
  const [ad, setAd] = useState(null)

  useEffect(() => {
    const load = async () => {
      const [{ data, error: newsError }, { data: adData }] = await Promise.all([
        fetchPublishedNews(),
        fetchAdsByPosition('sidebar'),
      ])
      if (newsError) setError(newsError)
      setArticles(data || [])
      setAd(adData || null)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const focusSearch = () => searchRef.current?.focus()
    window.addEventListener('newsbank:focus-search', focusSearch)
    if (searchParams.get('search') === 'true') {
      window.setTimeout(focusSearch, 0)
    }
    return () => window.removeEventListener('newsbank:focus-search', focusSearch)
  }, [searchParams])

  const filteredArticles = useMemo(() => {
    const value = query.trim().toLowerCase()
    return articles.filter((article) => {
      const tags = Array.isArray(article.tags) ? article.tags.join(' ') : (article.tags || '')
      const searchable = `${article.title} ${article.content} ${article.reporter_name || ''} ${tags}`.toLowerCase()
      const matchesQuery = !value || searchable.includes(value)
      const matchesDate = !dateFilter || new Date(article.created_at).toISOString().slice(0, 10) === dateFilter
      return matchesQuery && matchesDate
    })
  }, [articles, query, dateFilter])

  const featured = filteredArticles[0]
  const feed = filteredArticles.slice(1)

  return (
    <main className="public-shell">
      <section className="editorial-masthead">
        <div className="editorial-masthead__inner">
          <div>
            <p className="eyebrow"><Sparkles size={14} /> Independent digital journalism</p>
            <h1><AnimatedTagline variant="hero" /></h1>
            <p className="masthead-copy">The latest stories, context and updates from News Bank — in one clear, continuously updated feed.</p>
          </div>
          <div className="masthead-date">
            <span>Today</span>
            <strong>{formatDate(new Date())}</strong>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Breaking news">
        <span className="ticker__label">BREAKING</span>
        <span>Stay informed with the latest News Bank updates</span>
      </div>

      <section className="public-content">
        <div className="public-content__header">
          <div>
            <p className="eyebrow">The News Bank briefing</p>
            <h2>Latest stories</h2>
          </div>
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the news"
              aria-label="Search news"
            />
          </label>
          <label className="date-filter">
            <span>Published</span>
            <input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} aria-label="Filter by publication date" />
          </label>
        </div>

        {ad && (
          <a className="top-ad" href={ad.link_url || '#'} target="_blank" rel="noopener noreferrer">
            <span>Advertisement</span>
            <img className="ad-media-4-3" src={ad.image_url} alt={ad.title} />
          </a>
        )}

        {loading && <div className="state-card"><div className="loader" /> Loading the latest stories…</div>}
        {error && !loading && (
          <div className="state-card state-card--error"><AlertCircle size={20} /><span>Unable to load news: {error}</span></div>
        )}
        {!loading && !error && !filteredArticles.length && (
          <div className="state-card"><p>No stories match your search.</p></div>
        )}

        {!loading && !error && featured && (
          <div className="featured-story">
            <Link to={`/news/${featured.id}`} className="featured-story__image">
              {featured.image_url ? <img className="news-media-4-3" src={featured.image_url} alt={featured.title} /> : <div className="image-placeholder news-media-4-3">NEWS BANK</div>}
            </Link>
            <div className="featured-story__content">
              <p className="eyebrow">Featured story</p>
              <Link to={`/news/${featured.id}`}><h2>{featured.title}</h2></Link>
              <p>{(featured.content || '').slice(0, 220)}{featured.content?.length > 220 ? '…' : ''}</p>
              <div className="story-meta"><span>{featured.reporter_name || 'News Bank'}</span><span>{formatDate(featured.created_at)}</span></div>
              <Link to={`/news/${featured.id}`} className="text-link">Read full story <ArrowRight size={16} /></Link>
            </div>
          </div>
        )}

        {feed.length > 0 && (
          <div className="feed-layout">
            <div className="news-feed">
              <div className="section-rule"><span>More from News Bank</span></div>
              {feed.map((article, index) => (
                <React.Fragment key={article.id}>
                  <NewsCard article={article} />
                  {(index + 1) % 4 === 0 && <AdSlider />}
                </React.Fragment>
              ))}
            </div>
            <aside className="most-read">
              <p className="eyebrow">Read next</p>
              <h3>Most recent</h3>
              {filteredArticles.slice(0, 5).map((article, index) => (
                <Link to={`/news/${article.id}`} key={article.id} className="most-read__item">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <span>{article.title}</span>
                </Link>
              ))}
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
