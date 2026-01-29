# NEWS BANK - Complete API Reference

## Overview

All API operations are performed through Supabase, which provides a PostgreSQL database backend with real-time capabilities and authentication.

---

## Authentication API

### Sign In
```javascript
import { signIn } from './services/newsService'

const { data, error } = await signIn(email, password)
// Returns: { user, session } on success
// Error: error message string on failure
```

**Usage:**
```javascript
const { data: auth } = await signIn('admin@newsbank.com', 'password123')
if (auth) {
  // User logged in successfully
  console.log('Session:', auth.session)
}
```

### Sign Out
```javascript
import { signOut } from './services/newsService'

const { error } = await signOut()
// Returns: { error: null } on success
// Error: error message string on failure
```

### Get Current User
```javascript
import { getCurrentUser } from './services/newsService'

const { data: user, error } = await getCurrentUser()
// Returns: user object or null
```

### Listen to Auth Changes
```javascript
import { onAuthStateChange } from './services/newsService'

const unsubscribe = onAuthStateChange((user) => {
  if (user) {
    console.log('User logged in:', user.email)
  } else {
    console.log('User logged out')
  }
})

// Call unsubscribe() to stop listening
```

---

## News CRUD Operations

### Fetch All Published News
```javascript
import { fetchPublishedNews } from './services/newsService'

const { data: articles, error } = await fetchPublishedNews()
// Returns: Array of published articles
// Sorted by created_at descending
```

**Response Structure:**
```javascript
{
  data: [
    {
      id: "uuid-1",
      title: "Breaking News",
      content: "Article content...",
      category: "national",
      image_url: "https://...",
      is_published: true,
      created_at: "2024-01-29T10:00:00"
    },
    // ... more articles
  ],
  error: null
}
```

### Fetch News by Category
```javascript
import { fetchNewsByCategory } from './services/newsService'

const { data: articles, error } = await fetchNewsByCategory('local')
// category: 'local' | 'national' | 'business' | 'sports' | 'tech'
```

### Fetch Single Article
```javascript
import { fetchNewsById } from './services/newsService'

const { data: article, error } = await fetchNewsById('article-id')
// Returns: Single article object or null
```

### Create News Article (Admin Only)
```javascript
import { createNews } from './services/newsService'

const newsData = {
  title: "New Article",
  content: "Full article content here...",
  category: "local",
  image_url: "https://example.com/image.jpg",
  is_published: false
}

const { data: created, error } = await createNews(newsData)
// Returns: Created article with id
```

**Request Body:**
```javascript
{
  title: String,              // Required, max 255 chars
  content: String,            // Required, supports UTF-8
  category: String,           // Required, must be valid category
  image_url: String,          // Optional
  is_published: Boolean       // Optional, default false
}
```

### Update News Article (Admin Only)
```javascript
import { updateNews } from './services/newsService'

const updates = {
  title: "Updated Title",
  is_published: true
}

const { data: updated, error } = await updateNews('article-id', updates)
// Returns: Updated article
```

### Delete News Article (Admin Only)
```javascript
import { deleteNews } from './services/newsService'

const { error } = await deleteNews('article-id')
// Returns: { error: null } on success
```

### Fetch All News (Admin Only)
```javascript
import { fetchAllNewsForAdmin } from './services/newsService'

const { data: allArticles, error } = await fetchAllNewsForAdmin()
// Returns: All articles including unpublished
```

---

## Image/Storage Operations

### Upload Image
```javascript
import { uploadNewsImage } from './services/newsService'

const { data: imageUrl, error } = await uploadNewsImage(file)
// file: File object from input[type="file"]
// Returns: Public URL to uploaded image
```

**Usage Example:**
```javascript
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  const { data: imageUrl, error } = await uploadNewsImage(file)
  
  if (imageUrl) {
    setArticle({ ...article, image_url: imageUrl })
  } else {
    console.error('Upload failed:', error)
  }
}
```

### Delete Image
```javascript
import { deleteNewsImage } from './services/newsService'

const { error } = await deleteNewsImage('image_url')
// image_url: Full public URL of the image
// Returns: { error: null } on success
```

---

## Error Handling

All API calls return objects with `data` and `error` properties:

```javascript
const { data, error } = await someApiCall()

if (error) {
  // Handle error
  console.error('Error:', error)
  setErrorMessage(error)
} else if (data) {
  // Handle success
  console.log('Success:', data)
}
```

**Common Error Messages:**
```
"No rows found"              // Article not found
"Invalid input"              // Invalid category or data
"Not authenticated"          // User not logged in
"Unauthorized"               // User not allowed operation
"File upload failed"         // Image upload error
```

---

## Response Examples

### Successful Article Fetch
```javascript
{
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Breaking News Title",
  content: "Full article content...",
  category: "national",
  image_url: "https://news-bank.supabase.co/storage/v1/object/public/news-images/123456_image.jpg",
  is_published: true,
  created_at: "2024-01-29T10:30:45.000Z",
  updated_at: "2024-01-29T10:30:45.000Z"
}
```

### Successful Login
```javascript
{
  user: {
    id: "user-id",
    email: "admin@newsbank.com",
    user_metadata: {}
  },
  session: {
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refresh_token: "...",
    expires_in: 3600,
    expires_at: 1706528245
  }
}
```

### Successful Image Upload
```javascript
{
  publicUrl: "https://news-bank.supabase.co/storage/v1/object/public/news-images/1706528245_image.jpg"
}
```

---

## Rate Limiting

Supabase applies rate limits:
- **Auth:** 10 requests per minute per email
- **Database:** 1000 requests per minute per project
- **Storage:** 10 GB bandwidth per month (free tier)

