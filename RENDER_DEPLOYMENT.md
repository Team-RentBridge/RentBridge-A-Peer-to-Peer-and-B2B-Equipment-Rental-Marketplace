# RentBridge Render Deployment Guide

## Prerequisites
- Render account (free tier available at render.com)
- GitHub repository connected to Render
- Supabase or PostgreSQL database
- Razorpay API keys

## Deployment Steps

### 1. **Environment Variables Setup**

Add the following environment variables in your Render dashboard:

**Backend Service:**
- `NODE_ENV`: `production`
- `DB_URL`: Your PostgreSQL connection string from Supabase
- `JWT_SECRET`: Your JWT secret key (keep it secure)
- `RAZORPAY_KEY_ID`: Your Razorpay key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay secret key
- `FRONTEND_URL`: Your frontend Render URL (e.g., `https://rentbridge-frontend.onrender.com`)

**Frontend Service:**
- `REACT_APP_API_URL`: Your backend API URL (e.g., `https://rentbridge-backend.onrender.com/api`)

### 2. **Database Setup**

If using the provided `render.yaml`:
- Render will automatically create PostgreSQL database
- Connection string will be provided via `DB_URL` environment variable

If using existing Supabase:
- Get your connection string from Supabase dashboard
- Add it as `DB_URL` environment variable

### 3. **Deployment Methods**

**Option A: Using render.yaml (Recommended)**
1. Push `render.yaml` to your GitHub repository root
2. In Render Dashboard: Create New → Infrastructure from Code
3. Select your GitHub repository
4. Render will automatically detect and deploy both services

**Option B: Manual Service Setup**
1. Create Backend Web Service:
   - Runtime: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: (see step 1)

2. Create Frontend Web Service:
   - Runtime: Node
   - Build Command: `cd frontend && npm install && npm run build`
   - Start Command: `cd frontend && npx serve -s build -p 3000`
   - Environment Variables: (see step 1)

### 4. **Important Notes**

- **Free Tier**: Services spin down after 15 minutes of inactivity
- **Build Time**: First deployment may take 5-10 minutes
- **Database**: Using Render's free PostgreSQL has 90-day auto-deletion policy
- **Port**: Backend uses port 10000, frontend uses port 3000
- **CORS**: Backend accepts requests from configured `FRONTEND_URL`

### 5. **Post-Deployment Checks**

1. Test Backend:
   - Visit: `https://rentbridge-backend.onrender.com/`
   - Should see: "Backend Running 🚀"

2. Test Database Connection:
   - Visit: `https://rentbridge-backend.onrender.com/test-db`
   - Should see database timestamp

3. Test Frontend:
   - Visit: `https://rentbridge-frontend.onrender.com/`
   - Should load application

4. Test API Connection:
   - Open browser console
   - Check network requests go to correct backend URL

### 6. **Troubleshooting**

**Build Failures:**
- Check that `package.json` exists in both `backend/` and `frontend/` directories
- Verify all dependencies are listed correctly
- Check `npm install` completes without errors

**Database Connection Issues:**
- Verify `DB_URL` is correctly set
- Test connection: Visit `/test-db` endpoint
- Check database URL format: `postgresql://user:password@host:port/database`

**API Connection Issues:**
- Verify `REACT_APP_API_URL` is set on frontend service
- Check CORS is configured correctly in backend
- Ensure `FRONTEND_URL` matches your frontend Render domain

**Service Won't Start:**
- Check logs in Render Dashboard → Logs tab
- Verify `start` script exists in package.json
- Ensure PORT environment variable is respected

### 7. **Recommended Production Settings**

- Use Paid tier for production (prevents auto spin-down)
- Set up PostgreSQL Managed Database for reliability
- Configure backup strategies
- Add custom domain
- Enable auto-deploys from GitHub branch

## Support
For issues or questions, refer to Render documentation: https://render.com/docs
