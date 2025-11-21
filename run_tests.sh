#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

# Playwright config will start the dev server on port 3000 automatically
npm run test:e2e
