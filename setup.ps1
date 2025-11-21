#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

npm install
npx playwright install

Write-Host "Setup complete. Run: npm run dev (default port 5173)"
