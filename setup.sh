#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npm install
npx playwright install

echo "Setup complete. Run: npm run dev (default port 5173)"
