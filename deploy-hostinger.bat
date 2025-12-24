@echo off
REM Hostinger Deployment Script for Windows
REM This script prepares your Next.js app for Hostinger deployment

echo ========================================
echo   Hostinger Deployment Preparation
echo ========================================
echo.

REM Check if package.json exists
if not exist package.json (
    echo [ERROR] package.json not found. Are you in the project root?
    pause
    exit /b 1
)

echo [Step 1/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

echo [Step 2/4] Building Next.js application...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed. Please fix errors and try again.
    pause
    exit /b 1
)
echo [OK] Build successful
echo.

echo [Step 3/4] Setting up .htaccess...
if exist .htaccess-hostinger (
    copy /Y .htaccess-hostinger .htaccess
    echo [OK] .htaccess created
) else (
    echo [WARNING] .htaccess-hostinger not found, skipping...
)
echo.

echo [Step 4/4] Checking environment configuration...
if not exist .env.production (
    if exist .env.production.example (
        copy .env.production.example .env.production
        echo [WARNING] .env.production created from example
        echo [ACTION REQUIRED] Please edit .env.production with your actual values
    ) else (
        echo [WARNING] No .env.production file found
    )
) else (
    echo [OK] .env.production exists
)
echo.

echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Upload files to Hostinger via FTP/SFTP or Git
echo 2. SSH into your server
echo 3. Run: npm install --production
echo 4. Configure Node.js app in Hostinger hPanel
echo 5. Set startup file to: server.js
echo 6. Add environment variables in hPanel
echo 7. Start the application
echo.
echo Files to upload:
echo   [YES] All source files (app/, components/, lib/, etc.)
echo   [YES] Configuration files (package.json, next.config.js, etc.)
echo   [YES] server.js
echo   [YES] .htaccess
echo   [YES] public/ folder
echo.
echo Do NOT upload:
echo   [NO] node_modules/ (install on server)
echo   [NO] .next/ (build on server)
echo   [NO] .git/ (unless using Git deployment)
echo   [NO] .env files (set in hPanel)
echo.
echo For detailed instructions, see HOSTINGER-DEPLOY.md
echo.

pause
