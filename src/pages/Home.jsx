import React, { useState, useEffect } from 'react'
import { fetchPublishedNews } from '../services/newsService'
import { fetchAdsByPosition } from '../services/adService'
import NewsCard from '../components/NewsCard'
import { AlertCircle, Calendar, Clock, Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react'

/**
 * Home Page
 * Displays all published news articles
 */

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarAd, setSidebarAd] = useState(null)
  const [sidebarSmallAd, setSidebarSmallAd] = useState(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [weather, setWeather] = useState(null)

  // Update date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace YOUR_API_KEY with your OpenWeatherMap API key
        // Get free API key from: https://openweathermap.org/api
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_API_KEY'
        const CITY = 'Delhi' // Change to your city
        
        if (API_KEY && API_KEY !== 'YOUR_API_KEY') {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
          )
          const data = await response.json()
          if (data.main) {
            setWeather({
              temp: Math.round(data.main.temp),
              description: data.weather[0].main,
              city: data.name
            })
          }
        }
      } catch (err) {
        console.log('Weather fetch error:', err)
      }
    }
    fetchWeather()
  }, [])

  // Format date in English
  const formatDateEN = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('en-IN', options)
  }

  // Format date in Hindi
  const formatDateHI = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('hi-IN', options)
  }

  // Format time in English
  const formatTimeEN = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    })
  }

  // Format time in Hindi
  const formatTimeHI = (date) => {
    return date.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    })
  }

  // Get weather icon
  const getWeatherIcon = (description) => {
    switch (description?.toLowerCase()) {
      case 'clear': return <Sun className="w-5 h-5" />
      case 'clouds': return <Cloud className="w-5 h-5" />
      case 'rain': return <CloudRain className="w-5 h-5" />
      case 'snow': return <CloudSnow className="w-5 h-5" />
      default: return <Wind className="w-5 h-5" />
    }
  }

  useEffect(() => {
    const loadNews = async () => {
      const { data, error } = await fetchPublishedNews()
      console.log('Fetched news:', { data, error })
      if (error) {
        setError(error)
      } else {
        setArticles(data || [])
      }
      setLoading(false)
    }

    const loadAds = async () => {
      const { data: sidebar } = await fetchAdsByPosition('sidebar')
      const { data: sidebarSmall } = await fetchAdsByPosition('sidebar_small')
      setSidebarAd(sidebar)
      setSidebarSmallAd(sidebarSmall)
    }

    loadNews()
    loadAds()
  }, [])

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section - Slim Ribbon Style */}
      <section className="bg-gradient-to-r from-primary via-gray-800 to-primary text-white py-4 sm:py-6 relative overflow-hidden">
        {/* Ribbon Shape */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Date, Time & Weather Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm mb-4 pb-3 border-b border-white/20 gap-2">
            {/* English Date & Time */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-accent">
                <Calendar className="w-4 h-4" />
                <span>{formatDateEN(currentDateTime)}</span>
              </div>
              <div className="flex items-center space-x-1 text-secondary">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTimeEN(currentDateTime)}</span>
              </div>
            </div>
            
            {/* Weather */}
            {weather && (
              <div className="flex items-center space-x-2 text-white bg-white/10 px-3 py-1 rounded-full">
                {getWeatherIcon(weather.description)}
                <span className="font-semibold">{weather.temp}°C</span>
                <span>| {weather.city}</span>
              </div>
            )}
            
            {/* Hindi Date & Time */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-accent">
                <Calendar className="w-4 h-4" />
                <span>{formatDateHI(currentDateTime)}</span>
              </div>
              <div className="flex items-center space-x-1 text-secondary">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTimeHI(currentDateTime)}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">
                NEWS BANK
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-accent font-light tracking-wider">
              ख़बरों में आगे
            </p>
          </div>
        </div>
      </section>

      {/* Content Section - Mobile Optimized */}
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12 animate-fade-in-up">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News Content */}
          <div className="lg:col-span-2">
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
              <div className="grid gap-6">
                {articles.map(article => (
                  <div key={article.id} className="transition-transform duration-200 hover:scale-[1.025] focus-within:scale-[1.025] rounded-lg shadow-md bg-white animate-fade-in-up focus-visible:ring-2 focus-visible:ring-green-500" tabIndex={0} aria-label={`Read article: ${article.title}`}>
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Ads Section */}
          <aside className="lg:col-span-1">
            {/* Featured Ad Banner */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-6 mb-6 sticky top-20">
              <h3 className="text-lg font-bold mb-4">Featured Advertisement</h3>
              <div className="rounded-lg overflow-hidden">
                {sidebarAd ? (
                  <a href={sidebarAd.link_url || '#'} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={sidebarAd.image_url} 
                      alt={sidebarAd.title} 
                      className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition"
                    />
                  </a>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                    <div className="text-gray-300">
                      <p className="text-sm">Advertisement Space</p>
                      <p className="text-xs text-gray-400 mt-2">300x600 Banner</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Ad */}
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 mb-6">
              <h4 className="text-sm font-bold text-primary mb-3">Sponsored</h4>
              <div className="rounded-lg overflow-hidden">
                {sidebarSmallAd ? (
                  <a href={sidebarSmallAd.link_url || '#'} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={sidebarSmallAd.image_url} 
                      alt={sidebarSmallAd.title} 
                      className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition"
                    />
                  </a>
                ) : (
                  <div className="bg-gray-200 rounded-lg p-6 text-center h-48 flex items-center justify-center">
                    <div className="text-gray-500 text-sm">
                      Advertisement Banner<br/>300x250 Format
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trending Section */}
            {!loading && articles.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
                <h4 className="font-bold text-primary mb-4">Trending Now</h4>
                <div className="space-y-3">
                  {articles.slice(0, 3).map((article) => (
                    <a
                      key={article.id}
                      href={`/news/${article.id}`}
                      className="text-sm text-gray-700 hover:text-secondary transition line-clamp-2 block hover:font-semibold"
                    >
                      • {article.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Home
