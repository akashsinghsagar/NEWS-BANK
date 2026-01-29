import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllNewsForAdmin, signOut, deleteNews, deleteNewsImage } from '../services/newsService'
import { AlertCircle, Plus, Edit2, Trash2, LogOut } from 'lucide-react'

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

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/add-news')}
            className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Article</span>
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
                      Category
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
                        <span className="inline-block bg-secondary text-white px-3 py-1 rounded text-xs font-medium">
                          {article.category}
                        </span>
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
    </main>
  )
}

export default AdminDashboard
