# UI/UX Improvement Demo - Test Runner Script (PowerShell)
Write-Host "🧪 Running UI/UX Issue Detection Tests..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "❌ Dependencies not installed. Running setup first..." -ForegroundColor Red
    .\setup.ps1
    if ($LASTEXITCODE -ne 0) {
        exit 1
    }
}

# Check if Playwright browsers are installed
Write-Host "Checking Playwright browsers..." -ForegroundColor Yellow
npx playwright install --with-deps chromium

# Run Playwright tests
Write-Host ""
Write-Host "Starting test suite..." -ForegroundColor Cyan
Write-Host ""

npm test

$testExitCode = $LASTEXITCODE

Write-Host ""
if ($testExitCode -eq 0) {
    Write-Host "✅ All tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 View detailed test report:" -ForegroundColor Cyan
    Write-Host "   npx playwright show-report"
} else {
    Write-Host "⚠️  Some tests failed or detected issues" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📊 View detailed test report:" -ForegroundColor Cyan
    Write-Host "   npx playwright show-report"
}

Write-Host ""
Write-Host "To view the dashboards:" -ForegroundColor Cyan
Write-Host "  Buggy version: http://localhost:3000/demo_dashboard_buggy.html"
Write-Host "  Fixed version: http://localhost:3000/demo_dashboard_fixed.html"
Write-Host ""

exit $testExitCode
