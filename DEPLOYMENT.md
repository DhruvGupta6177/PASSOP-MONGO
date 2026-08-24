# PassOP Deployment Guide

## Quick Start Deployment

This guide will help you deploy PassOP to the cloud for public use.

### Prerequisites
- GitHub account (for connecting repos)
- MongoDB Atlas account (free tier available)
- Hosting account (Vercel for frontend, Railway/Render for backend)

---

## Step 1: Set Up MongoDB Atlas (Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free account)
3. Create a new project called "PassOP"
4. Create a free M0 cluster
5. Add a database user with username and password
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/passop`)
7. Copy this string - you'll need it for deployment

---

## Step 2: Deploy Backend (Express Server)

### Option A: Using Railway (Recommended - Easiest)

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your PASSOP-MONGO repository
4. Create a service for backend/
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
   - `PORT`: (Railway sets this automatically)
   - `FRONTEND_URL`: Your Vercel frontend URL (add after frontend is deployed)

6. Deploy automatically when you push to GitHub

### Option B: Using Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Build command: `npm install`
5. Start command: `npm start`
6. Add the same environment variables as above
7. Deploy

### Backend Deployed ✅
Your backend will have a URL like: `https://passop-backend.railway.app` (or similar)

---

## Step 3: Deploy Frontend (React App)

### Using Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your PASSOP-MONGO GitHub repository
4. Configure:
   - Framework: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL (e.g., https://passop-backend.railway.app)

6. Click Deploy

### Frontend Deployed ✅
Your app will have a URL like: `https://passop.vercel.app`

---

## Step 4: Update Backend CORS

1. Go back to your Railway/Render dashboard
2. Update the `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy

---

## Final Checklist

- [ ] MongoDB Atlas cluster created with connection string
- [ ] Backend deployed with environment variables set
- [ ] Frontend deployed with VITE_API_URL set
- [ ] Backend FRONTEND_URL updated to point to deployed frontend
- [ ] Test at your deployed URL to make sure it works

---

## Environment Variables Reference

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/passop
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## Troubleshooting

**"Cannot connect to backend"**
- Check CORS configuration in backend
- Verify FRONTEND_URL matches your actual frontend URL
- Check that backend is running

**"Cannot access database"**
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas (allow all IPs with 0.0.0.0/0)
- Ensure MONGO_URI is set in environment variables

**"Build failed"**
- Check that all dependencies are in package.json
- Run `npm install` locally to verify no errors
- Check build logs in deployment platform

---

## Support
For more help, check:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
