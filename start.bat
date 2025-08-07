@echo off
echo.
echo ========================================
echo    InsureBot Pulse - AI Insurance Agent
echo ========================================
echo.
echo Starting server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please copy env.example to .env and add your API keys
    echo.
    copy env.example .env
    echo Created .env file. Please edit it with your API keys.
    echo.
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start the server
echo Starting InsureBot Pulse...
echo.
echo Open your browser to: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
npm start 