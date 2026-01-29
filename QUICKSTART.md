# NEWS BANK - Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- Supabase account (free at supabase.com)

### Step 1: Download & Install

```bash
cd "news bank"
npm install
```

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy Project URL and Anon Key from Settings > API

### Step 3: Configure Environment

Create `.env.local`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Step 4: Set Up Database

1. Open Supabase > SQL Editor
2. Copy-paste content from `database/schema.sql`
3. Click Run

### Step 5: Create Storage Bucket

1. Supabase > Storage > New Bucket
2. Name: `news-images`
3. Make Public
4. Create bucket

### Step 6: Create Admin User

1. Supabase > Authentication > Users
2. Add User: admin@newsbank.com
3. Set password (strong)
4. Create

### Step 7: Run Application

```bash
npm run dev
```

Visit http://localhost:3000

### First Test

1. Go to `/admin/login`
2. Login with admin@newsbank.com
3. Click "Add New Article"
4. Fill form and create
5. Go home to see your article!

## Common Issues

| Issue | Solution |
|-------|----------|
| Articles not loading | Check env variables are correct |
| Login fails | Verify admin user exists in Supabase Auth |
| Images won't upload | Check storage bucket `news-images` is public |
| Page is blank | Open browser console for errors, check network |

## File Structure Overview

```
📁 news bank
├── 📁 src
│   ├── 📁 admin          → Admin pages (login, dashboard)
│   ├── 📁 pages          → Public pages (home, articles)
│   ├── 📁 components     → Reusable components
│   ├── 📁 services       → Database operations
│   ├── 📁 routes         → Route protection
│   └── App.jsx          → Main routing
├── 📁 database
│   └── schema.sql        → Database setup
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.local           → Your secrets (don't commit!)
├── .env.example         → Template for secrets
└── README.md
```

## Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Create optimized build
npm run preview          # Preview production build

# Environment
cp .env.example .env.local   # Create env file
```

## Categories

Available news categories:
- Local
- National
- Business
- Sports
- Tech

Modify in `tailwind.config.js` if needed.

## API Routes

### Public Pages
- `/` → Home (all published news)
- `/category/local` → Local news
- `/category/national` → National news
- `/category/business` → Business news
- `/category/sports` → Sports news
- `/category/tech` → Tech news
- `/news/:id` → Full article page

### Admin Pages
- `/admin/login` → Admin login
- `/admin/dashboard` → Manage articles
- `/admin/add-news` → Create article
- `/admin/edit-news/:id` → Edit article

## Features Included

✅ Full CRUD for articles
✅ Image upload to cloud storage
✅ Admin authentication
✅ Publish/unpublish articles
✅ Hindi & English support
✅ Mobile responsive
✅ AdSense placeholders
✅ SEO-friendly
✅ Error handling
✅ Loading states
✅ Production-ready code

## Deployment

### To Vercel (Recommended)

```bash
npm run build
git push origin main  # Push to GitHub
```

Then in Vercel dashboard:
1. Import GitHub repo
2. Add environment variables
3. Deploy!

### Environment Variables for Production

Set in Vercel > Project Settings > Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Next Steps

1. ✅ Complete the 5-minute setup above
2. 📖 Read full [README.md](./README.md)
3. 🔐 Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed config
4. 🎨 Customize branding in `Navbar.jsx` and `Footer.jsx`
5. 🚀 Deploy to Vercel

## Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev

---

**You're all set! Happy news blogging! 📰**
