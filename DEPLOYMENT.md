# Deployment Configuration for NEWS BANK

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit: NEWS BANK application"

# Push to GitHub
git push -u origin main
```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Configure:
   - **Framework:** Vite
   - **Root Directory:** ./ (current)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables

In Vercel > Project Settings > Environment Variables:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_anon_key
```

Select environments: Production, Preview, Development

### Step 4: Deploy

Click "Deploy" and wait for completion.

Your site will be live at: `https://your-project.vercel.app`

---

## Alternative: Netlify Deployment

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select GitHub and your repo

### Step 2: Configure Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Step 3: Add Environment Variables

Settings > Build & Deploy > Environment:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_anon_key
```

### Step 4: Deploy

Click "Deploy site"

---

## Self-Hosted Deployment (Docker)

### Step 1: Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create nginx.conf

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable caching for index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

### Step 3: Create .dockerignore

```
node_modules
npm-debug.log
dist
.git
.gitignore
README.md
.env.local
.env
```

### Step 4: Build & Run

```bash
# Build image
docker build -t news-bank:latest \
  --build-arg VITE_SUPABASE_URL=your_url \
  --build-arg VITE_SUPABASE_ANON_KEY=your_key \
  .

# Run container
docker run -p 80:80 news-bank:latest
```

---

## Environment-Specific Configurations

### Development Environment

`.env.development.local`
```env
VITE_SUPABASE_URL=https://dev.supabase.co
VITE_SUPABASE_ANON_KEY=dev_key_here
VITE_API_LOG_LEVEL=debug
```

### Staging Environment

`.env.staging.local`
```env
VITE_SUPABASE_URL=https://staging.supabase.co
VITE_SUPABASE_ANON_KEY=staging_key_here
VITE_API_LOG_LEVEL=info
```

### Production Environment

`.env.production.local`
```env
VITE_SUPABASE_URL=https://prod.supabase.co
VITE_SUPABASE_ANON_KEY=prod_key_here
VITE_API_LOG_LEVEL=error
```

---

## Performance Optimization for Deployment

### 1. Enable Gzip Compression

**Vercel:** Automatic ✅

**Netlify:** Automatic ✅

**Self-hosted:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 2. CDN Configuration

**Cloudflare (Recommended):**
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable:
   - Caching
   - Image Optimization
   - Auto Minify
   - Rocket Loader

### 3. Database Connection Pooling

Update Supabase connection string in production to use pooler:
```
postgresql://user:password@aws-0-region.pooler.supabase.com:6543/postgres
```

### 4. Image Optimization

```javascript
// In components, resize images on upload
const resizeImage = (file) => {
  // Use canvas or library to resize before upload
  return resizedBlob
}
```

---

## Security Hardening

### 1. CORS Configuration

**Supabase Settings > API > CORS:**

```
https://your-domain.com
https://www.your-domain.com
```

### 2. HTTPS

**Vercel/Netlify:** Automatic ✅

**Self-hosted:**
```bash
# Use Let's Encrypt with Certbot
certbot certonly --webroot -w /var/www/html -d your-domain.com
```

### 3. Security Headers

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### 4. Environment Variable Security

**NEVER commit .env files!**

```bash
# .gitignore
.env
.env.local
.env.*.local
```

---

## Monitoring & Logging

### 1. Vercel Analytics

Enable in Vercel Dashboard > Project Settings > Analytics

### 2. Sentry Error Tracking

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// In main.jsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
})
```

### 3. Cloudflare Analytics

If using Cloudflare, enable in Settings > Analytics

---

## Database Backups

### Automatic Backups

**Supabase:**
- Automatically backs up daily
- Retains for 30 days (Pro plan: 90 days)
- Restore from dashboard: Settings > Backups

### Manual Backups

```bash
# Backup command
pg_dump "postgres://user:password@host/database" > backup.sql

# Restore command
psql "postgres://user:password@host/database" < backup.sql
```

---

## Custom Domain Setup

### Vercel

1. Project Settings > Domains
2. Add domain
3. Follow DNS instructions
4. Auto-renews SSL certificate

### Netlify

1. Site settings > Domain management
2. Add domain
3. Update nameservers or add CNAME
4. Auto HTTPS enabled

---

## CI/CD Pipeline Example

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Rollback Procedure

### Vercel

1. Go to Deployments
2. Click deployment to rollback to
3. Click "Redeploy"

### Netlify

1. Go to Deploys
2. Click previous deployment
3. Click "Publish deploy"

### Manual Rollback

```bash
git revert <commit-hash>
git push origin main
# Re-deploy automatically triggers
```

---

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Admin login works
- [ ] Image uploads function
- [ ] Articles display on home page
- [ ] Category filtering works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance acceptable (< 3s load)
- [ ] SEO meta tags present
- [ ] Analytics tracking works
- [ ] Error tracking configured
- [ ] Database backups enabled
- [ ] SSL certificate valid
- [ ] Monitoring alerts set up
- [ ] Domain DNS configured

---

## Troubleshooting Deployment

### Blank Page
1. Check browser console for errors
2. Verify environment variables are set
3. Check network tab for 404s on assets
4. Rebuild and redeploy

### Images Not Loading
1. Verify Supabase Storage bucket is public
2. Check image URLs are correct
3. Verify CORS is configured
4. Check file permissions

### Slow Performance
1. Enable caching headers
2. Compress images
3. Minimize bundle size: `npm run build`
4. Use CDN for static assets

### Database Errors
1. Check Supabase project is running
2. Verify connection string
3. Check RLS policies
4. Review error logs in Supabase dashboard

---

## Support

For deployment issues:
- Vercel Support: https://vercel.com/support
- Netlify Support: https://netlify.com/support
- Supabase Support: https://supabase.com/support

Good luck! 🚀
