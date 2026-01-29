@echo off
REM NEWS BANK Installation & Setup Script for Windows
REM Run this batch file to quickly set up the project

echo.
echo ==========================================
echo   NEWS BANK - Installation Script
echo ==========================================
echo.

REM Check Node.js
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js %NODE_VERSION% found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed
echo.

REM Create .env.local if not exists
echo Checking environment configuration...
if not exist .env.local (
    echo Creating .env.local from .env.example...
    copy .env.example .env.local
    echo.
    echo WARNING: Please update .env.local with your Supabase credentials:
    echo   - VITE_SUPABASE_URL
    echo   - VITE_SUPABASE_ANON_KEY
    echo.
) else (
    echo .env.local already exists
)

echo.
echo ==========================================
echo   Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Update .env.local with your Supabase credentials
echo 2. Run 'npm run dev' to start development server
echo 3. Visit http://localhost:3000
echo.
echo Documentation:
echo - Quick Start: Read QUICKSTART.md
echo - Supabase Setup: Read SUPABASE_SETUP.md
echo - Deployment: Read DEPLOYMENT.md
echo - Development: Read DEVELOPMENT.md
echo.
echo Good luck! 0x1F680
echo.
pause
