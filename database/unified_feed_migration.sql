-- Unified feed metadata migration.
-- Safe to run against an existing News Bank database.
ALTER TABLE news ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE news ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_news_scheduled_publish_at
  ON news(scheduled_publish_at);

-- Keep scheduled articles hidden until their publication time.
DROP POLICY IF EXISTS "Published news visible to public" ON news;
CREATE POLICY "Published news visible to public"
  ON news
  FOR SELECT
  USING (
    is_published = TRUE
    AND (
      scheduled_publish_at IS NULL
      OR scheduled_publish_at <= NOW()
    )
  );
