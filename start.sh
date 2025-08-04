#!/bin/bash

echo ""
echo "========================================"
echo "   InsureBot Pulse - AI Insurance Agent"
echo "========================================"
echo ""
echo "Starting server..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found!"
    echo "Please copy env.example to .env and add your API keys"
    echo ""
    cp env.example .env
    echo "Created .env file. Please edit it with your API keys."
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "Starting InsureBot Pulse..."
echo ""
echo "Open your browser to: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
npm start 