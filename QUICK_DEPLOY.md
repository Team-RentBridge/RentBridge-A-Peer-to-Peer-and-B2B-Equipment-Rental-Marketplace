# Quick Start - Render Deployment Guide

## What's Been Done ✅

Your RentBridge project is now ready for Render deployment! Here's what was configured:

1. **render.yaml** - Infrastructure-as-code file for automatic deployment
2. **Environment Variable Configuration** - Both services use env vars instead of hardcoded values
3. **CORS Configuration** - Backend dynamically accepts frontend URL
4. **API Client** - Frontend uses dynamic API URL
5. **Package.json Updates** - Node version requirements and serve package added
6. **Documentation** - Complete guides for deployment and troubleshooting

## 3-Minute Deploy

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Deploy on Render (Recommended Method)
1. Go to [render.com](https://render.com)
2. Sign in or create account
3. Click "New +" → "Infrastructure from Code"
4. Connect your GitHub repository
5. Select the repo containing this code
6. Click "Deploy"

Render will automatically:
- Build backend and frontend
- Create PostgreSQL database
- Configure all environment variables (except secrets)
- Deploy both services

### Step 3: Configure Secrets
1. In Render Dashboard, go to Backend Service → Environment
2. Add these variables:
   - `DB_URL`: Your Supabase PostgreSQL connection string (see below)
   - `JWT_SECRET`: Your secret key
   - `RAZORPAY_KEY_ID`: Your Razorpay key
   - `RAZORPAY_KEY_SECRET`: Your secret
   - `FRONTEND_URL`: Gets auto-populated from frontend deployment

3. For Frontend Service → Environment:
   - `REACT_APP_API_URL`: Gets auto-populated from backend deployment

### Getting Your Supabase Connection String:
1. Go to [supabase.com](https://supabase.com)
2. Open your project dashboard
3. Click "Settings" → "Database"
4. Copy the connection string (URI)
5. Paste it as `DB_URL` in Render Backend service environment variables

### Step 4: Test Your Deployment
- Backend: Visit `https://<backend-name>.onrender.com/`
- Database: Visit `https://<backend-name>.onrender.com/test-db`
- Frontend: Visit `https://<frontend-name>.onrender.com/`

## Manual Deploy (Alternative)

If you prefer manual setup without render.yaml:

1. Create Backend Web Service
   - Repo: Your GitHub repo
   - Root: `/backend`
   - Build: `npm install`
   - Start: `npm start`
   - Region: Oregon
   - Plan: Free

2. Create Frontend Web Service
   - Repo: Your GitHub repo
   - Root: `/frontend`
   - Build: `npm install && npm run build`
   - Start: `npx serve -s build -p 3000`
   - Region: Oregon
   - Plan: Free

3. Create PostgreSQL Database
   - Region: Oregon
   - Plan: Free

4. Set Environment Variables (same as Step 3 above)

## Environment Variables Reference

### Backend (.env)
```
NODE_ENV=production
PORT=10000
DB_URL=postgresql://...
JWT_SECRET=your_secret_here
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URL=https://your-frontend.onrender.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails | Check both `backend/` and `frontend/` have package.json |
| API calls fail | Verify `REACT_APP_API_URL` is set in frontend |
| CORS errors | Check `FRONTEND_URL` matches your frontend domain |
| Database won't connect | Verify `DB_URL` in environment variables |
| Services keep crashing | Check logs in Render Dashboard → Logs tab |

## After Deployment

- ✅ Update any hardcoded URLs in your code
- ✅ Test all API endpoints
- ✅ Check error logs in Render Dashboard
- ✅ Upgrade to paid plan if deploying to production
- ✅ Set up custom domain (optional)
- ✅ Configure database backups (for production)

## Detailed Resources

- **Full Guide**: See `RENDER_DEPLOYMENT.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Render Docs**: https://render.com/docs

---

**Need help?** Check the logs in your Render Dashboard or see the detailed deployment guides.
