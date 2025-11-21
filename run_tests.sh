#!/usr/bin/env bash
set -euo pipefail

echo "Starting server in background on port 3000..."
node server.js &
PID=$!
echo "Server PID: $PID"

echo "Waiting for server to be ready..."
for i in {1..10}; do
  if curl -sSf http://localhost:3000/ >/dev/null; then
    echo "Server is ready"
    break
  fi
  sleep 1
done

echo "Running Playwright tests..."
npx playwright test --config=playwright.config.js || EXIT_CODE=$?

echo "Stopping server..."
kill $PID || true

if [ -n "${EXIT_CODE-}" ]; then
  echo "Tests failed with code $EXIT_CODE"
  exit $EXIT_CODE
fi

echo "Tests completed successfully"
