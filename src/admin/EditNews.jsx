import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  fetchNewsById,
  updateNews,
  uploadNewsImage,
  deleteNewsImage,
} from '../services/newsService'
import { AlertCircle, Upload, ChevronLeft } from 'lucide-react'

/**
 * Edit News Page
 * Form to edit existing news articles
 */

const EditNews = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    reporter_name: '',
    is_published: false,
    image_url: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadArticle()
  }, [id])

  const loadArticle = async () => {
    const { data, error } = await fetchNewsById(id)
    if (error) {
      setError(error)
    } else if (data) {
      setFormData(data)
      if (data.image_url) {
        setPreviewUrl(data.image_url)
      }
    }
    setLoading(false)
  }

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

  const handleRemoveImage = async () => {
    if (formData.image_url && !imageFile) {
      await deleteNewsImage(formData.image_url)
    }
    setImageFile(null)
    setPreviewUrl('')
    setFormData({ ...formData, image_url: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      let imageUrl = formData.image_url

      // Delete old image and upload new one if changed
      if (imageFile) {
        if (formData.image_url) {
          await deleteNewsImage(formData.image_url)
        }
        const { data, error: uploadError } = await uploadNewsImage(imageFile)
        if (uploadError) {
          setError(uploadError)
          setSubmitting(false)
          return
        }
        imageUrl = data
      }

      // Update news article
      const updateData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        is_published: formData.is_published,
        image_url: imageUrl,
      }

      const { error: updateError } = await updateNews(id, updateData)

      if (updateError) {
        setError(updateError)
      } else {
        navigate('/admin/dashboard')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              <p className="mt-4 text-gray-600">Loading article...</p>
            </div>
          </div>
        </div>
      </main>
    )
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
          <h1 className="text-3xl font-bold">Edit Article</h1>
          <p className="text-secondary">Update news article details</p>
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
                      onClick={handleRemoveImage}
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
                Publish (visible to public)
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-secondary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 bg-gray-300 text-primary py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default EditNews
