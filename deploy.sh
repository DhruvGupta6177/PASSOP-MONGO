#!/bin/bash
# Deployment script - Run this to prepare for production deployment

echo "🚀 PassOP Deployment Preparation"
echo "=================================="

# Check Node.js
echo "✓ Checking Node.js..."
node --version

# Install dependencies
echo "✓ Installing frontend dependencies..."
npm install

echo "✓ Installing backend dependencies..."
cd backend
npm install
cd ..

# Build frontend
echo "✓ Building frontend for production..."
npm run build

# Check if dist folder was created
if [ -d "dist" ]; then
    echo "✅ Frontend build successful! (dist/ folder created)"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo "✓ Dependencies installed"
echo "✓ Frontend built for production (dist/ folder)"
echo ""
echo "Next steps:"
echo "1. Create MongoDB Atlas cluster and get connection string"
echo "2. Deploy backend to Railway/Render with MONGO_URI"
echo "3. Deploy frontend to Vercel with VITE_API_URL pointing to backend"
echo "4. Update backend FRONTEND_URL to your Vercel URL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
