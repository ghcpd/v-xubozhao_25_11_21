# UI/UX Improvement Demo - Setup Script (PowerShell)
Write-Host "🚀 Setting up UI/UX Improvement Demo..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "   Visit: https://nodejs.org/"
    exit 1
}

Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green

# Check if npm is installed
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host "✓ npm found: v$npmVersion" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Start the server: npm start"
    Write-Host "  2. Open browser: http://localhost:3000"
    Write-Host "  3. Run tests: npm test"
    Write-Host ""
    Write-Host "Or use PowerShell scripts:" -ForegroundColor Cyan
    Write-Host "  .\setup.ps1       - This script"
    Write-Host "  .\run_tests.ps1   - Run automated tests"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Installation failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}
