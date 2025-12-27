@echo off
REM Quick-start script for YouTube embed automation on Windows
REM Run this from the scripts directory

echo ========================================
echo YouTube Video Embed Automation
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.11+
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if yt-dlp is installed
yt-dlp --version >nul 2>&1
if errorlevel 1 (
    echo yt-dlp not found. Installing dependencies...
    pip install -r requirements-youtube-embeds.txt
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
)

REM Show menu
:menu
echo.
echo What would you like to do?
echo.
echo 1. DRY RUN - Preview without making changes (RECOMMENDED FIRST)
echo 2. APPLY - Actually insert videos into blog posts
echo 3. DRY RUN with custom score threshold
echo 4. Exit
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" goto dryrun
if "%choice%"=="2" goto apply
if "%choice%"=="3" goto custom
if "%choice%"=="4" goto end

echo Invalid choice. Please try again.
goto menu

:dryrun
echo.
echo Running DRY RUN (no files will be modified)...
echo.
python add_youtube_embeds.py --root "../content" --dry-run
if errorlevel 1 (
    echo.
    echo ERROR: Script failed. Check error messages above.
    pause
    goto menu
)
echo.
echo ========================================
echo DRY RUN COMPLETE
echo ========================================
echo Review the report: youtube_embed_report.json
echo.
pause
goto menu

:apply
echo.
echo ========================================
echo WARNING: This will modify your files!
echo ========================================
echo Backups will be created (.bak files)
echo.
set /p confirm="Are you sure? Type YES to continue: "
if not "%confirm%"=="YES" (
    echo Cancelled.
    goto menu
)
echo.
echo Running with --apply flag...
echo.
python add_youtube_embeds.py --root "../content" --apply
if errorlevel 1 (
    echo.
    echo ERROR: Script failed. Check error messages above.
    pause
    goto menu
)
echo.
echo ========================================
echo PROCESSING COMPLETE
echo ========================================
echo Files have been modified. Review changes and commit to git.
echo.
pause
goto menu

:custom
echo.
set /p threshold="Enter minimum score threshold (0.0-1.0, default 0.78): "
if "%threshold%"=="" set threshold=0.78
echo.
echo Running DRY RUN with score threshold: %threshold%
echo.
python add_youtube_embeds.py --root "../content" --dry-run --min-score %threshold%
if errorlevel 1 (
    echo.
    echo ERROR: Script failed. Check error messages above.
    pause
    goto menu
)
echo.
echo ========================================
echo DRY RUN COMPLETE
echo ========================================
echo Review the report: youtube_embed_report.json
echo.
pause
goto menu

:end
echo.
echo Goodbye!
exit /b 0
