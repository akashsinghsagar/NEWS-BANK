# NEWS BANK - Supabase Configuration Guide

## Step-by-Step Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create account
3. Click "New Project"
4. Enter project details:
   - **Name:** news-bank
   - **Database Password:** (strong password)
   - **Region:** Choose closest to users
5. Wait for project to be created

### 2. Get API Keys

1. Go to Settings > API
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public** → `VITE_SUPABASE_ANON_KEY`
3. Store in `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. Create Database Tables

1. Go to SQL Editor
2. Create new query
3. Copy-paste this SQL:

```sql
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public can read published news
CREATE POLICY "Published news visible to public"
  ON news FOR SELECT
  USING (is_published = TRUE);

-- Policy 2: Authenticated admins can read all
CREATE POLICY "Admins can view all news"
  ON news FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy 3: Authenticated admins can create
CREATE POLICY "Admins can create news"
  ON news FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Authenticated admins can update
CREATE POLICY "Admins can update news"
  ON news FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 5: Authenticated admins can delete
CREATE POLICY "Admins can delete news"
  ON news FOR DELETE
  USING (auth.role() = 'authenticated');
```

4. Click "Run"
5. You should see success message

### 4. Create Storage Bucket

1. Go to Storage
2. Click "New bucket"
3. Name: `news-images`
4. Set to **Public**
5. Click Create

### 5. Configure Storage Policies

1. In Storage, click on `news-images` bucket
2. Go to Policies tab
3. Click "New Policy" for SELECT:
   ```
   Definition: "(('public'::text = 'public'::text) OR (auth.role() = 'authenticated'::text))"
   ```
   This allows everyone to read images

4. Click "New Policy" for INSERT/UPDATE/DELETE:
   ```
   Definition: "((auth.role() = 'authenticated'::text))"
   ```
   This allows only logged-in admins to upload/delete

### 6. Enable Email Authentication

1. Go to Authentication > Providers
2. Ensure "Email" is enabled (should be by default)
3. Settings > Email:
   - Enable "Confirm email"
   - Set email change token expiry: 86400 (24 hours)

### 7. Create Admin User

1. Go to Authentication > Users
2. Click "Add user"
3. Enter:
   - **Email:** admin@newsbank.com
   - **Password:** (strong, unique password)
   - **Confirm password**
4. Uncheck "Auto Confirm User" (so you confirm)
5. Click "Create user"

Now you have a fully configured Supabase project! 

## Testing the Setup

### Test Public Read Access
```javascript
// In browser console, you can test:
const { data } = await supabase
  .from('news')
  .select('*')
  .eq('is_published', true)

console.log(data) // Should see published articles
```

### Test Admin Operations
```javascript
// After login:
const { data } = await supabase
  .from('news')
  .select('*')
  // All articles visible

const { data: created } = await supabase
  .from('news')
  .insert([{
    title: 'Test Article',
    content: 'Test content',
    category: 'local',
    is_published: true
  }])
```

## Troubleshooting

### RLS Policy Issues
- If you can't create articles, check RLS policies
- Use `auth.role()` not `auth.user()`
- Test with: `select current_user`

### Image Upload Fails
- Verify bucket exists and is public
- Check storage policies allow authenticated uploads
- Try uploading directly via Supabase dashboard

### Authentication Issues
- Clear browser cookies
- Check email is correct
- Verify user exists in Auth section
- Check email is confirmed (icon next to email)

### Connection Issues
- Verify env variables are correct
- Check network tab for 401/403 errors
- Ensure Supabase project is "Running" state

## Database Backup

Regular backups are important:

1. Go to Settings > Backups
2. Enable daily backups
3. You can restore from past 30 days

## Production Checklist

- [ ] RLS policies are correctly configured
- [ ] Storage bucket is private with specific policies
- [ ] Admin users are created and confirmed
- [ ] Database backups are enabled
- [ ] Environment variables are secure (no commits)
- [ ] CORS is configured if needed
- [ ] Rate limiting enabled (optional)
- [ ] Monitoring/logging is set up
- [ ] Supabase project is in expected region

## Next Steps

After completing Supabase setup:
1. Run `npm install`
2. Create `.env.local` with your keys
3. Run `npm run dev`
4. Visit http://localhost:3000
5. Test login at `/admin/login`
6. Create test article
7. Publish and view on home page

Good luck! 🚀
