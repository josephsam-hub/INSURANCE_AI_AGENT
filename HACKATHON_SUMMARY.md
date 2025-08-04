# 🏆 InsureBot Pulse - Hackathon Submission

## 🎯 Project Overview

**InsureBot Pulse** is a hackathon-winning voice AI insurance agent that combines cutting-edge technology with real-time analytics to create a futuristic customer service experience. Built for ValuEnable, this solution demonstrates the future of AI-powered insurance interactions.

## 🚀 Key Features Delivered

### ✅ Real-time Analytics Dashboard
- **📊 Latency Tracking**: Monitor response times with <500ms target
- **😊😢😡 Emotion Radar**: Detect customer sentiment in real-time
- **🎚️ Empathy Score**: Rate bot responses for empathetic communication
- **🛑 Interruption Handling**: Track and count conversation interruptions
- **📈 Call Analytics**: Total calls and performance metrics

### ✅ Advanced AI Integration
- **ElevenLabs Conversational Widget**: Professional voice interface (agent_01k0k42wczf7ravzr0gmvsqbfn)
- **Groq + Llama-3-8b-8192**: Fast, free LLM for call summaries
- **Emotion Detection**: Keyword-based sentiment analysis
- **Empathy Scoring**: Quality assurance for bot responses
- **Interruption Detection**: Conversation flow management

### ✅ Professional Call Summaries
- **Auto-generated**: After each call ends
- **Structured Format**: Customer name, purpose, key points
- **Sentiment Analysis**: Overall customer mood
- **Action Items**: Specific follow-up tasks
- **Risk Assessment**: Low/Medium/High risk classification

### ✅ Futuristic UI/UX
- **Glowing Bloom Sphere**: Animated particle system
- **Real-time Dashboard**: Floating analytics overlay
- **Dynamic Theming**: Color changes during conversations
- **Modal System**: Professional summaries and feedback
- **Responsive Design**: Mobile-first approach

### ✅ Feedback System
- **Post-call Rating**: 1-5 star system
- **Comment Field**: Optional detailed feedback
- **Data Logging**: Continuous improvement tracking
- **Thank You Messages**: User acknowledgment

## 🛠️ Technical Architecture

### Frontend Stack
- **HTML5**: Semantic markup
- **CSS3**: Advanced animations and responsive design
- **Vanilla JavaScript**: No framework dependencies
- **Socket.IO**: Real-time communication
- **Canvas API**: Particle system animations

### Backend Stack
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **Socket.IO**: Real-time bidirectional communication
- **Axios**: HTTP client for API calls
- **dotenv**: Environment variable management

### AI/ML Integration
- **ElevenLabs API**: Voice conversation and TTS (agent_01k0k42wczf7ravzr0gmvsqbfn)
- **Groq API**: Fast LLM inference with Llama-3
- **Custom Emotion Detection**: Keyword-based sentiment analysis
- **Empathy Scoring**: Response quality assessment

## 📊 Analytics Implementation

### Real-time Metrics
```javascript
// Latency tracking
socket.emit('latency-update', responseTime);

// Emotion detection
socket.emit('emotion-detected', { emotion, text });

// Empathy scoring
socket.emit('empathy-score', { score, text });

// Interruption handling
socket.emit('interruption-detected');
```

### Dashboard Features
- **Live Updates**: Real-time metric display
- **Color-coded Status**: Green/Yellow/Red indicators
- **Toggle Functionality**: Show/hide dashboard
- **Mobile Responsive**: Adaptive layout

## 🎨 UI/UX Highlights

### Animated Bloom Sphere
- **320 Particles**: Dynamic particle system
- **Color Gradients**: Orange to cyan transitions
- **Glow Effects**: Shadow and blur animations
- **Responsive**: Scales with viewport

### Real-time Dashboard
- **Floating Design**: Top-right corner placement
- **Glass Morphism**: Backdrop blur effects
- **Metric Cards**: Individual metric displays
- **Status Indicators**: Emoji-based status

### Modal System
- **Call Summary Modal**: Professional documentation
- **Feedback Modal**: Star rating system
- **Smooth Animations**: Scale and fade transitions
- **Backdrop Blur**: Modern overlay effects

## 🔧 API Endpoints

