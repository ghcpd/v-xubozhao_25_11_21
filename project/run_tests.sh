#!/usr/bin/env bash
# Start server and run Playwright tests
set -e
# Start server in background
node server.js &
PID=$!

# Give server a moment
sleep 1

# Run tests
npx playwright test --reporter=list || TEST_EXIT=$?

# Kill server
kill $PID || true

if [ -n "$TEST_EXIT" ]; then
  exit $TEST_EXIT
fi

exit 0
