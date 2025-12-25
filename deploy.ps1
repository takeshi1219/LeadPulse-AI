# LeadPulse AI Deployment Helper Script
# Run this script after deploying to Vercel

Write-Host "🚀 LeadPulse AI Deployment Helper" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is available
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "Step 1: Link to your Vercel project" -ForegroundColor Green
Write-Host "-----------------------------------" -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\apps\web"

Write-Host "Running 'vercel link'..." -ForegroundColor Yellow
vercel link

Write-Host ""
Write-Host "Step 2: Pull environment variables" -ForegroundColor Green
Write-Host "-----------------------------------" -ForegroundColor Green
Write-Host "Running 'vercel env pull'..." -ForegroundColor Yellow
vercel env pull .env.local

Write-Host ""
Write-Host "Step 3: Run database migrations" -ForegroundColor Green
Write-Host "-------------------------------" -ForegroundColor Green
Write-Host "Running 'npx prisma migrate deploy'..." -ForegroundColor Yellow
npx prisma migrate deploy

Write-Host ""
Write-Host "Step 4: Seed the database (optional)" -ForegroundColor Green
Write-Host "------------------------------------" -ForegroundColor Green
$seedChoice = Read-Host "Do you want to seed demo data? (y/n)"
if ($seedChoice -eq "y") {
    Write-Host "Running 'npx prisma db seed'..." -ForegroundColor Yellow
    npx prisma db seed
}

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your LeadPulse AI is now live at your Vercel URL!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update FRONTEND_URL in Railway with your Vercel URL"
Write-Host "2. Verify both services are communicating"
Write-Host "3. Test the AI features with your Gemini API key"
Write-Host ""

Set-Location -Path $PSScriptRoot