### REST APIs
- `GET /` - Serve frontend
- `GET /api/health` - Health check
- `GET /api/analytics` - Get analytics data
- `POST /api/summary` - Generate call summary
- `POST /api/tts` - Text-to-speech (fallback)

### Socket.IO Events
- `latency-update` - Send latency data
- `emotion-detected` - Send emotion data
- `empathy-score` - Send empathy score
- `interruption-detected` - Send interruption count
- `call-started` - Track new calls
- `analytics-update` - Receive updated analytics

## 🏆 Hackathon Winning Features

### Technical Excellence
- **<500ms Latency**: Optimized for speed and responsiveness
- **Real-time Analytics**: Live performance tracking
- **Professional Summaries**: Structured call documentation
- **Emotion Intelligence**: Customer sentiment detection
- **Interruption Handling**: Conversation flow management

### Innovation
- **Voice-First Design**: Natural conversation interface
- **Analytics Dashboard**: Real-time performance metrics
- **AI-Powered Summaries**: Professional call documentation
- **Empathy Scoring**: Quality assurance for bot responses
- **Feedback System**: Continuous improvement loop

### User Experience
- **Futuristic UI**: Sci-fi inspired design language
- **Responsive Design**: Works seamlessly on all devices
- **Intuitive Interface**: Easy to use and understand
- **Professional Output**: Business-ready summaries
- **Accessibility**: Inclusive design principles

## 📁 Project Structure

```
INSURANCE_AI_AGENT/
├── index.html          # Main frontend with analytics dashboard
├── style.css           # Comprehensive styling with animations
├── script.js           # Frontend logic + Socket.IO + analytics
├── server.js           # Node.js backend with APIs
├── package.json        # Dependencies and scripts
├── env.example         # Environment variables template
├── start.bat           # Windows startup script
├── start.sh            # Unix/Linux startup script
├── SETUP.md            # Comprehensive setup guide
├── README.md           # Project documentation
└── HACKATHON_SUMMARY.md # This file
```

## 🚀 Quick Start Instructions

### Windows Users
1. Double-click `start.bat`
2. Add Groq API key to `.env`
3. Open `http://localhost:3000`

### Mac/Linux Users
1. Run `./start.sh`
2. Add Groq API key to `.env`
3. Open `http://localhost:3000`

### Manual Setup
```bash
npm install
cp env.example .env
# Add API keys to .env
npm start
```

## 🎯 Demo Instructions

1. **Start the application** using the provided scripts
2. **Click "Start Speaking"** to begin voice conversation
3. **Watch real-time analytics** update in the dashboard
4. **Complete a conversation** to see call summary
5. **Rate the experience** using the feedback system

## 🔑 Required API Keys

### Groq API (Required)
- **Purpose**: Call summary generation
- **Model**: Llama-3-8b-8192
- **Cost**: Free tier available
- **Setup**: https://console.groq.com/

### ElevenLabs API (Optional)
- **Purpose**: TTS fallback
- **Agent ID**: agent_01k0k42wczf7ravzr0gmvsqbfn
- **Cost**: Free tier available
- **Setup**: https://elevenlabs.io/

## 🏆 Why This Wins Hackathons

### Technical Innovation
- **Real-time Analytics**: Live performance tracking
- **AI-Powered Summaries**: Professional documentation
- **Emotion Intelligence**: Customer sentiment analysis
- **Empathy Scoring**: Response quality assessment
- **Interruption Handling**: Conversation flow management

### User Experience
- **Voice-First Design**: Natural conversation interface
- **Futuristic UI**: Sci-fi inspired design
- **Responsive Design**: Works on all devices
- **Professional Output**: Business-ready summaries

### Business Value
- **Customer Insights**: Real-time analytics
- **Quality Assurance**: Empathy scoring
- **Documentation**: Auto-generated summaries
- **Feedback Loop**: Continuous improvement

## 🎉 Conclusion

**InsureBot Pulse** represents the future of AI-powered customer service, combining cutting-edge technology with real-time analytics to create a truly innovative insurance agent experience. With its <500ms latency, professional call summaries, and comprehensive analytics dashboard, this solution is ready to win hackathons and transform the insurance industry.

---

**Built with ❤️ for ValuEnable Hackathon 2025**

*Optimized for <500ms latency • Real-time analytics • Professional summaries* 