const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'your-groq-api-key';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'your-elevenlabs-api-key';

// Analytics data store
const analyticsData = {
  latency: [],
  emotion: [],
  empathy: [],
  interruptions: 0,
  totalCalls: 0,
  averageLatency: 0
};

// Emotion detection keywords
const emotionKeywords = {
  angry: ['angry', 'frustrated', 'mad', 'upset', 'annoyed', 'irritated', 'furious'],
  worried: ['worried', 'concerned', 'anxious', 'nervous', 'stressed', 'scared', 'fearful'],
  happy: ['happy', 'excited', 'pleased', 'satisfied', 'delighted', 'joyful', 'great']
};

// Empathy keywords for bot responses
const empathyKeywords = [
  'understand', 'care', 'concern', 'sorry', 'help', 'support', 'assist',
  'empathize', 'feel', 'realize', 'appreciate', 'value', 'important'
];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send initial analytics data
  socket.emit('analytics-update', analyticsData);
  
  // Handle real-time analytics updates
  socket.on('latency-update', (data) => {
    analyticsData.latency.push(data);
    analyticsData.averageLatency = analyticsData.latency.reduce((a, b) => a + b, 0) / analyticsData.latency.length;
    io.emit('analytics-update', analyticsData);
  });
  
  socket.on('emotion-detected', (data) => {
    analyticsData.emotion.push(data);
    io.emit('analytics-update', analyticsData);
  });
  
  socket.on('empathy-score', (data) => {
    analyticsData.empathy.push(data);
    io.emit('analytics-update', analyticsData);
  });
  
  socket.on('interruption-detected', () => {
    analyticsData.interruptions++;
    io.emit('analytics-update', analyticsData);
  });
  
  socket.on('call-started', () => {
    analyticsData.totalCalls++;
    io.emit('analytics-update', analyticsData);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// API Routes

// Generate call summary using Groq + Llama-3
app.post('/api/summary', async (req, res) => {
  try {
    const { transcript } = req.body;
    
    if (!transcript || transcript.length === 0) {
      return res.status(400).json({ error: 'Transcript is required' });
    }
    
    const summaryPrompt = `Analyze this insurance conversation transcript and generate a professional summary with the following structure:

Customer Name: [Extract or infer customer name]
Purpose: [Main reason for the call]
Key Points: [3-5 important points discussed]
Sentiment: [Overall customer sentiment - Positive/Negative/Neutral]
Action Items: [Specific actions needed]
Risk Level: [Low/Medium/High based on conversation]

Transcript:
${transcript}

Please format the response as JSON with these exact keys: customerName, purpose, keyPoints, sentiment, actionItems, riskLevel.`;

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are an expert insurance analyst. Generate concise, professional summaries.'
        },
        {
          role: 'user',
          content: summaryPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const summaryText = response.data.choices[0].message.content;
    
    // Try to parse as JSON, fallback to text
    let summary;
    try {
      summary = JSON.parse(summaryText);
    } catch (e) {
      // If not valid JSON, create structured summary
      summary = {
        customerName: 'Customer',
        purpose: 'Insurance inquiry',
        keyPoints: [summaryText],
        sentiment: 'Neutral',
        actionItems: ['Follow up required'],
        riskLevel: 'Low'
      };
    }
    
    res.json({ summary });
    
  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: error.message 
    });
  }
});

// ElevenLabs TTS API (fallback)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice_id = '21m00Tcm4TlvDq8ikWAM' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    }, {
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      responseType: 'arraybuffer'
    });
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': response.data.length
    });
    res.send(response.data);
    
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message 
    });
  }
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  res.json(analyticsData);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    connections: io.engine.clientsCount
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 InsureBot Pulse server running on port ${PORT}`);
  console.log(`📊 Real-time analytics available via Socket.IO`);
  console.log(`🎯 Call summary API: POST /api/summary`);
  console.log(`🔊 TTS API: POST /api/tts`);
  console.log(`📈 Analytics: GET /api/analytics`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
}); 