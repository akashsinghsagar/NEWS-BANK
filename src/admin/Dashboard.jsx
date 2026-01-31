import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { fetchAllNewsForAdmin, signOut, deleteNews, deleteNewsImage } from '../services/newsService'
import { AlertCircle, Plus, Edit2, Trash2, LogOut, ChevronLeft, Image } from 'lucide-react'

/**
 * Admin Dashboard
 * Displays all articles and management options
 */

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    const { data, error } = await fetchAllNewsForAdmin()
    if (error) {
      setError(error)
    } else {
      setArticles(data || [])
    }
    setLoading(false)
  }

  const handleDeleteArticle = async (id, imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return
    }

    setDeleteLoading(id)

    // Delete image first if exists
    if (imageUrl) {
      await deleteNewsImage(imageUrl)
    }

    // Delete article
    const { error } = await deleteNews(id)
    if (error) {
      setError(error)
    } else {
      setArticles(articles.filter((article) => article.id !== id))
    }

    setDeleteLoading(null)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
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
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <Link to="/" className="flex items-center text-accent hover:text-white mb-2 font-medium text-sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">NEWS BANK Admin</h1>
            <p className="text-secondary">Article Management Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-secondary hover:opacity-90 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/admin/add-news')}
                className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Article</span>
              </button>
              
              <button
                onClick={() => navigate('/admin/manage-ads')}
                className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition border-2 border-secondary"
              >
                <Image className="w-5 h-5" />
                <span>Manage Ads</span>
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-semibold">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                  <p className="mt-4 text-gray-600">Loading articles...</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && articles.length === 0 && (
              <div className="bg-gray-100 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">No articles found.</p>
                <p className="text-gray-500">
                  Click "Add New Article" to create your first news article.
                </p>
              </div>
            )}

            {/* Articles Table */}
            {!loading && articles.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-primary">
                          Date
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-primary">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-primary line-clamp-1">
                              {article.title}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                                article.is_published
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {article.is_published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(article.created_at)}
                          </td>
                          <td className="px-6 py-4 flex items-center justify-center space-x-3">
                            <button
                              onClick={() => navigate(`/admin/edit-news/${article.id}`)}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteArticle(article.id, article.image_url)
                              }
                              disabled={deleteLoading === article.id}
                              className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Advertisement Section */}
          <aside className="lg:col-span-1">
            {/* Top Banner Ad */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-6 mb-6 sticky top-20">
              <h3 className="text-lg font-bold mb-4">Promote Your News</h3>
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-300 text-sm">[Advertisement Banner - 300x250]</p>
                <p className="text-xs text-gray-400 mt-2">Advertise here</p>
              </div>
            </div>

            {/* Featured Ad - Picture Format */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-primary mb-4">Featured Ad</h3>
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">[Advertisement Image]</p>
                  <p className="text-xs text-gray-400 mt-2">300x300 Format</p>
                </div>
              </div>
            </div>

            {/* Secondary Ad - Vertical Banner */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Sidebar Ad</h3>
              <div className="bg-gray-300 rounded-lg p-8 text-center h-64 flex items-center justify-center">
                <div>
                  <p className="text-gray-600 text-sm">[Advertisement Space]</p>
                  <p className="text-xs text-gray-500 mt-2">300x600 Banner</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard
