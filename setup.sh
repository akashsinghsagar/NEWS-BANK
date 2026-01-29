#!/bin/bash

# NEWS BANK Installation & Setup Script
# Run this script to quickly set up the project

echo "=========================================="
echo "  NEWS BANK - Installation Script"
echo "=========================================="
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node -v) found"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Create .env.local if not exists
echo "Checking environment configuration..."
if [ ! -f .env.local ]; then
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials:"
    echo "   - VITE_SUPABASE_URL"
    echo "   - VITE_SUPABASE_ANON_KEY"
    echo ""
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "Documentation:"
echo "- Quick Start: Read QUICKSTART.md"
echo "- Supabase Setup: Read SUPABASE_SETUP.md"
echo "- Deployment: Read DEPLOYMENT.md"
echo "- Development: Read DEVELOPMENT.md"
echo ""
echo "Good luck! 🚀"
