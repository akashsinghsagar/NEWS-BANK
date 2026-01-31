import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  fetchAllAdsForAdmin, 
  createAd, 
  updateAd, 
  deleteAd, 
  uploadAdImage 
} from '../services/adService'
import { fetchAllNewsForAdmin } from '../services/newsService'
import { ChevronLeft, Upload, Trash2, Plus, Image, AlertCircle } from 'lucide-react'

/**
 * Manage Ads Page
 * Admin can upload and manage advertisement images
 */

const ManageAds = () => {
  const [ads, setAds] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Form state
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    position: 'sidebar',
    link_url: '',
    is_active: true,
    article_id: '' // Empty = global ad, otherwise specific to article
  })
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Ad positions
  const positions = [
    { value: 'sidebar', label: 'Home Sidebar Large (300x600)' },
    { value: 'sidebar_small', label: 'Home Sidebar Small (300x250)' },
    { value: 'inline', label: 'After Article Content (728x90)' },
    { value: 'news_sidebar', label: 'News Page Sidebar (300x600)' }
  ]

  useEffect(() => {
    loadAds()
    loadArticles()
  }, [])

  const loadAds = async () => {
    setLoading(true)
    const { data, error } = await fetchAllAdsForAdmin()
    if (error) {
      setError(error)
    } else {
      setAds(data || [])
    }
    setLoading(false)
  }

  const loadArticles = async () => {
    const { data } = await fetchAllNewsForAdmin()
    setArticles(data || [])
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      if (!imageFile) {
        setError('Please select an image for the ad')
        setSubmitting(false)
        return
      }

      // Upload image
      const { data: imageUrl, error: uploadError } = await uploadAdImage(imageFile)
      if (uploadError) {
        setError(uploadError)
        setSubmitting(false)
        return
      }

      // Create ad
      const adData = {
        ...formData,
        image_url: imageUrl,
        article_id: formData.article_id || null // null for global ads
      }

      const { error: createError } = await createAd(adData)
      if (createError) {
        setError(createError)
      } else {
        setSuccess('Ad created successfully!')
        setShowForm(false)
        setFormData({ title: '', position: 'sidebar', link_url: '', is_active: true, article_id: '' })
        setImageFile(null)
        setPreviewUrl('')
        loadAds()
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleActive = async (ad) => {
    const { error } = await updateAd(ad.id, { is_active: !ad.is_active })
    if (error) {
      setError(error)
    } else {
      loadAds()
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      const { error } = await deleteAd(id)
      if (error) {
        setError(error)
      } else {
        setSuccess('Ad deleted successfully!')
        loadAds()
      }
    }
  }

  return (
    <main className={`min-h-screen ${ecoBg} pb-8`}>
      {/* Header */}
      <div className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <Link to="/admin/dashboard" className="flex items-center text-accent hover:text-white mb-2 font-medium text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Manage Advertisements</h1>
          <p className="text-secondary">Upload and manage ad banners</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Add New Ad Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className={`mb-6 flex items-center space-x-2 ${ecoButton} transition`}
          >
            <Plus className="w-5 h-5" />
            <span>Add New Ad</span>
          </button>
        )}

        {/* Add Ad Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className={`text-xl font-bold ${ecoAccent} mb-4`}>Add New Advertisement</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Title (for reference)
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Sale Banner"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {positions.map(pos => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>

              {/* Article Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Article (optional)
                </label>
                <select
                  name="article_id"
                  value={formData.article_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">Global Ad (shown on all pages)</option>
                  {articles.map(article => (
                    <option key={article.id} value={article.id}>
                      {article.title.substring(0, 60)}{article.title.length > 60 ? '...' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for global ads, or select a specific article
                </p>
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Click URL (optional)
                </label>
                <input
                  type="url"
                  name="link_url"
                  value={formData.link_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="adImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                      <label htmlFor="adImage" className="cursor-pointer text-secondary hover:underline">
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <label htmlFor="adImage" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload ad image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </label>
                  )}
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-secondary focus:ring-secondary rounded"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  Active (show this ad)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {submitting ? 'Uploading...' : 'Create Ad'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setImageFile(null)
                    setPreviewUrl('')
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Ads List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-bold text-primary p-6 border-b">Current Advertisements</h2>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
          ) : ads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Image className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No advertisements yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {ads.map(ad => (
                <div key={ad.id} className="p-4 flex items-center space-x-4">
                  {/* Ad Image */}
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  
                  {/* Ad Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{ad.title}</h3>
                    <p className="text-sm text-gray-500">
                      Position: {positions.find(p => p.value === ad.position)?.label || ad.position}
                    </p>
                    <p className="text-xs text-gray-400">
                      {ad.article_id 
                        ? `📌 Article: ${articles.find(a => a.id === ad.article_id)?.title?.substring(0, 40) || 'Specific article'}...`
                        : '🌐 Global (all pages)'
                      }
                    </p>
                    {ad.link_url && (
                      <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:underline">
                        {ad.link_url}
                      </a>
                    )}
                  </div>
                  
                  {/* Status & Actions */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleActive(ad)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ad.is_active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {ad.is_active ? 'Active' : 'Inactive'}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function AdminManageAdsWrapper() {
  return (
    <div className="flex flex-col min-h-screen">
      <ManageAds />
    </div>
  )
}
