import { supabase } from './supabaseClient'

/**
 * Ad Service Layer
 * Handles all advertisement-related database operations
 */

// Fetch all active ads
export const fetchActiveAds = async () => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching ads:', error)
    return { data: null, error: error.message }
  }
}

// Fetch ads by position (sidebar, inline, etc.)
export const fetchAdsByPosition = async (position) => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('position', position)
      .eq('is_active', true)
      .is('article_id', null) // Global ads only
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) throw error
    return { data: data?.[0] || null, error: null }
  } catch (error) {
    console.error(`Error fetching ${position} ad:`, error)
    return { data: null, error: error.message }
  }
}

// Fetch ads for specific article
export const fetchAdsByArticle = async (articleId) => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('article_id', articleId)
      .eq('is_active', true)
      .order('position', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`Error fetching ads for article ${articleId}:`, error)
    return { data: null, error: error.message }
  }
}

// Fetch all ads for admin
export const fetchAllAdsForAdmin = async () => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching all ads:', error)
    return { data: null, error: error.message }
  }
}

// Create ad
export const createAd = async (adData) => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .insert([adData])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating ad:', error)
    return { data: null, error: error.message }
  }
}

// Update ad
export const updateAd = async (id, adData) => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .update(adData)
      .eq('id', id)
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating ad:', error)
    return { data: null, error: error.message }
  }
}

// Delete ad
export const deleteAd = async (id) => {
  try {
    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting ad:', error)
    return { error: error.message }
  }
}

// Upload ad image to Supabase Storage
export const uploadAdImage = async (file) => {
  try {
    const fileName = `ad_${Date.now()}_${file.name}`
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
    console.error('Error uploading ad image:', error)
    return { data: null, error: error.message }
  }
}
