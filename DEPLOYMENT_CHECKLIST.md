# Pre-Deployment Checklist for Render

## ✅ Configuration Files
- [x] `render.yaml` - Created with backend and frontend service configurations
- [x] `backend/.env.example` - Created with all required environment variables
- [x] `frontend/.env.example` - Created with API URL configuration
- [x] Updated `backend/package.json` - Added Node version requirement and description
- [x] Updated `frontend/package.json` - Added Node version requirement, serve package, and homepage
- [x] Updated `.gitignore` files - Ensure .env files are ignored

## ✅ Backend Configuration
- [x] Updated CORS configuration - Accepts dynamic FRONTEND_URL environment variable
- [x] Server uses environment variable for PORT
- [x] Database uses DB_URL environment variable
- [x] All secrets configured through environment variables (JWT_SECRET, RAZORPAY keys)
- [x] Proper error handling middleware in place
- [x] Database initialization script runs on startup

## ✅ Frontend Configuration
- [x] Updated API client - Uses REACT_APP_API_URL environment variable
- [x] Build scripts configured in package.json
- [x] Serve package added for production serving

## 📋 Before Deploying to Render

1. **Commit all changes to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Set Up Environment Variables in Render Dashboard:**
   
   **Backend Service:**
   - `NODE_ENV`: `production`
   - `DB_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Your secret key
   - `RAZORPAY_KEY_ID`: Your Razorpay key
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret
   - `FRONTEND_URL`: Your frontend URL (will be assigned after frontend deploys)

   **Frontend Service:**
   - `REACT_APP_API_URL`: Your backend URL (will be assigned after backend deploys)

3. **Deploy Steps:**
   - Option A (Recommended): Push `render.yaml` to repo root, then use "Infrastructure from Code" in Render
   - Option B: Manually create two Web Services with configurations from `render.yaml`

4. **Post-Deployment Testing:**
   - Test backend at `https://<backend-url>/`
   - Test database at `https://<backend-url>/test-db`
   - Test frontend at `https://<frontend-url>/`
   - Check browser console for API connection errors

## 🔗 Important URLs After Deployment
- Backend API: `https://rentbridge-backend.onrender.com`
- Frontend: `https://rentbridge-frontend.onrender.com`
- Test DB: `https://rentbridge-backend.onrender.com/test-db`

## ⚠️ Important Notes
- Render free tier services auto-spin down after 15 min of inactivity
- Database auto-deleted after 90 days on free tier (use paid for production)
- Update CORS and API URLs after getting your Render domain names
- Keep secrets (JWT_SECRET, Razorpay keys) secure in environment variables
- Never commit `.env` files to Git

## 📚 Additional Resources
- See `RENDER_DEPLOYMENT.md` for detailed deployment guide
- See `.env.example` files for required variables
- See `render.yaml` for service configuration
