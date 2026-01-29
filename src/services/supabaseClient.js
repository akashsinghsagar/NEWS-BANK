import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Client Configuration
 * Initialize with environment variables for secure API access
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Log warning if using placeholder values
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.warn(
    '⚠️ Using placeholder Supabase credentials. Admin features will not work until you configure real credentials in .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
