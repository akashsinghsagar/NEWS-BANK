# NEWS BANK - Complete Production-Ready News Portal

A full-stack news portal application built with React, Supabase, and Tailwind CSS. Supports Hindi and English content with admin panel for content management.

## Features

### Public Features
- ✅ Responsive mobile-first design
- ✅ Latest published news on home page
- ✅ News articles grouped by categories (Local, National, Business, Sports, Tech)
- ✅ Full article page with images and content
- ✅ Hindi/English text support (UTF-8)
- ✅ SEO-friendly structure
- ✅ Google AdSense integration points
- ✅ Loading, empty, and error states

### Admin Features
- ✅ Secure admin authentication
- ✅ Admin dashboard with article management
- ✅ Create new articles with image uploads
- ✅ Edit published and draft articles
- ✅ Delete articles
- ✅ Publish/unpublish articles
- ✅ Image management (upload to Supabase Storage)

### Security
- ✅ Supabase Row Level Security (RLS)
- ✅ Public read-only access to published news
- ✅ Admin-only CRUD operations
- ✅ Protected admin routes
- ✅ Secure image storage

## Tech Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## Project Structure

```
src/
├── admin/
│   ├── Login.jsx           # Admin login form
│   ├── Dashboard.jsx       # Article management dashboard
│   ├── AddNews.jsx         # Create new article
│   └── EditNews.jsx        # Edit existing article
├── pages/
│   ├── Home.jsx            # Latest news feed
│   ├── Category.jsx        # Category-filtered news
│   └── NewsDetails.jsx     # Full article page
├── components/
│   ├── Navbar.jsx          # Header with navigation
│   ├── Footer.jsx          # Footer with links
│   └── NewsCard.jsx        # News article card
├── services/
│   ├── supabaseClient.js   # Supabase initialization
│   └── newsService.js      # CRUD operations
├── routes/
│   └── ProtectedRoute.jsx  # Admin route protection
├── styles/
│   └── index.css           # Global styles
├── App.jsx                 # Main app routing
└── main.jsx               # Entry point
```

## Installation & Setup

### 1. Clone Repository
```bash
cd "news bank"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your Project URL and Anon Key from Settings > API
3. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

4. Update `.env.local`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Create Database Schema

1. Go to Supabase Dashboard > SQL Editor
2. Click "New Query"
3. Copy content from `database/schema.sql`
4. Run the query to create tables and RLS policies

### 5. Create Storage Bucket

1. Go to Supabase > Storage
2. Create new bucket named `news-images`
3. Set to Public
4. Go to Policies tab and add:
   - **SELECT:** Allow public read access
   - **INSERT/DELETE:** Allow authenticated users only

### 6. Create Admin User

```bash
# In Supabase Dashboard > Authentication > Users
# Click "Add User" and create admin account
# Email: admin@newsbank.com
# Password: (choose secure password)
```

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Usage

### Public User Flow
1. Visit home page to see latest news
2. Click on category links to filter news
3. Click article to read full content
4. Share articles (button placeholder)

### Admin Flow
1. Visit `/admin/login`
2. Enter admin email and password
3. On dashboard, click "Add New Article" to create news
4. Upload featured image
5. Write article in Hindi or English
6. Click "Create Article" to save as draft
7. Toggle "Publish" to make visible to public
8. Edit or delete articles from dashboard

## API Endpoints Used (via Supabase)

### News Operations
- `GET /news` - Fetch all published news
- `GET /news?category=local` - Fetch news by category
- `GET /news/:id` - Fetch single article
- `POST /news` - Create article (admin)
- `PATCH /news/:id` - Update article (admin)
- `DELETE /news/:id` - Delete article (admin)

### Storage
- `POST /storage/news-images/:file` - Upload image
- `GET /storage/news-images/:file` - Get public image URL
- `DELETE /storage/news-images/:file` - Delete image (admin)

### Authentication
- `POST /auth/signup` - Admin registration
- `POST /auth/signin` - Admin login
- `POST /auth/signout` - Admin logout

## Environment Variables

```env
VITE_SUPABASE_URL          # Supabase project URL
VITE_SUPABASE_ANON_KEY     # Supabase anonymous key
```

## Database Schema

### news table
```sql
id (UUID)          - Primary key
title (TEXT)       - Article title
content (TEXT)     - Article body (supports UTF-8)
category (TEXT)    - Category (local, national, business, sports, tech)
image_url (TEXT)   - Featured image URL
is_published (BOOLEAN) - Publication status
created_at (TIMESTAMP) - Creation date
updated_at (TIMESTAMP) - Last update date
```

## Security Features

1. **Row Level Security (RLS)**
   - Public can only view published articles
   - Authenticated users (admins) can manage all articles

2. **Authentication**
   - Email/password authentication via Supabase
   - Protected admin routes require login
   - Session management with Supabase Auth

3. **Storage Security**
   - Public bucket for reading images
   - Admin-only upload/delete permissions
   - File encryption at rest

4. **Input Validation**
   - Required fields enforced
   - Category validation
   - File type validation for images

## Deployment to Vercel

1. Push repository to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

```bash
# Build command
npm run build

# Output directory
dist
```

## Customization

### Change Branding
- Update `Navbar.jsx` and `Footer.jsx` with your branding
- Update colors in `tailwind.config.js`
- Update page title in `index.html`

### Add More Categories
1. Update category validation in SQL:
   ```sql
   ALTER TABLE news DROP CONSTRAINT news_category_check;
   ALTER TABLE news ADD CHECK (category IN ('local', 'national', 'business', 'sports', 'tech', 'new-category'));
   ```
2. Update `newsService.js` categories array
3. Add navigation link in `Navbar.jsx`

### Customize AdSense
Replace placeholder comments `[Google AdSense...]` in components with actual AdSense code:
```jsx
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
     data-ad-slot="xxxxxxxxxx"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

## Troubleshooting

### Images not loading
- Check Supabase Storage bucket permissions
- Verify bucket name is `news-images`
- Ensure images are marked as public

### Admin login fails
- Verify Supabase credentials in `.env.local`
- Check admin user exists in Supabase Auth
- Ensure RLS policies are correctly applied

### Database connection issues
- Verify environment variables are correct
- Check Supabase project is active
- Ensure PostgreSQL is running

## License

MIT License - Feel free to use for commercial projects

## Support

For issues and questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review React Router docs: https://reactrouter.com
3. Visit Tailwind CSS docs: https://tailwindcss.com

---

**NEWS BANK** - ख़बरों में आगे (Stay Ahead with News)
