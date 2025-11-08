# Vercel Deployment Quick Start

## Quick Deploy (3 Steps)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
# From project root
./deploy.sh

# Or manually:
vercel          # Preview deployment
vercel --prod   # Production deployment
```

### 3. Set Environment Variables
Go to Vercel Dashboard → Project Settings → Environment Variables

Add these variables:
```
NODE_ENV=production
JWT_SECRET=<generate-with-command-below>
POSTGRES_URL=<your-database-url>
FRONTEND_URL=https://your-app.vercel.app
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Database Setup

### Option 1: Vercel Postgres (Easiest)
1. Go to Vercel Dashboard → Storage → Create Database
2. Select Postgres
3. Environment variables auto-populate
4. Run migrations (see below)

### Option 2: External Database (Supabase/Neon/Railway)
1. Create database at your provider
2. Copy connection string
3. Add as `POSTGRES_URL` in Vercel environment variables

### Run Migrations
```bash
# Get your database URL from Vercel/Supabase/etc
export DATABASE_URL="your_database_url_here"

# Run migrations
psql $DATABASE_URL -f backend/src/db/schema.sql
psql $DATABASE_URL -f backend/src/db/migrations/002_create_products.sql
```

## Test Your Deployment

After deployment, test these URLs:

1. **Frontend:** `https://your-app.vercel.app`
2. **API Health:** `https://your-app.vercel.app/health`
3. **Translations:** `https://your-app.vercel.app/api/translations/en`

## Files Created for Deployment

- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to exclude from deployment
- `deploy.sh` - Quick deployment script
- `DEPLOYMENT.md` - Detailed deployment guide (read this for troubleshooting)

## Common Issues

### API Not Working
- Check environment variables are set in Vercel
- View logs: Vercel Dashboard → Deployments → Function Logs

### Database Connection Failed
- Verify `POSTGRES_URL` is correct
- Check database accepts connections from Vercel
- Ensure migrations have been run

### CORS Errors
- Update `FRONTEND_URL` to match your Vercel domain
- Redeploy after changing environment variables

## Redeploy After Changes

```bash
git add .
git commit -m "your changes"
git push

# Vercel auto-deploys from Git
# Or manually:
vercel --prod
```

## View Logs

```bash
# View function logs
vercel logs

# View specific deployment
vercel logs <deployment-url>
```

## Need Help?

Read the detailed guide: `DEPLOYMENT.md`
Vercel Docs: https://vercel.com/docs
