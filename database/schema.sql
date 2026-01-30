/**
 * NEWS BANK - PostgreSQL Schema and RLS Policies
 * Run this in Supabase SQL Editor to set up the database
 */

-- Drop existing table and policies (FRESH START)
DROP TABLE IF EXISTS news CASCADE;

-- Create news table with correct UUID handling
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  reporter_name TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on published status for faster queries
CREATE INDEX idx_news_published ON news(is_published);
CREATE INDEX idx_news_created_at ON news(created_at DESC);

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

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

INSERT INTO news (title, content, reporter_name, is_published, created_at, updated_at) VALUES
(
  'Breaking News: Major Tech Announcement',
  'In a groundbreaking development, leading technology companies have announced a new collaborative initiative aimed at advancing digital innovation. The partnership brings together industry leaders to create cutting-edge solutions for modern challenges. This marks a significant milestone in the tech sector, with implications for businesses and consumers alike. Industry experts predict substantial growth in the coming quarters as these initiatives take shape.',
  'Rajesh Kumar',
  TRUE,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  'Economic Report: Market Shows Strong Recovery',
  'The latest economic indicators suggest a robust recovery across major sectors. Stock markets reached record highs as investor confidence strengthened. Consumer spending increased by 7% compared to last quarter, signaling healthy economic momentum. Analysts attribute the growth to increased employment rates and improved business conditions. Financial experts remain optimistic about sustained growth in the coming months.',
  'Priya Sharma',
  TRUE,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),
(
  'Sports: Champion Team Secures Victory',
  'In an exciting match that kept fans on the edge of their seats, the home team claimed a decisive victory against their rivals. The final score of 3-1 showcases the team''s superior performance and strategic gameplay. Key players delivered outstanding performances, with the star striker scoring a hat-trick. This victory places the team at the top of the league standings, with fans celebrating the remarkable achievement.',
  'Amit Singh',
  TRUE,
  NOW() - INTERVAL '6 hours',
  NOW() - INTERVAL '6 hours'
),
(
  'Health: New Medical Breakthrough Offers Hope',
  'Researchers have unveiled a groundbreaking treatment that shows promising results in clinical trials. The new therapy has demonstrated a 85% success rate in preliminary studies, offering new hope to patients. Medical professionals express optimism about the potential impact on public health. The treatment is expected to undergo final approval stages within the next fiscal year. This discovery represents years of dedicated research and collaboration among global health institutions.',
  'Dr. Neha Patel',
  TRUE,
  NOW() - INTERVAL '12 hours',
  NOW() - INTERVAL '12 hours'
),
(
  'Environment: Green Initiative Launches Successfully',
  'A comprehensive environmental conservation program was launched today, aimed at reducing carbon emissions by 40% over the next five years. The initiative involves planting 10 million trees and transitioning to renewable energy sources across multiple regions. Government officials and environmental organizations have pledged full support for the ambitious project. Early projections suggest significant positive impact on air quality and biodiversity. Communities are encouraged to participate in this transformative environmental initiative.',
  'Vikram Desai',
  TRUE,
  NOW() - INTERVAL '18 hours',
  NOW() - INTERVAL '18 hours'
),
(
  'Entertainment: New Film Breaks Box Office Records',
  'The highly anticipated film release has shattered box office records, earning record revenues in its opening weekend. Audiences and critics alike have praised the film for its innovative storytelling and spectacular cinematography. Industry insiders predict the film will become one of the highest-grossing movies of the year. The movie''s success has sparked interest in similar productions, with production studios fast-tracking new projects. Fans are already discussing potential sequels and spin-offs.',
  'Asha Menon',
  TRUE,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
),
(
  'Politics: New Policy Framework Announced',
  'Government officials have announced a comprehensive new policy framework designed to address key economic and social challenges. The multi-pronged approach includes measures for job creation, education enhancement, and infrastructure development. Policy experts believe the framework will have significant positive implications for the nation''s development. Public consultations will be held to gather feedback from various stakeholder groups. Implementation is scheduled to begin in the next financial quarter.',
  'Arjun Verma',
  TRUE,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
);

-- Note: Update the created_at and updated_at timestamps as needed for your testing
-- The sample data above includes 6 test articles with varied content for testing the application
