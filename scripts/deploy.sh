#!/bin/bash

# AiECommerce Deployment Script
# This script helps set up the database and deploy to Vercel

set -e

echo "🚀 AiECommerce Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "Please create .env.local with your environment variables:"
    echo "cp env.example .env.local"
    echo "Then edit .env.local with your values"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Warning: DATABASE_URL not set in environment"
    echo "Please set your database URL before running migrations"
    echo ""
else
    echo "🗄️  Running database migrations..."
    npx prisma db push
    
    echo "🌱 Seeding database..."
    npx prisma db seed
fi

# Build the project
echo "🔨 Building the project..."
npm run build

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub/GitLab/Bitbucket"
echo "2. Connect your repository to Vercel"
echo "3. Set up environment variables in Vercel dashboard"
echo "4. Deploy!"
echo ""
echo "For detailed instructions, see README.md" 