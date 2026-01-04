@echo off
REM ========================================================================
REM  Create ZIP file for Hostinger Easy Deploy
REM ========================================================================

echo ========================================================================
echo   Creating ZIP file for Hostinger Easy Deploy
echo ========================================================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo Please run this script from the hostinger-upload directory
    pause
    exit /b 1
)

REM Check if PowerShell is available
where powershell >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PowerShell not found!
    echo Please create ZIP manually:
    echo 1. Select all files in this folder
    echo 2. Right-click and choose "Send to" - "Compressed (zipped) folder"
    pause
    exit /b 1
)

echo [Step 1/2] Creating rentingexplained.zip...
echo.

REM Create ZIP file in parent directory
powershell -Command "Compress-Archive -Path * -DestinationPath ..\rentingexplained.zip -Force"

if errorlevel 1 (
    echo [ERROR] Failed to create ZIP file
    pause
    exit /b 1
)

echo [OK] ZIP file created successfully!
echo.

REM Get file size
for %%A in (..\rentingexplained.zip) do (
    set size=%%~zA
)

echo [Step 2/2] ZIP file details:
echo   Location: %CD%\..\rentingexplained.zip
echo   Size: %size% bytes
echo.

echo ========================================================================
echo   ZIP FILE READY FOR UPLOAD!
echo ========================================================================
echo.
echo Next steps:
echo.
echo 1. Find the ZIP file here:
echo    %CD%\..\rentingexplained.zip
echo.
echo 2. Log in to Hostinger hPanel:
echo    https://hpanel.hostinger.com
echo.
echo 3. Go to: Files - File Manager
echo.
echo 4. Navigate to: domains/yourdomain.com/
echo.
echo 5. Upload the ZIP file
echo.
echo 6. Right-click ZIP - Extract Here
echo.
echo 7. Configure Node.js app:
echo    - Advanced - Node.js - Create Application
echo    - Startup file: server.js
echo    - Node version: 18.x
echo.
echo 8. Start the application
echo.
echo For detailed instructions, see EASY-DEPLOY-GUIDE.txt
echo.

pause
