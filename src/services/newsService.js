import { supabase } from './supabaseClient'

/**
 * News Service Layer
 * Handles all news-related database operations
 */

// Fetch all published news articles
export const fetchPublishedNews = async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching published news:', error)
    return { data: null, error: error.message }
  }
}

// Fetch news by category
export const fetchNewsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error)
    return { data: null, error: error.message }
  }
}

// Fetch single news article by ID
export const fetchNewsById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching news article:', error)
    return { data: null, error: error.message }
  }
}

// Create news article (admin only)
export const createNews = async (newsData) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([newsData])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating news:', error)
    return { data: null, error: error.message }
  }
}

// Update news article (admin only)
export const updateNews = async (id, newsData) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .update(newsData)
      .eq('id', id)
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating news:', error)
    return { data: null, error: error.message }
  }
}

// Delete news article (admin only)
export const deleteNews = async (id) => {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting news:', error)
    return { error: error.message }
  }
}

// Fetch all news (published + unpublished) for admin
export const fetchAllNewsForAdmin = async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching all news:', error)
    return { data: null, error: error.message }
  }
}

// Upload image to Supabase Storage
export const uploadNewsImage = async (file) => {
  try {
    const fileName = `${Date.now()}_${file.name}`
    const { data, error } = await supabase
      .storage
      .from('news-images')
      .upload(fileName, file)

    if (error) throw error

    // Get public URL
    const { data: publicUrl } = supabase
      .storage
      .from('news-images')
      .getPublicUrl(fileName)

    return { data: publicUrl.publicUrl, error: null }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { data: null, error: error.message }
  }
}

// Delete image from Supabase Storage
export const deleteNewsImage = async (imageUrl) => {
  try {
    // Extract file path from public URL
    const fileName = imageUrl.split('/').pop()
    const { error } = await supabase
      .storage
      .from('news-images')
      .remove([fileName])

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { error: error.message }
  }
}

// Authentication functions

// Sign up (for admin)
export const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error signing up:', error)
    return { data: null, error: error.message }
  }
}

// Sign in
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error signing in:', error)
    return { data: null, error: error.message }
  }
}

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error signing out:', error)
    return { error: error.message }
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return { data: data.user, error: null }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { data: null, error: error.message }
  }
}

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null)
  })
}
