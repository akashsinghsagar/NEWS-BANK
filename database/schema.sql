/**
 * NEWS BANK - PostgreSQL Schema and RLS Policies
 * Run this in Supabase SQL Editor to set up the database
 */

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('local', 'national', 'business', 'sports', 'tech')),
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on published status for faster queries
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Policy 1: Public users can only view published news
CREATE POLICY "Published news visible to public"
  ON news
  FOR SELECT
  USING (is_published = TRUE);

-- Policy 2: Authenticated users (admins) can view all news
CREATE POLICY "Admins can view all news"
  ON news
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- Policy 3: Only authenticated users can create news
CREATE POLICY "Admins can create news"
  ON news
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Only authenticated users can update news
CREATE POLICY "Admins can update news"
  ON news
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 5: Only authenticated users can delete news
CREATE POLICY "Admins can delete news"
  ON news
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE SETUP
-- ============================================

-- Create storage bucket for news images (run in Supabase Storage)
-- Bucket name: news-images
-- Public: YES (for reading)
-- Files visibility: Private initially, but we'll set public URLs

-- Storage Policy: Public read access to images
-- (Configure in Supabase Dashboard Storage > Policies)
-- - Operation: SELECT
-- - Role: Public
-- - Policy: authenticated and public
-- - Targets: Objects in news-images bucket

-- Storage Policy: Admin upload/delete
-- - Operation: INSERT, DELETE
-- - Role: Authenticated
-- - Policy: authenticated
-- - Targets: Objects in news-images bucket
