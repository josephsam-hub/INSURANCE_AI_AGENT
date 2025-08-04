# 🚀 InsureBot Pulse - AI Insurance Agent

**Hackathon-winning voice AI insurance agent with real-time analytics, powered by ElevenLabs and Groq.**

## 🎯 Features

### 🤖 Core AI Capabilities
- **Voice Conversation**: ElevenLabs Conversational Widget integration
- **Real-time Analytics**: Live dashboard with latency, emotion, empathy tracking
- **Call Summaries**: Auto-generated professional summaries using Groq + Llama-3
- **Emotion Detection**: Smart sentiment analysis for customer emotions
- **Empathy Scoring**: Rate bot responses for empathetic communication
- **Interruption Handling**: Detect and count user interruptions

### 📊 Analytics Dashboard
- **Latency Tracking**: Response time monitoring (<500ms target)
- **Emotion Radar**: 😊😢😡 Real-time sentiment detection
- **Empathy Score**: 🎚️ Rate bot's empathetic responses
- **Interruption Counter**: 🛑 Track conversation interruptions
- **Call Analytics**: 📈 Total calls and performance metrics

### 🎨 Futuristic UI
- **Glowing Bloom Sphere**: Animated particle system
- **Real-time Dashboard**: Floating analytics overlay
- **Responsive Design**: Mobile-friendly interface
- **Dynamic Theming**: Color changes during conversations
- **Modal System**: Call summaries and feedback collection

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express
- **Real-time**: Socket.IO for live analytics
- **Voice AI**: ElevenLabs Conversational Widget (agent_01k0k42wczf7ravzr0gmvsqbfn)
- **LLM**: Groq API with Llama-3-8b-8192
- **TTS**: ElevenLabs Text-to-Speech (fallback)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Groq API key (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd INSURANCE_AI_AGENT
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
```

Edit `.env` and add your API keys:
```env
GROQ_API_KEY=your-groq-api-key-here
ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
PORT=3000
```

4. **Start the server**
```bash
npm start
```

5. **Open in browser**
```
http://localhost:3000
```

## 🔑 API Keys Setup

### Groq API (Required)
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for free account
3. Generate API key
4. Add to `.env` file

### ElevenLabs API (Optional)
1. Visit [ElevenLabs](https://elevenlabs.io/)
2. Create account
3. Get API key from dashboard
4. Add to `.env` file

## 📁 Project Structure

```
INSURANCE_AI_AGENT/
├── index.html          # Main frontend
├── style.css           # Styling with analytics dashboard
├── script.js           # Frontend logic + Socket.IO
├── server.js           # Node.js backend
├── package.json        # Dependencies
├── env.example         # Environment variables template
└── README.md          # This file
```

## 🎮 Usage

### Starting a Conversation
1. Click "Start Speaking" button
2. ElevenLabs widget will open (agent_01k0k42wczf7ravzr0gmvsqbfn)
3. Begin voice conversation
4. Real-time analytics update live

### Analytics Dashboard
- **Top-right corner**: Live metrics
- **Toggle**: Click arrow to show/hide
- **Metrics**: Latency, emotion, empathy, interruptions

### Call Summary
- Automatically generated after call ends
- Professional format with key points
- Sentiment analysis and risk assessment

### Feedback System
- Post-call rating (1-5 stars)
- Optional comment field
- Data logged for improvement

## 🔧 API Endpoints

### Backend Routes
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

## 🎯 Hackathon Features

### Real-time Analytics
- **Latency Monitoring**: Track response times
- **Emotion Detection**: Keyword-based sentiment analysis
- **Empathy Scoring**: Rate bot responses
- **Interruption Tracking**: Count user interruptions
- **Live Dashboard**: Real-time metrics display

### Advanced AI Integration
- **Groq + Llama-3**: Fast, free LLM for summaries
- **ElevenLabs Widget**: Professional voice conversation (agent_01k0k42wczf7ravzr0gmvsqbfn)
- **Smart Summaries**: Structured call analysis
- **Emotion Intelligence**: Customer sentiment tracking

### Futuristic UI/UX
- **Animated Bloom Sphere**: Particle system animation
- **Dynamic Theming**: Color changes during calls
- **Responsive Design**: Mobile-first approach
- **Modal System**: Professional call summaries
- **Feedback Collection**: Post-call rating system

## 🚀 Deployment

### Local Development
```bash
npm run dev  # With nodemon
npm start    # Production mode
```

### Production Deployment
1. **Vercel**: Connect GitHub repo
2. **Render**: Deploy from Git
3. **Railway**: One-click deployment
4. **Heroku**: Traditional deployment

### Environment Variables
Set these in your deployment platform:
- `GROQ_API_KEY`
- `ELEVENLABS_API_KEY` (optional)
- `PORT` (auto-detected)

## 🏆 Hackathon Winning Features

### Technical Excellence
- **<500ms Latency**: Optimized for speed
- **Real-time Analytics**: Live performance tracking
- **Professional Summaries**: Structured call analysis
- **Emotion Intelligence**: Customer sentiment detection
- **Interruption Handling**: Conversation flow management

### Innovation
- **Voice-First Design**: Natural conversation interface
- **Analytics Dashboard**: Real-time performance metrics
- **AI-Powered Summaries**: Professional call documentation
- **Empathy Scoring**: Quality assurance for bot responses
- **Feedback System**: Continuous improvement loop

### User Experience
- **Futuristic UI**: Sci-fi inspired design
- **Responsive Design**: Works on all devices
- **Intuitive Interface**: Easy to use
- **Professional Output**: Business-ready summaries
- **Accessibility**: Inclusive design principles

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced emotion detection
- [ ] Custom voice training
- [ ] Integration with CRM systems
- [ ] Advanced analytics dashboard
- [ ] Mobile app version

---

**Built with ❤️ for ValuEnable Hackathon 2025**

*Optimized for <500ms latency • Real-time analytics • Professional summaries*
