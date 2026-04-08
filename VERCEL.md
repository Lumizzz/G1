# Vercel Deployment Guide for Aetheria

This guide explains how to deploy the Aetheria premium digital product to Vercel with Supabase backend.

## Prerequisites

1. Vercel account (vercel.com)
2. GitHub/GitLab/Bitbucket account
3. Supabase account (supabase.com)
4. Node.js 18+ installed locally

## Step 1: Push Code to Git

```bash
git init
git add .
git commit -m "Initial commit: Aetheria premium digital product"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings → API
3. Get your service role key from Settings → API → Service Role Key

## Step 3: Configure Environment Variables

In Vercel dashboard when importing your project:

### Required Variables
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key (optional for AI features)
OPENAI_MODEL=gpt-4o
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

## Step 4: Database Setup

1. Go to your Supabase project → SQL Editor
2. Run the contents of `supabase/schema.sql` to create tables, RLS policies, and triggers
3. Run the contents of `supabase/storage_setup.sql` to create storage buckets

## Step 5: Storage Bucket Configuration

Make sure these buckets are set to **Public**:
- `media` - General file uploads
- `logos` - Brand assets  
- `avatars` - User profile images

## Step 6: Deploy

1. In Vercel, click "New Project"
2. Import your GitHub repository
3. Vercel will auto-detect Next.js project
4. Add the environment variables from Step 3
5. Click "Deploy"

## Step 7: Post-Deployment

After deployment:
1. Visit your Vercel URL to see the live site
2. Visit `/admin` to access the dashboard
3. First user to sign up via Supabase Auth gets super_admin role
4. Configure AI settings in Admin Dashboard → AI Settings
5. Add your content via the CMS interface

## Troubleshooting

### Common Issues

**"Failed to fetch" errors**
- Check that your Supabase URL and anon key are correct
- Verify that the site URL in Supabase Settings → API includes your Vercel domain

**Storage upload fails**
- Ensure storage buckets are created and set to public
- Check that RLS policies allow authenticated uploads

**AI features not working**
- Verify OpenAI API key is set in environment variables
- Check that AI prompts are configured in Admin Dashboard

**Admin access denied**
- First user to sign up after deployment gets super_admin role
- Check Supabase Auth → Users to confirm signups

## Performance Optimizations

Vercel automatically provides:
- Global CDN distribution
- Edge caching for static assets
- Automatic image optimization
- Serverless functions for API routes
- Incremental Static Regeneration (ISR) for blog/posts

## Maintenance

- Update dependencies regularly: `npm update`
- Monitor Supabase usage in dashboard
- Backup database periodically via Supabase
- Check Vercel logs for any runtime errors

## Support

For issues with this deployment, refer to:
- Vercel docs: vercel.com/docs
- Supabase docs: supabase.com/docs
- This repository's README.md