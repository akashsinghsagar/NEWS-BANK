-- ============================================
-- ADD ARTICLE-SPECIFIC ADS SUPPORT
-- Run this in Supabase SQL Editor to update the ads table
-- ============================================

-- Add article_id column to ads table for article-specific ads
-- If column already exists, this will throw an error (safe to ignore)
ALTER TABLE ads ADD COLUMN IF NOT EXISTS article_id UUID REFERENCES news(id) ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ads_article_id ON ads(article_id);

-- ============================================
-- UPDATE FULL ADS TABLE SCHEMA (if not created yet)
-- ============================================

-- Create ads table if it doesn't exist
CREATE TABLE IF NOT EXISTS ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,                              -- Ad name for reference
  image_url TEXT NOT NULL,                          -- Ad image URL
  position TEXT DEFAULT 'sidebar',                  -- sidebar, sidebar_small, inline, news_sidebar
  link_url TEXT,                                    -- Click destination URL
  article_id UUID REFERENCES news(id) ON DELETE SET NULL, -- NULL = global ad, otherwise specific to article
  is_active BOOLEAN DEFAULT TRUE,                   -- Show/hide ad
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ads_position ON ads(position);
CREATE INDEX IF NOT EXISTS idx_ads_is_active ON ads(is_active);
CREATE INDEX IF NOT EXISTS idx_ads_article_id ON ads(article_id);

-- Auto-update timestamp trigger
DROP TRIGGER IF EXISTS update_ads_updated_at ON ads;
CREATE TRIGGER update_ads_updated_at
  BEFORE UPDATE ON ads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ROW LEVEL SECURITY POLICIES FOR ADS
-- ============================================

-- Drop existing policies first
DROP POLICY IF EXISTS "Active ads visible to public" ON ads;
DROP POLICY IF EXISTS "Admins can view all ads" ON ads;
DROP POLICY IF EXISTS "Admins can create ads" ON ads;
DROP POLICY IF EXISTS "Admins can update ads" ON ads;
DROP POLICY IF EXISTS "Admins can delete ads" ON ads;

-- Policy 1: Public users can view active ads
CREATE POLICY "Active ads visible to public"
  ON ads
  FOR SELECT
  USING (is_active = TRUE);

-- Policy 2: Authenticated users (admins) can view all ads
CREATE POLICY "Admins can view all ads"
  ON ads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy 3: Only authenticated users can create ads
CREATE POLICY "Admins can create ads"
  ON ads
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Only authenticated users can update ads
CREATE POLICY "Admins can update ads"
  ON ads
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 5: Only authenticated users can delete ads
CREATE POLICY "Admins can delete ads"
  ON ads
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- VERIFICATION
-- ============================================
-- Run this to verify the ads table structure:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'ads';
