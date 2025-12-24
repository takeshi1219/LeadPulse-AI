# LeadPulse AI Deployment Guide

This guide explains how to deploy LeadPulse AI to production using **Vercel** (frontend) and **Railway** (backend).

## Architecture Overview

```
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│   Vercel (Frontend) │────▶│  Railway (Backend)  │
│   Next.js App       │     │  FastAPI + OpenAI   │
│                     │     │                     │
└─────────────────────┘     └─────────────────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐
│   Vercel Postgres   │     │      OpenAI API     │
│   (or Neon/Supabase)│     │                     │
└─────────────────────┘     └─────────────────────┘
```

---

## Step 1: Deploy the AI Engine (FastAPI) to Railway

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app) and sign up
2. Connect your GitHub account

### 1.2 Deploy from GitHub
1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select the `takeshi1219/LeadPulse-AI` repository
3. Railway will auto-detect the Dockerfile in `services/ai-engine/`
4. Set the **Root Directory** to `services/ai-engine`

### 1.3 Configure Environment Variables
In Railway dashboard, go to **Variables** and add:

```
OPENAI_API_KEY=sk-your-actual-openai-api-key
DEBUG=false
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 1.4 Get Your Railway URL
After deployment, Railway provides a URL like:
```
https://leadpulse-ai-production.up.railway.app
```

Save this URL - you'll need it for the frontend.

---

## Step 2: Deploy the Frontend (Next.js) to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com) and sign up
2. Connect your GitHub account

### 2.2 Import Project
1. Click **"Add New Project"** → **"Import Git Repository"**
2. Select the `takeshi1219/LeadPulse-AI` repository
3. Set the **Root Directory** to `apps/web`
4. Framework Preset: **Next.js**

### 2.3 Configure Environment Variables
Add these environment variables in Vercel:

```
# Database (use Vercel Postgres, Neon, or Supabase)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# NextAuth.js
NEXTAUTH_SECRET=generate-a-secure-random-string-here
NEXTAUTH_URL=https://your-app.vercel.app

# OpenAI (for direct API calls)
OPENAI_API_KEY=sk-your-actual-openai-api-key

# AI Engine Backend
AI_ENGINE_URL=https://your-railway-app.up.railway.app
```

### 2.4 Database Setup

#### Option A: Vercel Postgres (Recommended)
1. In Vercel dashboard, go to **Storage** → **Create Database** → **Postgres**
2. Vercel automatically adds `DATABASE_URL` to your environment

#### Option B: Neon (Free tier available)
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

#### Option C: Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database → Connection string
3. Use the connection string for `DATABASE_URL`

### 2.5 Deploy
Click **Deploy** and wait for the build to complete.

---

## Step 3: Initialize the Database

After deployment, you need to run Prisma migrations.

### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

### Option 2: Via Railway Console
If using Railway for the database, use the Railway CLI:
```bash
railway run npx prisma migrate deploy
```

---

## Step 4: Update CORS Settings

After both services are deployed, update the CORS settings:

### In Railway (Backend)
Update the `FRONTEND_URL` environment variable:
```
FRONTEND_URL=https://leadpulse-ai.vercel.app
```

### In Vercel (Frontend)
Update the `AI_ENGINE_URL` environment variable:
```
AI_ENGINE_URL=https://leadpulse-ai-production.up.railway.app
```

---

## Environment Variables Reference

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXTAUTH_SECRET` | Random secret for sessions | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app's URL | `https://app.vercel.app` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `AI_ENGINE_URL` | Railway backend URL | `https://api.railway.app` |

### Backend (Railway)

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `DEBUG` | Enable debug mode | `false` |
| `FRONTEND_URL` | Vercel frontend URL | `https://app.vercel.app` |
| `REDIS_URL` | Optional Redis URL | `redis://...` |

---

## Troubleshooting

### "Database connection failed"
- Ensure `DATABASE_URL` is correctly set
- Check if SSL mode is required (`?sslmode=require`)

### "AI Engine not responding"
- Verify `AI_ENGINE_URL` points to Railway
- Check Railway logs for errors
- Ensure `OPENAI_API_KEY` is valid

### "CORS errors"
- Update `FRONTEND_URL` in Railway
- Redeploy the backend after changing

### "Authentication issues"
- Ensure `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain

---

## Cost Estimates

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel | Hobby (free) | Pro $20/mo |
| Railway | $5 credit/mo | ~$5-20/mo |
| Neon DB | 0.5GB free | $19/mo |
| OpenAI | Pay per use | ~$0.01-0.03/1K tokens |

**Estimated monthly cost: $5-30** (depending on usage)

---

## Quick Deploy Commands

```bash
# Clone and setup
git clone https://github.com/takeshi1219/LeadPulse-AI.git
cd LeadPulse-AI

# Deploy backend to Railway
cd services/ai-engine
railway login
railway init
railway up

# Deploy frontend to Vercel
cd ../apps/web
vercel login
vercel
```

---

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [Next.js docs](https://nextjs.org/docs)
- Check the [Railway docs](https://docs.railway.app)
- Check the [Vercel docs](https://vercel.com/docs)

