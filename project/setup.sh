#!/usr/bin/env bash
set -e
# Install dependencies
npm install
# Install playwright browsers
npx playwright install

echo "Setup complete. Start the server with: npm start"