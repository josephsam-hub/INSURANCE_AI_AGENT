@echo off
echo 🚀 InsureBot Pulse - Deployment Script
echo ======================================

echo.
echo 📦 Installing dependencies...
npm install

echo.
echo 🔧 Setting up environment...
if not exist .env (
    echo Creating .env file...
    echo # InsureBot Pulse Environment Variables > .env
    echo GROQ_API_KEY=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 >> .env
    echo PORT=3000 >> .env
    echo ✅ .env file created with Groq API key
) else (
    echo ✅ .env file already exists
)

echo.
echo 🎯 Starting InsureBot Pulse...
echo 📊 Server will be available at: http://localhost:3000
echo 🎤 ElevenLabs Voice Agent: agent_2301k1xsr90ye6psdrdp5s1xy15w
echo.
echo Press Ctrl+C to stop the server
echo.

npm start 