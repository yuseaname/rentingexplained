@echo off
REM ========================================================================
REM  Create ZIP file for Hostinger Easy Deploy - From Project Root
REM ========================================================================

echo ========================================================================
echo   Creating rentingexplained.zip for Hostinger Easy Deploy
echo ========================================================================
echo.

cd hostinger-upload

if errorlevel 1 (
    echo [ERROR] hostinger-upload folder not found!
    pause
    exit /b 1
)

echo [Creating ZIP file...]
echo.

powershell -Command "Compress-Archive -Path * -DestinationPath ..\rentingexplained.zip -Force"

if errorlevel 1 (
    echo [ERROR] Failed to create ZIP file
    cd ..
    pause
    exit /b 1
)

cd ..

echo [OK] ZIP file created successfully!
echo.

REM Get file info
for %%A in (rentingexplained.zip) do (
    echo Location: %CD%\rentingexplained.zip
    echo Size: %%~zA bytes
)

echo.
echo ========================================================================
echo   ZIP FILE READY!
echo ========================================================================
echo.
echo Next: Upload to Hostinger hPanel File Manager
echo See: ZIP-READY.md for complete instructions
echo.

pause
