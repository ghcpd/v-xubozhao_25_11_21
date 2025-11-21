#!/usr/bin/env bash
set -euo pipefail

echo "Installing node modules..."
npm install

echo "Installing Playwright browsers..."
npx playwright install --with-deps || npx playwright install

echo "Setup complete. Start the server with: npm start"
