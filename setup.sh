#!/usr/bin/env bash
set -euo pipefail

echo "Installing npm dependencies..."
npm install

echo "Installing Playwright browsers..."
npx playwright install --with-deps chromium

echo "Setup complete."
