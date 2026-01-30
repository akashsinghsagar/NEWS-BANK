import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createNews, uploadNewsImage } from '../services/newsService'
import { AlertCircle, Upload, ChevronLeft } from 'lucide-react'

/**
 * Add News Page
 * Form to create new news articles
 */

const AddNews = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    reporter_name: '',
    is_published: false,
  })
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
    setLoading(true)
    setError('')

    try {
      let imageUrl = ''

      // Upload image if provided
      if (imageFile) {
        const { data, error: uploadError } = await uploadNewsImage(imageFile)
        if (uploadError) {
          setError(uploadError)
          setLoading(false)
          return
        }
        imageUrl = data
      }

      // Create news article
      const newsData = {
        ...formData,
        image_url: imageUrl,
      }

      const { data, error: createError } = await createNews(newsData)

      if (createError) {
        setError(createError)
      } else {
        // Redirect to home to show published article
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="flex items-center text-accent hover:text-white mb-2 font-medium text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Add New Article</h1>
          <p className="text-secondary">Create and publish a new news article</p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
                Article Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter article title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Reporter Name */}
            <div>
              <label htmlFor="reporter_name" className="block text-sm font-medium text-primary mb-2">
                Reporter Name
              </label>
              <input
                id="reporter_name"
                type="text"
                name="reporter_name"
                value={formData.reporter_name}
                onChange={handleInputChange}
                placeholder="Enter reporter's name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-primary mb-2">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {previewUrl ? (
                  <div>
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null)
                        setPreviewUrl('')
                      }}
                      className="mt-2 text-secondary hover:underline text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <label
                      htmlFor="image"
                      className="cursor-pointer text-secondary hover:underline font-medium"
                    >
                      Click to upload
                    </label>
                    <p className="text-gray-500 text-sm">or drag and drop</p>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-primary mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter article content (supports UTF-8 for Hindi/English)"
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Support for Hindi (हिंदी) and English text
              </p>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center space-x-3">
              <input
                id="is_published"
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleInputChange}
                className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
              />
              <label htmlFor="is_published" className="text-sm font-medium text-primary">
                Publish immediately (visible to public)
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-secondary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Article'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-300 text-primary py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddNews
