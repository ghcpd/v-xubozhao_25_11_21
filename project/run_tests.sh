#!/usr/bin/env bash
set -e
npm start &
SERVER_PID=$!
sleep 1
npx playwright test --project=chromium
kill $SERVER_PID
