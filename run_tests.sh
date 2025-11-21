#!/bin/bash

# UI/UX Improvement Demo - Test Runner Script
echo "🧪 Running UI/UX Issue Detection Tests..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not installed. Running setup first..."
    ./setup.sh
    if [ $? -ne 0 ]; then
        exit 1
    fi
fi

# Run Playwright tests
echo "Starting test suite..."
echo ""

npm test

TEST_EXIT_CODE=$?

echo ""
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed!"
    echo ""
    echo "📊 View detailed test report:"
    echo "   Open: playwright-report/index.html"
else
    echo "⚠️  Some tests failed or detected issues"
    echo ""
    echo "📊 View detailed test report:"
    echo "   Open: playwright-report/index.html"
fi

echo ""
echo "To view the dashboards:"
echo "  Buggy version: http://localhost:3000/demo_dashboard_buggy.html"
echo "  Fixed version: http://localhost:3000/demo_dashboard_fixed.html"
echo ""

exit $TEST_EXIT_CODE
