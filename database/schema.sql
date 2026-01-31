/**
 * NEWS BANK - PostgreSQL Schema and RLS Policies
 * Run this in Supabase SQL Editor to set up the database
 * 
 * WORKFLOW:
 * 1. Admin logs in
 * 2. Admin creates article with title, content, reporter name
 * 3. Admin uploads featured image (stored in Supabase Storage)
 * 4. Admin checks "Publish" to make article visible
 * 5. Article appears on homepage with image
 */

-- Drop existing table and policies (FRESH START)
DROP TABLE IF EXISTS news CASCADE;

-- ============================================
-- NEWS TABLE - Stores all articles
-- ============================================
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,                              -- Article headline
  content TEXT NOT NULL,                            -- Full article body
  image_url TEXT,                                   -- URL from Supabase Storage (news-images bucket)
  reporter_name TEXT DEFAULT 'News Bank Reporter',  -- Author name
  category TEXT DEFAULT 'General',                  -- Article category
  is_published BOOLEAN DEFAULT FALSE,               -- TRUE = visible on homepage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_news_published ON news(is_published);
CREATE INDEX idx_news_created_at ON news(created_at DESC);
CREATE INDEX idx_news_category ON news(category);

-- Function to auto-update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update timestamp on every update
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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
  USING (auth.role() = 'authenticated');

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
-- STORAGE SETUP FOR IMAGES
-- ============================================
-- 
-- YOUR SUPABASE PROJECT: wfyqiicumwjndiaszzky
-- Storage Endpoint: https://wfyqiicumwjndiaszzky.storage.supabase.co/storage/v1/s3
--
-- STEP 1: Create bucket in Supabase Dashboard
--   Go to: Storage > New Bucket
--   Name: news-images
--   Public: YES ✓
--
-- STEP 2: Add Storage Policies (in Storage > news-images > Policies)
--
--   Policy A - Anyone can VIEW images:
--     CREATE POLICY "Public can view images"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'news-images');
--
--   Policy B - Admins can UPLOAD images:
--     CREATE POLICY "Admins can upload images"
--     ON storage.objects FOR INSERT
--     WITH CHECK (bucket_id = 'news-images' AND auth.role() = 'authenticated');
--
--   Policy C - Admins can DELETE images:
--     CREATE POLICY "Admins can delete images"
--     ON storage.objects FOR DELETE
--     USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');
--
-- YOUR IMAGE URLs will be:
-- https://wfyqiicumwjndiaszzky.supabase.co/storage/v1/object/public/news-images/[filename]

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

INSERT INTO news (title, content, reporter_name, category, image_url, is_published, created_at, updated_at) VALUES
(
  'Breaking News: Major Tech Announcement',
  'In a groundbreaking development, leading technology companies have announced a new collaborative initiative aimed at advancing digital innovation. The partnership brings together industry leaders to create cutting-edge solutions for modern challenges. This marks a significant milestone in the tech sector, with implications for businesses and consumers alike. Industry experts predict substantial growth in the coming quarters as these initiatives take shape.',
  'Rajesh Kumar',
  'Technology',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  TRUE,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  'Economic Report: Market Shows Strong Recovery',
  'The latest economic indicators suggest a robust recovery across major sectors. Stock markets reached record highs as investor confidence strengthened. Consumer spending increased by 7% compared to last quarter, signaling healthy economic momentum. Analysts attribute the growth to increased employment rates and improved business conditions. Financial experts remain optimistic about sustained growth in the coming months.',
  'Priya Sharma',
  'Business',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
  TRUE,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),
(
  'Sports: Champion Team Secures Victory',
  'In an exciting match that kept fans on the edge of their seats, the home team claimed a decisive victory against their rivals. The final score of 3-1 showcases the team''s superior performance and strategic gameplay. Key players delivered outstanding performances, with the star striker scoring a hat-trick. This victory places the team at the top of the league standings, with fans celebrating the remarkable achievement.',
  'Amit Singh',
  'Sports',
  'https://images.unsplash.com/photo-1461896836934- voices-17782a84-b84b-8e8b-9e2a-9f3e4a3f4b7c?w=800',
  TRUE,
  NOW() - INTERVAL '6 hours',
  NOW() - INTERVAL '6 hours'
),
(
  'Health: New Medical Breakthrough Offers Hope',
  'Researchers have unveiled a groundbreaking treatment that shows promising results in clinical trials. The new therapy has demonstrated a 85% success rate in preliminary studies, offering new hope to patients. Medical professionals express optimism about the potential impact on public health. The treatment is expected to undergo final approval stages within the next fiscal year.',
  'Dr. Neha Patel',
  'Health',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
  TRUE,
  NOW() - INTERVAL '12 hours',
  NOW() - INTERVAL '12 hours'
),
(
  'Environment: Green Initiative Launches Successfully',
  'A comprehensive environmental conservation program was launched today, aimed at reducing carbon emissions by 40% over the next five years. The initiative involves planting 10 million trees and transitioning to renewable energy sources across multiple regions. Government officials and environmental organizations have pledged full support for the ambitious project.',
  'Vikram Desai',
  'Environment',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  TRUE,
  NOW() - INTERVAL '18 hours',
  NOW() - INTERVAL '18 hours'
),
(
  'Entertainment: New Film Breaks Box Office Records',
  'The highly anticipated film release has shattered box office records, earning record revenues in its opening weekend. Audiences and critics alike have praised the film for its innovative storytelling and spectacular cinematography. Industry insiders predict the film will become one of the highest-grossing movies of the year.',
  'Asha Menon',
  'Entertainment',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
  TRUE,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
);

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this to verify data was inserted:
-- SELECT id, title, category, is_published, image_url IS NOT NULL as has_image FROM news;
