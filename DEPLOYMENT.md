# 🚀 InsureBot Pulse - Deployment Guide

## 🎯 Quick Start (Windows)
```bash
# Run the deployment script
deploy.bat
```

## 🎯 Quick Start (Linux/Mac)
```bash
# Make script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

## 📋 Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Internet connection for API calls

## 🔧 Manual Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root:
```env
# InsureBot Pulse Environment Variables
GROQ_API_KEY=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
PORT=3000
```

### 3. Start the Application
```bash
npm start
```

## 🌐 Access the Application
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

## 🚀 Deployment Options

### Option 1: Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Option 2: Production
```bash
npm start
```

### Option 3: Docker (Coming Soon)
```bash
docker build -t insurebot-pulse .
docker run -p 3000:3000 insurebot-pulse
```

### Option 4: Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI
heroku create insurebot-pulse
git push heroku main
```

#### Railway
```bash
# Connect your GitHub repo
# Railway will auto-deploy
```

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel
vercel
```

## 🔑 API Keys Configuration

### Groq API Key (Required)
- **Purpose**: Call summary generation using Llama-3-8b-8192
- **Status**: ✅ Configured in .env
- **Get Key**: https://console.groq.com/

### ElevenLabs API Key (Optional)
- **Purpose**: TTS fallback functionality
- **Status**: Using Conversational Widget (already working)
- **Get Key**: https://elevenlabs.io/

## 📊 Features Status

✅ **Real-Time Emotion Detection**  
✅ **Dynamic Tone Adaptation**  
✅ **Advanced Learning System**  
✅ **Intelligent Response Suggestions**  
✅ **Enhanced Analytics Dashboard**  
✅ **Socket.IO Real-Time Updates**  
✅ **Call Summary Generation**  
✅ **Voice AI Integration**  

## 🎯 Test Scenarios

### Angry Customer
```
"I'm so frustrated with this insurance process! This is a complete waste of time!"
```

### Worried Customer
```
"I'm really stressed about my coverage. What if something happens?"
```

### Happy Customer
```
"Thank you so much! This has been really helpful!"
```

### Confused Customer
```
"I'm not sure I understand this policy. Can you explain it again?"
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=3001
```

### API Key Issues
```bash
# Verify .env file exists
cat .env

# Check API key format
echo $GROQ_API_KEY
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Analytics
```bash
curl http://localhost:3000/api/analytics
```

## 🎉 Success Indicators

✅ Server starts without errors  
✅ Web interface loads at http://localhost:3000  
✅ ElevenLabs widget appears and responds  
✅ Emotion detection works in test scenarios  
✅ Analytics dashboard shows real-time data  
✅ Call summaries generate successfully  

## 🏆 Hackathon Ready!

Your **InsureBot Pulse** is now fully deployed with:
- 🧠 Emotion-aware AI adaptation
- 🎤 Voice interaction capabilities
- 📊 Real-time analytics
- 🎯 Professional insurance expertise
- 🚀 Production-ready deployment

**Ready to win your hackathon!** 🎯 