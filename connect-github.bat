@echo off
REM ========================================================================
REM  Quick GitHub Connection Script
REM ========================================================================

echo ========================================================================
echo   Connect to GitHub Repository
echo ========================================================================
echo.

echo This script will help you connect your local repository to GitHub.
echo.

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo [!] Remote 'origin' already exists!
    echo Current remote URL:
    git remote get-url origin
    echo.
    set /p remove="Remove existing remote and add new one? (yes/no): "
    if /i not "%remove%"=="yes" (
        echo Cancelled.
        pause
        exit /b 0
    )
    git remote remove origin
    echo Removed existing remote.
    echo.
)

REM Get GitHub username
set /p username="Enter your GitHub username: "
if "%username%"=="" (
    echo Error: Username cannot be empty
    pause
    exit /b 1
)

REM Get repository name (with default)
set /p reponame="Enter repository name [rentingexplained.com]: "
if "%reponame%"=="" set reponame=rentingexplained.com

echo.
echo Adding remote:
echo   https://github.com/%username%/%reponame%.git
echo.

REM Add remote
git remote add origin https://github.com/%username%/%reponame%.git

if errorlevel 1 (
    echo [ERROR] Failed to add remote
    pause
    exit /b 1
)

echo [OK] Remote added successfully!
echo.

REM Show current status
echo Current repository status:
git status
echo.

echo ========================================================================
echo   Next Steps:
echo ========================================================================
echo.
echo 1. Create repository on GitHub (if not already created):
echo    https://github.com/new
echo.
echo 2. Push your code:
echo    git push -u origin master
echo.
echo 3. Enter your GitHub Personal Access Token when prompted
echo    (Not your password - tokens only!)
echo.
echo Need a token? Generate one here:
echo https://github.com/settings/tokens
echo.

pause