**Handling Rate Limits:**
```javascript
try {
  const { data, error } = await fetchPublishedNews()
  
  if (error?.includes('rate limit')) {
    // Implement exponential backoff
    setTimeout(() => retryApiCall(), 1000)
  }
} catch (err) {
  console.error('API Error:', err)
}
```

---

## Categories

Valid news categories:
- `'local'` - Local news
- `'national'` - National news
- `'business'` - Business news
- `'sports'` - Sports news
- `'tech'` - Technology news

---

## Database Schema

### news Table
```sql
CREATE TABLE news (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('local', 'national', 'business', 'sports', 'tech')),
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes
```sql
CREATE INDEX idx_news_published ON news(is_published);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_created_at ON news(created_at DESC);
```

---

## Row Level Security Policies

### Policy: Public Read
```sql
-- Anyone can read published articles
SELECT is_published = TRUE
```

### Policy: Admin Full Access
```sql
-- Authenticated users can read all articles
SELECT auth.role() = 'authenticated'

-- Authenticated users can create articles
INSERT WITH CHECK auth.role() = 'authenticated'

-- Authenticated users can update articles
UPDATE USING auth.role() = 'authenticated'

-- Authenticated users can delete articles
DELETE USING auth.role() = 'authenticated'
```

---

## Pagination (Future Enhancement)

```javascript
export const fetchPublishedNews = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit
  const { data, error, count } = await supabase
    .from('news')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  return {
    data,
    total: count,
    page,
    pageSize: limit,
    totalPages: Math.ceil(count / limit),
    error
  }
}
```

---

## Filtering (Future Enhancement)

```javascript
export const fetchNewsFiltered = async (filters = {}) => {
  let query = supabase.from('news').select('*')
  
  // Apply filters
  if (filters.category) {
    query = query.eq('category', filters.category)
  }
  if (filters.published !== undefined) {
    query = query.eq('is_published', filters.published)
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`)
  }
  if (filters.from) {
    query = query.gte('created_at', filters.from)
  }
  if (filters.to) {
    query = query.lte('created_at', filters.to)
  }
  
  const { data, error } = await query
    .order('created_at', { ascending: false })
  
  return { data, error }
}
```

---

## Real-Time Subscriptions (Future Enhancement)

```javascript
import { supabase } from './supabaseClient'

export const subscribeToNews = (callback) => {
  return supabase
    .from('news')
    .on('*', (payload) => {
      console.log('Change received!', payload)
      callback(payload)
    })
    .subscribe()
}

// Usage:
subscribeToNews((payload) => {
  if (payload.eventType === 'INSERT') {
    // New article added
    setArticles(prev => [payload.new, ...prev])
  }
})
```

---

## Storage Bucket Configuration

### Bucket: news-images
- **Public:** Yes
- **File limit:** 50MB per file
- **Allowed formats:** jpg, png, gif, webp, svg, etc.

### Access URLs
```javascript
// Public URL format:
https://PROJECT_ID.supabase.co/storage/v1/object/public/news-images/FILENAME

// Example:
https://news-bank.supabase.co/storage/v1/object/public/news-images/1706528245_image.jpg
```

---

## Debugging Tips

### Enable Logging
```javascript
// In supabaseClient.js
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true // Enable auth debugging
  }
})
```

### Check Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Look for requests to `*.supabase.co`
4. Check response status and body

### Common Status Codes
```
200 OK               - Success
400 Bad Request      - Invalid input
401 Unauthorized     - Not authenticated
403 Forbidden        - Not authorized
404 Not Found        - Article not found
409 Conflict         - Duplicate entry
429 Too Many Requests - Rate limited
500 Server Error     - Database error
```

---

## Performance Optimization

### Use Select Projection
```javascript
// Instead of: .select('*')
// Use: .select('id,title,category,created_at')

const { data } = await supabase
  .from('news')
  .select('id,title,category,created_at')
  .eq('is_published', true)
```

### Use Order Before Limit
```javascript
const { data } = await supabase
  .from('news')
  .select('*')
  .eq('is_published', true)
  .order('created_at', { ascending: false })
  .limit(10)  // Limit after order
```

### Implement Caching
```javascript
const newsCache = new Map()

export const fetchPublishedNewsCached = async () => {
  const cached = newsCache.get('latest')
  
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
    return { data: cached.data, error: null }
  }
  
  const { data, error } = await fetchPublishedNews()
  
  if (!error) {
    newsCache.set('latest', { data, timestamp: Date.now() })
  }
  
  return { data, error }
}
```

---

## Security Best Practices

1. **Never expose API keys in frontend code**
   - Use environment variables only
   - Keep `.env.local` in `.gitignore`

2. **Validate user input**
   ```javascript
   if (!title || title.length > 255) {
     throw new Error('Invalid title')
   }
   ```

3. **Check authentication before operations**
   ```javascript
   const { data: user } = await getCurrentUser()
   if (!user) {
     redirectTo('/admin/login')
   }
   ```

4. **Use HTTPS only**
   - All Supabase APIs use HTTPS
   - Your deployment should use HTTPS

5. **Monitor for suspicious activity**
   - Check failed login attempts
   - Review audit logs regularly

---

## Support & Resources

- **Supabase JavaScript Client:** https://supabase.com/docs/reference/javascript
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/
- **REST API Reference:** https://supabase.com/docs/guides/api
- **Real-time Documentation:** https://supabase.com/docs/guides/realtime

---

**NEWS BANK API Reference Complete** ✅

For more help, check [DEVELOPMENT.md](./DEVELOPMENT.md) and [README.md](./README.md).
