# 🚀 InsureBot Pulse - Setup Guide

## Quick Start (Windows)

1. **Double-click `start.bat`** - This will automatically:
   - Check for Node.js
   - Install dependencies
   - Create .env file
   - Start the server

2. **Add your API keys** to the `.env` file:
   ```env
   GROQ_API_KEY=your-groq-api-key-here
   ```

3. **Open browser** to `http://localhost:3000`

## Quick Start (Mac/Linux)

1. **Run the setup script**:
   ```bash
   ./start.sh
   ```

2. **Add your API keys** to the `.env` file:
   ```env
   GROQ_API_KEY=your-groq-api-key-here
   ```

3. **Open browser** to `http://localhost:3000`

## Manual Setup

### Prerequisites
- Node.js 16+ (Download from https://nodejs.org/)
- npm (comes with Node.js)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp env.example .env
```

Edit `.env` and add your API keys:
```env
GROQ_API_KEY=your-groq-api-key-here
ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
PORT=3000
```

### Step 3: Start Server
```bash
npm start
```

### Step 4: Open Browser
Navigate to `http://localhost:3000`

## 🔑 Getting API Keys

### Groq API (Required)
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for free account
3. Go to API Keys section
4. Generate new API key
5. Copy to `.env` file

### ElevenLabs API (Optional)
1. Visit [ElevenLabs](https://elevenlabs.io/)
2. Create account
3. Go to Profile → API Key
4. Copy API key
5. Add to `.env` file

## 🎮 Using InsureBot Pulse

### Starting a Conversation
1. Click the glowing "Start Speaking" button
2. ElevenLabs widget will open
3. Begin voice conversation
4. Watch real-time analytics update

### Analytics Dashboard
- **Top-right corner**: Live metrics
- **Latency**: Response time (target <500ms)
- **Emotion**: Customer sentiment detection
- **Empathy**: Bot response quality
- **Interruptions**: Conversation flow tracking

### Call Summary
- Automatically generated after call ends
- Professional format with key points
- Sentiment analysis and risk assessment

### Feedback System
- Post-call rating (1-5 stars)
- Optional comment field
- Data logged for improvement

## 🐛 Troubleshooting

### "Node.js not found"
- Install Node.js from https://nodejs.org/
- Restart terminal/command prompt

### "Port 3000 already in use"
- Change PORT in `.env` file
- Or kill process using port 3000

### "API key error"
- Check your Groq API key in `.env`
- Ensure key is valid and has credits

### "Widget not loading"
- Check internet connection
- Ensure ElevenLabs agent ID is correct
- Try refreshing the page

### "Socket connection failed"
- Ensure server is running
- Check firewall settings
- Try different port

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

### Render
1. Connect GitHub repo
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

## 📊 Features Overview

### Real-time Analytics
- **Latency Tracking**: Monitor response times
- **Emotion Detection**: Customer sentiment analysis
- **Empathy Scoring**: Rate bot responses
- **Interruption Handling**: Track conversation flow
- **Call Analytics**: Performance metrics

### AI Capabilities
- **Voice Conversation**: Natural speech interface
- **Call Summaries**: Professional documentation
- **Emotion Intelligence**: Sentiment analysis
- **Empathy Assessment**: Response quality scoring

### UI/UX Features
- **Animated Bloom Sphere**: Particle system
- **Real-time Dashboard**: Live metrics
- **Responsive Design**: Mobile-friendly
- **Modal System**: Call summaries & feedback

## 🏆 Hackathon Features

### Technical Excellence
- **<500ms Latency**: Optimized for speed
- **Real-time Analytics**: Live performance tracking
- **Professional Summaries**: Structured call analysis
- **Emotion Intelligence**: Customer sentiment detection

### Innovation
- **Voice-First Design**: Natural conversation
- **Analytics Dashboard**: Real-time metrics
- **AI-Powered Summaries**: Professional documentation
- **Empathy Scoring**: Quality assurance

### User Experience
- **Futuristic UI**: Sci-fi inspired design
- **Responsive Design**: Works on all devices
- **Intuitive Interface**: Easy to use
- **Professional Output**: Business-ready

---

**Ready to win the hackathon! 🏆**

*Optimized for <500ms latency • Real-time analytics • Professional summaries* 