#!/usr/bin/env bash
# Setup script to install dependencies and playwright browsers
set -e
npm install
npx playwright install

echo "Setup complete. Start the server with: npm start" 
