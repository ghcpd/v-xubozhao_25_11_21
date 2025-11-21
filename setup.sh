#!/bin/bash

# UI/UX Improvement Demo - Setup Script
echo "🚀 Setting up UI/UX Improvement Demo..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Start the server: npm start"
    echo "  2. Open browser: http://localhost:3000"
    echo "  3. Run tests: npm test"
    echo ""
    echo "Or use the convenience scripts:"
    echo "  ./run_tests.sh  - Run automated tests"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
