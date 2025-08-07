// ============ Socket.IO Connection ============
let socket;
let isConnected = false;

// Try to connect to server, but don't fail if server is not running
function initializeSocket() {
  try {
    socket = io('http://localhost:3000', {
      timeout: 5000,
      reconnection: true,
      reconnectionAttempts: 3
    });

    socket.on('connect', () => {
      console.log('✅ Connected to server');
      isConnected = true;
      updateConnectionStatus();
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      isConnected = false;
      updateConnectionStatus();
    });

    socket.on('connect_error', (error) => {
      console.log('⚠️ Server connection failed, running in offline mode');
      isConnected = false;
      updateConnectionStatus();
    });

    socket.on('analytics-update', (data) => {
      updateAnalyticsDashboard(data);
    });
  } catch (error) {
    console.log('⚠️ Socket.IO not available, running in offline mode');
    isConnected = false;
    updateConnectionStatus();
  }
}

function updateConnectionStatus() {
  const statusIndicator = document.querySelector('.sidebar-header h3');
  if (statusIndicator) {
    statusIndicator.innerHTML = `<i class="fas fa-brain"></i> Live Call Analytics ${isConnected ? '🟢' : '🔴'}`;
  }
}

// ============ Chart.js Charts ============
let emotionChart, interruptionChart, empathyChart;

function initializeCharts() {
  console.log('📊 Initializing charts...');
  
  // Emotion Timeline Chart
  const emotionCtx = document.getElementById('emotionChart');
  if (emotionCtx) {
    emotionChart = new Chart(emotionCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Emotion Level',
          data: [],
          borderColor: '#1af2ff',
          backgroundColor: 'rgba(26, 242, 255, 0.2)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1af2ff',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 3,
            ticks: {
              color: '#888',
              callback: function(value) {
                const emotions = ['Neutral', 'Happy', 'Angry', 'Worried'];
                return emotions[value] || value;
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#888'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
    console.log('✅ Emotion chart initialized');
  }

  // Interruption Heatmap Chart
  const interruptionCtx = document.getElementById('interruptionChart');
  if (interruptionCtx) {
    interruptionChart = new Chart(interruptionCtx, {
      type: 'bar',
      data: {
        labels: ['0-30s', '30-60s', '60-90s', '90-120s', '120s+'],
        datasets: [{
          label: 'Interruptions',
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(0, 255, 136, 0.8)',
            'rgba(255, 170, 0, 0.8)',
            'rgba(255, 68, 68, 0.8)',
            'rgba(255, 0, 0, 0.8)',
            'rgba(128, 0, 0, 0.8)'
          ],
          borderColor: '#1af2ff',
          borderWidth: 2,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#888',
              stepSize: 1
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#888'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
    console.log('✅ Interruption chart initialized');
  }

  // Empathy Gauge Chart
  const empathyCtx = document.getElementById('empathyChart');
  if (empathyCtx) {
    empathyChart = new Chart(empathyCtx, {
      type: 'doughnut',
      data: {
        labels: ['Empathy Score', 'Remaining'],
        datasets: [{
          data: [0, 100],
          backgroundColor: [
            '#1af2ff',
            'rgba(34, 34, 43, 0.3)'
          ],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.dataIndex === 0) {
                  return `Empathy: ${context.parsed}%`;
                }
                return '';
              }
            }
          }
        }
      }
    });
    console.log('✅ Empathy chart initialized');
  }
}

// ============ Analytics Dashboard ============
function updateAnalyticsDashboard(data) {
  console.log('📊 Updating analytics dashboard:', data);
  
  // Update latency
  const latencyValue = document.getElementById('latencyValue');
  const latencyStatus = document.getElementById('latencyStatus');
  if (latencyValue && data.averageLatency) {
    const latency = Math.round(data.averageLatency);
    latencyValue.textContent = `${latency}ms`;
    latencyStatus.textContent = latency < 500 ? '🟢' : latency < 1000 ? '🟡' : '🔴';
  }

  // Update emotion
  const emotionValue = document.getElementById('emotionValue');
  const emotionStatus = document.getElementById('emotionStatus');
  if (emotionValue && data.emotion && data.emotion.length > 0) {
    const latestEmotion = data.emotion[data.emotion.length - 1];
    emotionValue.textContent = latestEmotion.emotion || 'Neutral';
    emotionStatus.textContent = getEmotionEmoji(latestEmotion.emotion);
  }

  // Update empathy
  const empathyValue = document.getElementById('empathyValue');
  const empathyStatus = document.getElementById('empathyStatus');
  if (empathyValue && data.empathy && data.empathy.length > 0) {
    const latestEmpathy = data.empathy[data.empathy.length - 1];
    empathyValue.textContent = `${Math.round(latestEmpathy.score)}%`;
    empathyStatus.textContent = latestEmpathy.score > 70 ? '🟢' : latestEmpathy.score > 40 ? '🟡' : '🔴';
    
    // Update empathy gauge
    if (empathyChart) {
      empathyChart.data.datasets[0].data = [latestEmpathy.score, 100 - latestEmpathy.score];
      empathyChart.update('none');
    }
  }

  // Update interruptions
  const interruptionsValue = document.getElementById('interruptionsValue');
  const interruptionsStatus = document.getElementById('interruptionsStatus');
  if (interruptionsValue) {
    interruptionsValue.textContent = data.interruptions || 0;
    interruptionsStatus.textContent = data.interruptions > 5 ? '🔴' : data.interruptions > 2 ? '🟡' : '🟢';
  }
}

function getEmotionEmoji(emotion) {
  const emojiMap = {
    'happy': '😊',
    'angry': '😡',
    'worried': '😢',
    'neutral': '😐'
  };
  return emojiMap[emotion?.toLowerCase()] || '😐';
}

// ============ Glowing Bloom Sphere ============
const canvas = document.getElementById('bloomCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const size = Math.min(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight);
    canvas.width = size; 
    canvas.height = size;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const dots = [];
const DOTS_N = 320;

function createDots() {
    dots.length = 0;
    const R = canvas.width / 2 - 16;
    for (let i = 0; i < DOTS_N; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let radius = Math.random() * R * 0.9;
        dots.push({
            x: canvas.width / 2 + radius * Math.cos(angle),
            y: canvas.height / 2 + radius * Math.sin(angle),
            baseR: radius,
            angle: angle,
            r: Math.random() * 1.5 + 1,
            color: `hsla(${35 + 50 * Math.random()},92%,65%,.88)`
        });
    }
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.angle += 0.0017 * (i % 2 == 0 ? 1 : -1);
        dot.baseR += Math.sin(Date.now() / 900 + i) * 0.09 * (i % 2 == 0 ? 1 : -1);
        dot.x = canvas.width / 2 + dot.baseR * Math.cos(dot.angle);
        dot.y = canvas.width / 2 + dot.baseR * Math.sin(dot.angle);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.shadowColor = i % 6 == 0 ? '#ffae00' : '#1af2ff';
        ctx.shadowBlur = dot.r * 6;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    requestAnimationFrame(animateDots);
}

resizeCanvas(); 
createDots(); 
animateDots();
window.addEventListener('resize', () => { 
    resizeCanvas(); 
    createDots(); 
});

// ============ ElevenLabs Widget Integration ============
const elWidget = document.getElementById("elevenlabsWidget");
const elLabel = elWidget.querySelector(".widget-label");
const elBox = elWidget.querySelector(".widget-box");

elLabel.onclick = () => {
    elWidget.classList.toggle("active");
    if (elWidget.classList.contains('active')) { 
        elBox.focus(); 
    }
};

window.addEventListener('click', e => {
    if (elWidget.classList.contains('active')) {
        if (!elWidget.contains(e.target)) elWidget.classList.remove('active');
    }
}, true);

// ============ Conversation Tracking ============
let conversationSummary = [];
let currentCallStartTime = null;
let lastUserMessageTime = null;
let lastBotResponseTime = null;
let isBotSpeaking = false;
let interruptionCount = 0;
let emotionData = [];
let interruptionData = [0, 0, 0, 0, 0];
let callDuration = 0;

// Enhanced Emotion Detection Keywords with more sophisticated patterns
const emotionKeywords = {
  angry: [
    'angry', 'frustrated', 'mad', 'upset', 'annoyed', 'irritated', 'furious', 'hate', 'terrible',
    'waste of time', 'ridiculous', 'unacceptable', 'fed up', 'sick of', 'tired of', 'useless',
    'stupid', 'idiot', 'nonsense', 'bullshit', 'damn', 'hell', 'screw', 'pissed', 'livid'
  ],
  worried: [
    'worried', 'concerned', 'anxious', 'nervous', 'stressed', 'scared', 'fearful', 'afraid', 'panic',
    'what if', 'what happens if', 'i\'m scared', 'i\'m afraid', 'i don\'t know what to do',
    'this is stressful', 'i\'m overwhelmed', 'i can\'t handle this', 'i\'m freaking out',
    'emergency', 'urgent', 'desperate', 'helpless', 'lost', 'confused about'
  ],
  happy: [
    'happy', 'excited', 'pleased', 'satisfied', 'delighted', 'joyful', 'great', 'wonderful', 'amazing',
    'thank you', 'thanks', 'appreciate', 'love it', 'perfect', 'excellent', 'fantastic', 'brilliant',
    'you helped', 'you saved', 'you\'re the best', 'awesome', 'outstanding', 'superb', 'incredible'
  ],
  confused: [
    'confused', 'don\'t understand', 'not clear', 'unclear', 'what do you mean', 'i don\'t get it',
    'can you explain', 'what does that mean', 'i\'m lost', 'lost me', 'not following',
    'doesn\'t make sense', 'unclear', 'vague', 'complicated', 'too complex', 'overwhelming'
  ]
};

// Enhanced empathy keywords for bot responses
const empathyKeywords = [
  'understand', 'care', 'concern', 'sorry', 'help', 'support', 'assist',
  'empathize', 'feel', 'realize', 'appreciate', 'value', 'important', 'comfort',
  'hear you', 'get it', 'know how you feel', 'that must be', 'i can imagine',
  'let me help', 'we\'ll figure this out', 'don\'t worry', 'it\'s okay'
];

// Emotion-based tone adaptation contexts for ElevenLabs
const emotionContext = {
  angry: {
    context: "The user is frustrated and angry. Respond with extreme patience, empathy, and understanding. Use short, clear sentences. Acknowledge their frustration first before providing solutions. Speak slowly and calmly. Avoid technical jargon. Focus on immediate solutions and reassurance.",
    tone: "calm, patient, understanding, empathetic",
    responseStyle: "immediate acknowledgment + clear solution"
  },
  worried: {
    context: "The user is anxious and stressed. Speak slowly, warmly, and with gentle reassurance. Use comforting language and provide step-by-step guidance. Emphasize that everything will be okay and that you're here to help. Be extra patient and thorough in explanations.",
    tone: "warm, reassuring, gentle, comforting",
    responseStyle: "reassurance + detailed guidance"
  },
  happy: {
    context: "The user is satisfied and positive. Keep the tone light, positive, and engaging. You can be more conversational and use friendly language. Build on their positive energy while still being professional and helpful.",
    tone: "friendly, positive, engaging, professional",
    responseStyle: "positive reinforcement + helpful continuation"
  },
  confused: {
    context: "The user is confused and needs clarity. Break down complex information into simple, digestible parts. Use analogies and examples. Speak clearly and slowly. Ask clarifying questions if needed. Provide visual or step-by-step explanations.",
    tone: "clear, patient, educational, helpful",
    responseStyle: "simplified explanation + examples"
  },
  neutral: {
    context: "The user is in a neutral emotional state. Maintain a professional, friendly, and helpful tone. Be informative and efficient while remaining approachable.",
    tone: "professional, friendly, helpful, informative",
    responseStyle: "direct assistance + helpful information"
  }
};

// Global variables for emotion tracking
let currentEmotion = 'neutral';
let emotionHistory = [];
let lastEmotionChange = Date.now();
let emotionConfidence = 0;

// Advanced emotion learning system
let emotionLearningData = {
  patterns: {},
  userPreferences: {},
  adaptationSuccess: {},
  sessionData: []
};

// Load emotion learning data from localStorage
function loadEmotionLearningData() {
  try {
    const saved = localStorage.getItem('insurebot_emotion_learning');
    if (saved) {
      emotionLearningData = JSON.parse(saved);
    }
  } catch (error) {
    console.log('⚠️ Could not load emotion learning data:', error);
  }
}

// Save emotion learning data to localStorage
function saveEmotionLearningData() {
  try {
    localStorage.setItem('insurebot_emotion_learning', JSON.stringify(emotionLearningData));
  } catch (error) {
    console.log('⚠️ Could not save emotion learning data:', error);
  }
}

// Initialize emotion learning system
loadEmotionLearningData();

// Enhanced emotion detection with confidence scoring
function detectEmotion(text) {
  const lowerText = text.toLowerCase();
  let maxConfidence = 0;
  let detectedEmotion = 'neutral';
  
  // Check for emotion keywords with confidence scoring
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const matches = keywords.filter(keyword => lowerText.includes(keyword));
    const confidence = matches.length / keywords.length;
    
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      detectedEmotion = emotion;
    }
  }
  
  // Additional context-based detection
  if (lowerText.includes('!') && lowerText.includes('angry')) {
    detectedEmotion = 'angry';
    maxConfidence = Math.max(maxConfidence, 0.8);
  }
  
  if (lowerText.includes('?') && (lowerText.includes('what') || lowerText.includes('how') || lowerText.includes('why'))) {
    detectedEmotion = 'confused';
    maxConfidence = Math.max(maxConfidence, 0.7);
  }
  
  // Update emotion tracking
  if (detectedEmotion !== currentEmotion && maxConfidence > 0.3) {
    const emotionChange = {
      from: currentEmotion,
      to: detectedEmotion,
      confidence: maxConfidence,
      timestamp: Date.now(),
      text: text
    };
    
    emotionHistory.push(emotionChange);
    currentEmotion = detectedEmotion;
    lastEmotionChange = Date.now();
    emotionConfidence = maxConfidence;
    
    // Update ElevenLabs context based on new emotion
    updateElevenLabsContext(detectedEmotion);
    
    console.log(`🧠 Emotion detected: ${detectedEmotion} (confidence: ${Math.round(maxConfidence * 100)}%)`);
  }
  
  return detectedEmotion;
}

// Function to update ElevenLabs context based on detected emotion
function updateElevenLabsContext(emotion) {
  const convai = document.querySelector("elevenlabs-convai");
  if (!convai) return;
  
  // Get personalized context based on learning
  const context = getPersonalizedEmotionContext(emotion);
  
  // Update the agent's context by sending a system message
  try {
    // Create a custom event to update the agent context
    const contextUpdateEvent = new CustomEvent('updateAgentContext', {
      detail: {
        context: context.context,
        tone: context.tone,
        responseStyle: context.responseStyle,
        emotion: emotion
      }
    });
    
    document.dispatchEvent(contextUpdateEvent);
    
    // Also try to update via the widget's API if available
    if (convai.updateContext) {
      convai.updateContext(context.context);
    }
    
    console.log(`🎭 Updated ElevenLabs context for emotion: ${emotion}`);
    console.log(`📝 New context: ${context.context.substring(0, 100)}...`);
    
    // Update UI to show current emotion adaptation
    updateEmotionAdaptationUI(emotion, context);
    
  } catch (error) {
    console.log('⚠️ Could not update ElevenLabs context:', error);
  }
}

// Update UI to show emotion adaptation
function updateEmotionAdaptationUI(emotion, context) {
  const emotionValue = document.getElementById('emotionValue');
  const emotionStatus = document.getElementById('emotionStatus');
  
  if (emotionValue) {
    const emotionEmojis = {
      angry: '😡',
      worried: '😢', 
      happy: '😊',
      confused: '😕',
      neutral: '😐'
    };
    
    emotionValue.innerHTML = `${emotionEmojis[emotion]} ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`;
  }
  
  if (emotionStatus) {
    const statusColors = {
      angry: '🔴',
      worried: '🟡',
      happy: '🟢',
      confused: '🟠',
      neutral: '🟡'
    };
    
    emotionStatus.textContent = statusColors[emotion];
  }
  
  // Add emotion adaptation indicator to timeline
  addTimelineItem('System', `Adapting to ${emotion} emotion - ${context.tone} tone`);
  
  // Update emotion learning analytics
  updateEmotionLearningAnalytics(emotion);
}

// Update emotion learning analytics in the dashboard
function updateEmotionLearningAnalytics(emotion) {
  const patterns = emotionLearningData.patterns[emotion];
  if (!patterns) return;
  
  // Add learning insights to timeline
  const frequency = patterns.frequency;
  const commonPhrases = Object.keys(patterns.commonPhrases)
    .sort((a, b) => patterns.commonPhrases[b] - patterns.commonPhrases[a])
    .slice(0, 3);
  
  if (frequency > 1) {
    addTimelineItem('AI', `Learning: ${emotion} detected ${frequency} times. Common phrases: ${commonPhrases.join(', ')}`);
  }
  
  // Update analytics dashboard with learning data
  if (socket && isConnected) {
    socket.emit('emotion-learning-update', {
      emotion,
      frequency,
      commonPhrases,
      timePatterns: patterns.timeOfDay
    });
  }
}

// Update empathy display with detailed analysis
function updateEmpathyDisplay(empathyAnalysis) {
  const empathyValue = document.getElementById('empathyValue');
  const empathyStatus = document.getElementById('empathyStatus');
  
  if (empathyValue) {
    const score = empathyAnalysis.empathyScore;
    const tone = empathyAnalysis.tone;
    
    // Add tone indicator to empathy score
    const toneEmojis = {
      empathetic: '💙',
      positive: '💚',
      educational: '💡',
      neutral: '💭'
    };
    
    empathyValue.innerHTML = `${toneEmojis[tone] || '💭'} ${score}%`;
  }
  
  if (empathyStatus) {
    const score = empathyAnalysis.empathyScore;
    let status = '🟡';
    
    if (score >= 80) status = '🟢';
    else if (score >= 60) status = '🟡';
    else if (score >= 40) status = '🟠';
    else status = '🔴';
    
    empathyStatus.textContent = status;
  }
  
  // Add empathy analysis to timeline
  const analysisText = [];
  if (empathyAnalysis.emotionalAcknowledgment) analysisText.push('emotional acknowledgment');
  if (empathyAnalysis.solutionOriented) analysisText.push('solution-oriented');
  if (empathyAnalysis.personalization) analysisText.push('personalized');
  
  if (analysisText.length > 0) {
    addTimelineItem('System', `Empathy analysis: ${analysisText.join(', ')} (${empathyAnalysis.tone} tone)`);
  }
}

// Enhanced empathy score calculation
function calculateEmpathyScore(text) {
  const lowerText = text.toLowerCase();
  const empathyWords = empathyKeywords.filter(word => lowerText.includes(word));
  
  // Base score from empathy keywords
  let score = Math.min(100, (empathyWords.length / empathyKeywords.length) * 100);
  
  // Bonus for emotional acknowledgment
  if (lowerText.includes('i understand') || lowerText.includes('i hear you')) {
    score += 20;
  }
  
  // Bonus for offering help
  if (lowerText.includes('let me help') || lowerText.includes('i can help')) {
    score += 15;
  }
  
  // Bonus for emotional validation
  if (lowerText.includes('that must be') || lowerText.includes('i can imagine')) {
    score += 10;
  }
  
  return Math.min(100, Math.round(score));
}

// Generate emotion-aware response suggestions
function generateEmotionAwareResponse(userMessage, detectedEmotion) {
  const context = emotionContext[detectedEmotion];
  if (!context) return null;
  
  const responseTemplates = {
    angry: [
      "I completely understand your frustration, and I want to help resolve this for you right away.",
      "I hear how upset you are, and I'm here to fix this situation immediately.",
      "Your frustration is completely valid, and I'm going to address this concern right now."
    ],
    worried: [
      "I can see this is causing you stress, and I want to reassure you that we'll work through this together.",
      "I understand your concern, and I'm here to help you feel more confident about this situation.",
      "Let me help ease your worries by walking you through this step by step."
    ],
    happy: [
      "I'm so glad I could help! Let's continue making this a positive experience for you.",
      "That's wonderful to hear! I'm here to keep things going smoothly for you.",
      "I love your positive energy! Let's keep this momentum going."
    ],
    confused: [
      "I can see this might be unclear, so let me break this down in a simpler way.",
      "Let me explain this more clearly so you feel completely comfortable with it.",
      "I want to make sure you understand this fully. Let me walk you through it step by step."
    ]
  };
  
  const templates = responseTemplates[detectedEmotion] || [];
  if (templates.length === 0) return null;
  
  // Select a template based on the user's message content
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
}

// Enhanced response analysis for better empathy scoring
function analyzeResponseEmpathy(responseText) {
  const analysis = {
    empathyScore: calculateEmpathyScore(responseText),
    emotionalAcknowledgment: false,
    solutionOriented: false,
    personalization: false,
    tone: 'neutral'
  };
  
  const lowerText = responseText.toLowerCase();
  
  // Check for emotional acknowledgment
  analysis.emotionalAcknowledgment = 
    lowerText.includes('i understand') || 
    lowerText.includes('i hear you') || 
    lowerText.includes('i can see') ||
    lowerText.includes('that must be');
  
  // Check for solution orientation
  analysis.solutionOriented = 
    lowerText.includes('let me help') || 
    lowerText.includes('i can help') || 
    lowerText.includes('we can') ||
    lowerText.includes('here\'s how');
  
  // Check for personalization
  analysis.personalization = 
    lowerText.includes('for you') || 
    lowerText.includes('your') || 
    lowerText.includes('we\'ll') ||
    lowerText.includes('together');
  
  // Determine tone
  if (lowerText.includes('frustrated') || lowerText.includes('upset')) {
    analysis.tone = 'empathetic';
  } else if (lowerText.includes('wonderful') || lowerText.includes('great')) {
    analysis.tone = 'positive';
  } else if (lowerText.includes('clearly') || lowerText.includes('simply')) {
    analysis.tone = 'educational';
  }
  
  return analysis;
}

// Calculate emotion confidence score
function getEmotionConfidence(text, emotion) {
  const lowerText = text.toLowerCase();
  const keywords = emotionKeywords[emotion] || [];
  
  if (keywords.length === 0) return 0;
  
  const matches = keywords.filter(keyword => lowerText.includes(keyword));
  let confidence = matches.length / keywords.length;
  
  // Boost confidence for strong indicators
  if (lowerText.includes('!') && emotion === 'angry') confidence += 0.2;
  if (lowerText.includes('?') && emotion === 'confused') confidence += 0.2;
  if (lowerText.includes('thank') && emotion === 'happy') confidence += 0.2;
  
  return Math.min(1, confidence);
}

// Real-time emotion adaptation system
function adaptToUserEmotion(emotion, userMessage) {
  const context = emotionContext[emotion];
  if (!context) return;
  
  // Update the agent's personality and response style
  const adaptationData = {
    emotion: emotion,
    context: context.context,
    tone: context.tone,
    responseStyle: context.responseStyle,
    userMessage: userMessage,
    timestamp: Date.now()
  };
  
  // Learn from this interaction
  learnFromEmotionInteraction(emotion, userMessage, adaptationData);
  
  // Generate response suggestion for this emotion
  const responseSuggestion = generateEmotionAwareResponse(userMessage, emotion);
  if (responseSuggestion) {
    adaptationData.suggestedResponse = responseSuggestion;
  }
  
  // Send adaptation data to server if connected
  if (socket && isConnected) {
    socket.emit('emotion-adaptation', adaptationData);
  }
  
  // Update UI with adaptation feedback
  showEmotionAdaptationFeedback(emotion, context);
  
  // Show response suggestion if available
  if (responseSuggestion) {
    showResponseSuggestion(responseSuggestion, emotion);
  }
  
  // Log adaptation for analytics
  console.log(`🎭 Adapting to ${emotion} emotion:`, adaptationData);
}

// Show response suggestion to guide AI responses
function showResponseSuggestion(suggestion, emotion) {
  // Create suggestion element
  const suggestionElement = document.createElement('div');
  suggestionElement.className = 'response-suggestion';
  suggestionElement.setAttribute('data-emotion', emotion);
  suggestionElement.innerHTML = `
    <div class="suggestion-header">
      <span class="suggestion-icon">💡</span>
      <span class="suggestion-title">Response Suggestion</span>
      <button class="suggestion-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
    <div class="suggestion-content">
      <p>${suggestion}</p>
      <div class="suggestion-tags">
        <span class="tag emotion-tag">${emotion}</span>
        <span class="tag empathy-tag">empathetic</span>
      </div>
    </div>
  `;
  
  // Add to main content area
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.appendChild(suggestionElement);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (suggestionElement.parentNode) {
        suggestionElement.parentNode.removeChild(suggestionElement);
      }
    }, 10000);
  }
}

// Learn from emotion interactions to improve future responses
function learnFromEmotionInteraction(emotion, userMessage, adaptationData) {
  const sessionId = Date.now().toString();
  
  // Record session data
  const sessionEntry = {
    sessionId,
    emotion,
    userMessage,
    adaptation: adaptationData,
    timestamp: Date.now(),
    confidence: emotionConfidence
  };
  
  emotionLearningData.sessionData.push(sessionEntry);
  
  // Update emotion patterns
  if (!emotionLearningData.patterns[emotion]) {
    emotionLearningData.patterns[emotion] = {
      frequency: 0,
      commonPhrases: {},
      timeOfDay: {},
      userResponses: []
    };
  }
  
  emotionLearningData.patterns[emotion].frequency++;
  
  // Track common phrases for this emotion
  const words = userMessage.toLowerCase().split(/\s+/);
  words.forEach(word => {
    if (word.length > 3) {
      emotionLearningData.patterns[emotion].commonPhrases[word] = 
        (emotionLearningData.patterns[emotion].commonPhrases[word] || 0) + 1;
    }
  });
  
  // Track time patterns
  const hour = new Date().getHours();
  const timeSlot = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  emotionLearningData.patterns[emotion].timeOfDay[timeSlot] = 
    (emotionLearningData.patterns[emotion].timeOfDay[timeSlot] || 0) + 1;
  
  // Save learning data
  saveEmotionLearningData();
  
  // Log learning progress
  console.log(`🧠 Learning from ${emotion} interaction:`, {
    frequency: emotionLearningData.patterns[emotion].frequency,
    commonPhrases: Object.keys(emotionLearningData.patterns[emotion].commonPhrases).slice(0, 5)
  });
}

// Get personalized emotion context based on learning
function getPersonalizedEmotionContext(emotion) {
  const baseContext = emotionContext[emotion];
  if (!baseContext) return emotionContext.neutral;
  
  const patterns = emotionLearningData.patterns[emotion];
  if (!patterns || patterns.frequency < 3) return baseContext;
  
  // Enhance context based on learned patterns
  let enhancedContext = baseContext.context;
  
  // Add personalized elements based on frequency
  if (patterns.frequency > 10) {
    enhancedContext += " This user has shown this emotion pattern before. Use proven successful approaches.";
  }
  
  // Add time-based personalization
  const hour = new Date().getHours();
  const timeSlot = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  if (patterns.timeOfDay[timeSlot] > patterns.frequency * 0.3) {
    enhancedContext += ` This user tends to be ${emotion} during ${timeSlot} hours.`;
  }
  
  return {
    ...baseContext,
    context: enhancedContext
  };
}

// Show emotion adaptation feedback in UI
function showEmotionAdaptationFeedback(emotion, context) {
  // Create a temporary feedback element
  const feedback = document.createElement('div');
  feedback.className = 'emotion-adaptation-feedback';
  feedback.setAttribute('data-emotion', emotion);
  feedback.innerHTML = `
    <div class="adaptation-indicator">
      <span class="emotion-icon">${getEmotionEmoji(emotion)}</span>
      <span class="adaptation-text">Adapting to ${emotion} emotion</span>
      <span class="tone-indicator">${context.tone}</span>
    </div>
  `;
  
  // Add to main content area
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 3000);
  }
}

// Enhanced emotion emoji function
function getEmotionEmoji(emotion) {
  const emojis = {
    angry: '😡',
    worried: '😢',
    happy: '😊',
    confused: '😕',
    neutral: '😐'
  };
  return emojis[emotion] || '😐';
}

function updateEmotionChart(emotion) {
  if (!emotionChart) return;
  
  const emotionLevels = { neutral: 0, happy: 1, angry: 2, worried: 3 };
  const level = emotionLevels[emotion] || 0;
  
  const now = new Date();
  const timeLabel = now.toLocaleTimeString('en-US', { hour12: false });
  
  emotionChart.data.labels.push(timeLabel);
  emotionChart.data.datasets[0].data.push(level);
  
  // Keep only last 10 data points
  if (emotionChart.data.labels.length > 10) {
    emotionChart.data.labels.shift();
    emotionChart.data.datasets[0].data.shift();
  }
  
  emotionChart.update('none');
  console.log(`📊 Emotion chart updated: ${emotion} (level ${level})`);
}

function updateInterruptionChart() {
  if (!interruptionChart) return;
  
  // Update interruption data based on call duration
  const durationMinutes = Math.floor(callDuration / 60);
  const index = Math.min(durationMinutes, 4);
  interruptionData[index]++;
  
  interruptionChart.data.datasets[0].data = [...interruptionData];
  interruptionChart.update('none');
  
  // Update interruptions counter
  const interruptionsValue = document.getElementById('interruptionsValue');
  if (interruptionsValue) {
    const totalInterruptions = interruptionData.reduce((a, b) => a + b, 0);
    interruptionsValue.textContent = totalInterruptions;
  }
  
  console.log(`📊 Interruption chart updated: segment ${index}, total: ${interruptionData[index]}`);
}

function addTimelineItem(speaker, message) {
  const timelineContainer = document.getElementById('timelineContainer');
  if (!timelineContainer) return;
  
  const timelineItem = document.createElement('div');
  timelineItem.className = 'timeline-item slide-in';
  
  timelineItem.innerHTML = `
    <div class="timeline-dot ${speaker.toLowerCase()}"></div>
    <div class="timeline-content">
      <span class="speaker">${speaker}</span>
      <span class="message">${message}</span>
    </div>
  `;
  
  timelineContainer.appendChild(timelineItem);
  
  // Auto-scroll to bottom
  timelineContainer.scrollTop = timelineContainer.scrollHeight;
  
  // Remove old items if too many
  const items = timelineContainer.querySelectorAll('.timeline-item');
  if (items.length > 20) {
    items[0].remove();
  }
}

function updateCallStatus(status) {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');
  
  if (statusDot && statusText) {
    statusDot.className = `status-dot ${status}`;
    statusText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  }
}

function observeElevenLabsMessages() {
    const convai = document.querySelector("elevenlabs-convai");
    if (!convai) return;

    const waitForShadowAndMessages = () => {
        if (convai.shadowRoot) {
            const allDivs = Array.from(convai.shadowRoot.querySelectorAll('div'));
            const msgList = allDivs.find(container =>
                container.childElementCount > 1 && Array.from(container.children).every(child=>child.tagName==="DIV")
            );
            
            if (msgList) {
                let prevMsgs = [];
                const msgObserver = new MutationObserver(() => {
                    const items = Array.from(msgList.querySelectorAll('div'));
                    const allMsgs = items.map(div => div.textContent || "").filter(Boolean);
                    const newMsgs = allMsgs.slice(prevMsgs.length);
                    
                    newMsgs.forEach(rawMsg => {
                        let who = "AI";
                        let msg = rawMsg.trim();
                        
                        // Heuristic: if first char is > or "User:" or "You:", treat as human, otherwise AI.
                        if (/^((you|user)[:,\- ]|[?.!'"]?\s?$)/i.test(msg) || msg.length < 80) {
                            if (conversationSummary.length === 0 || conversationSummary[conversationSummary.length-1].who === "AI") {
                                who = "Human";
                                lastUserMessageTime = Date.now();
                                
                                // Enhanced emotion detection with real-time adaptation
                                const emotion = detectEmotion(msg);
                                const emotionConfidence = getEmotionConfidence(msg, emotion);
                                
                                if (emotion !== 'neutral' && emotionConfidence > 0.3) {
                                    if (socket && isConnected) {
                                        socket.emit('emotion-detected', { 
                                            emotion, 
                                            text: msg, 
                                            confidence: emotionConfidence,
                                            timestamp: Date.now()
                                        });
                                    }
                                    updateEmotionChart(emotion);
                                    
                                    // Real-time emotion adaptation
                                    adaptToUserEmotion(emotion, msg);
                                }
                                
                                // Check for interruptions
                                if (isBotSpeaking) {
                                    interruptionCount++;
                                    if (socket && isConnected) {
                                        socket.emit('interruption-detected');
                                    }
                                    updateInterruptionChart();
                                }
                                
                                addTimelineItem('User', msg);
                            }
                        } else {
                            // AI response
                            isBotSpeaking = true;
                            lastBotResponseTime = Date.now();
                            
                            // Enhanced empathy analysis
                            const empathyAnalysis = analyzeResponseEmpathy(msg);
                            if (socket && isConnected) {
                                socket.emit('empathy-score', { 
                                    score: empathyAnalysis.empathyScore, 
                                    text: msg,
                                    analysis: empathyAnalysis
                                });
                            }
                            
                            // Update empathy display with detailed analysis
                            updateEmpathyDisplay(empathyAnalysis);
                            
                            // Calculate latency
                            if (lastUserMessageTime) {
                                const latency = lastBotResponseTime - lastUserMessageTime;
                                if (latency > 0 && latency < 10000) { // Reasonable range
                                    if (socket && isConnected) {
                                        socket.emit('latency-update', latency);
                                    }
                                }
                            }
                            
                            // Stop bot speaking after a delay
                            setTimeout(() => {
                                isBotSpeaking = false;
                            }, 3000);
                            
                            addTimelineItem('AI', msg);
                        }
                        
                        conversationSummary.push({who, text: msg});
                        showSummaryFlash();
                    });
                    prevMsgs = allMsgs;
                });
                msgObserver.observe(msgList, {childList: true, subtree: true});
                window.__elevenlabsMsgObserver = msgObserver;
            }
        } else {
            setTimeout(waitForShadowAndMessages, 240);
        }
    };
    waitForShadowAndMessages();
}

// ============ Dynamic Flash Message for Conversation Summary ============
const flashSummary = document.getElementById('flash-summary');

function showSummaryFlash() {
    if (conversationSummary.length === 0) return;
    flashSummary.innerHTML = `
      <b>Conversation Summary</b><br>
      <ul style="list-style:none;padding:0; margin:0;">
        ${conversationSummary.slice(-10).map(entry =>
            `<li><span style="color:${entry.who === "AI" ? "#631bb7" : "#263ad6"};">${entry.who}:</span> ${entry.text}</li>`
        ).join('')}
      </ul>
    `;
    flashSummary.classList.add('visible');
    clearTimeout(flashSummary.hideTimer);
    flashSummary.hideTimer = setTimeout(() => {
        flashSummary.classList.remove('visible');
    }, 6000);
}

// ============ Start Speaking Button + Mic Sync ============
const speakBtn = document.getElementById('speakBtn');
let listening = false;

function resetSpeakUI() {
    listening = false;
    speakBtn.classList.remove('active');
    speakBtn.querySelector('span').innerText = "Start Speaking";
    canvas.parentElement.style.boxShadow = "";
    document.body.classList.remove('listening-bg');
    updateCallStatus('idle');
}

function observeElevenLabsMic() {
    const convai = document.querySelector("elevenlabs-convai");
    if (!convai) return;
    
    const tryObserve = () => {
        if (convai.shadowRoot) {
            const micButton = convai.shadowRoot.querySelector('button[aria-label*="record"], button');
            if (micButton) {
                const observer = new MutationObserver(() => {
                    const ariaPressed = micButton.getAttribute('aria-pressed');
                    const micText = micButton.textContent.toLowerCase();
                    const isMicActive = ariaPressed === "true" ||
                        micText.includes("stop") ||
                        micButton.classList.contains('active');
                    if (!isMicActive) {
                        resetSpeakUI();
                        // End call tracking
                        if (currentCallStartTime) {
                            endCall();
                        }
                    }
                });
                observer.observe(micButton, { attributes: true, attributeFilter: ['aria-pressed', 'class'], childList: false, subtree: false });
                window.__elevenlabsMicObserved = observer;
            }
        } else {
            setTimeout(tryObserve, 200);
        }
    };
    tryObserve();
}

function startCall() {
    currentCallStartTime = Date.now();
    conversationSummary = [];
    interruptionCount = 0;
    emotionData = [];
    interruptionData = [0, 0, 0, 0, 0];
    callDuration = 0;
    
    // Reset charts
    if (emotionChart) {
        emotionChart.data.labels = [];
        emotionChart.data.datasets[0].data = [];
        emotionChart.update('none');
    }
    
    if (interruptionChart) {
        interruptionChart.data.datasets[0].data = [0, 0, 0, 0, 0];
        interruptionChart.update('none');
    }
    
    // Clear timeline
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer) {
        timelineContainer.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-dot user"></div>
                <div class="timeline-content">
                    <span class="speaker">User</span>
                    <span class="message">Call started</span>
                </div>
            </div>
        `;
    }
    
    // Hide summary section
    const summarySection = document.getElementById('summarySection');
    if (summarySection) {
        summarySection.style.display = 'none';
    }
    
    updateCallStatus('active');
    if (socket && isConnected) {
        socket.emit('call-started');
    }
    
    // Start call duration timer
    callDurationTimer = setInterval(() => {
        callDuration = Date.now() - currentCallStartTime;
    }, 1000);
}

function endCall() {
    if (conversationSummary.length > 0) {
        // Generate call summary
        generateCallSummary();
        // Show feedback modal after a delay
        setTimeout(() => {
            showFeedbackModal();
        }, 2000);
    }
    
    if (callDurationTimer) {
        clearInterval(callDurationTimer);
    }
    
    updateCallStatus('idle');
    currentCallStartTime = null;
}

speakBtn.onclick = () => {
    elWidget.classList.add('active');
    startCall();
    listening = true;
    speakBtn.classList.add('active');
    speakBtn.querySelector('span').innerText = "Listening...";
    canvas.parentElement.style.boxShadow = "0 0 128px 63px #1af2ff98,0 0 32px 15px #ffae0077";
    document.body.classList.add('listening-bg');
    updateCallStatus('listening');

    setTimeout(() => {
        const convai = document.querySelector("elevenlabs-convai");
        if (convai && convai.shadowRoot) {
            const micButton = convai.shadowRoot.querySelector('button[aria-label*="record"], button');
            if (micButton) micButton.click();
        }
        observeElevenLabsMic();
        observeElevenLabsMessages();
    }, 500);
};

// ============ Call Summary Generation ============
async function generateCallSummary() {
    if (conversationSummary.length === 0) return;
    
    const transcript = conversationSummary.map(entry => `${entry.who}: ${entry.text}`).join('\n');
    
    try {
        const response = await fetch('/api/summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript })
        });
        
        if (response.ok) {
            const data = await response.json();
            showSummaryInSidebar(data.summary);
        } else {
            console.error('Failed to generate summary');
        }
    } catch (error) {
        console.error('Error generating summary:', error);
    }
}

function showSummaryInSidebar(summary) {
    const summarySection = document.getElementById('summarySection');
    const summaryContent = document.getElementById('summaryContent');
    
    if (summarySection && summaryContent) {
        summaryContent.innerHTML = `
            <div class="summary-section">
                <h4>Customer Name</h4>
                <p>${summary.customerName || 'Not specified'}</p>
            </div>
            <div class="summary-section">
                <h4>Purpose</h4>
                <p>${summary.purpose || 'General inquiry'}</p>
            </div>
            <div class="summary-section">
                <h4>Key Points</h4>
                <ul>
                    ${(summary.keyPoints || []).map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
            <div class="summary-section">
                <h4>Sentiment</h4>
                <p>${summary.sentiment || 'Neutral'}</p>
            </div>
            <div class="summary-section">
                <h4>Action Items</h4>
                <ul>
                    ${(summary.actionItems || []).map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="summary-section">
                <h4>Risk Level</h4>
                <p>${summary.riskLevel || 'Low'}</p>
            </div>
        `;
        
        summarySection.style.display = 'block';
    }
}

// Copy summary functionality
document.getElementById('copySummary')?.addEventListener('click', () => {
    const summaryContent = document.getElementById('summaryContent');
    if (summaryContent) {
        navigator.clipboard.writeText(summaryContent.textContent).then(() => {
            // Show success message
            const button = document.getElementById('copySummary');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    }
});

// ============ Summary Modal ============
const summaryModal = document.getElementById('summaryModal');
const closeSummaryModal = document.getElementById('closeSummaryModal');

closeSummaryModal?.addEventListener('click', () => {
    summaryModal.classList.remove('active');
});

summaryModal?.addEventListener('click', (e) => {
    if (e.target === summaryModal) {
        summaryModal.classList.remove('active');
    }
});

// ============ Feedback Modal ============
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedbackModal = document.getElementById('closeFeedbackModal');
const ratingStars = document.querySelectorAll('.rating-stars i');
const submitFeedback = document.getElementById('submitFeedback');
let selectedRating = 0;

function showFeedbackModal() {
    feedbackModal.classList.add('active');
}

closeFeedbackModal?.addEventListener('click', () => {
    feedbackModal.classList.remove('active');
});

feedbackModal?.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {
        feedbackModal.classList.remove('active');
    }
});

ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        selectedRating = rating;
        
        ratingStars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
    });
    
    star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        ratingStars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
    
    star.addEventListener('mouseleave', () => {
        ratingStars.forEach(s => s.classList.remove('active'));
    });
});

submitFeedback?.addEventListener('click', () => {
    const comment = document.getElementById('feedbackComment').value;
    
    console.log('Feedback submitted:', {
        rating: selectedRating,
        comment: comment,
        timestamp: new Date().toISOString(),
        callDuration: currentCallStartTime ? Date.now() - currentCallStartTime : 0,
        interruptions: interruptionCount
    });
    
    // Reset form
    selectedRating = 0;
    ratingStars.forEach(s => s.classList.remove('selected'));
    document.getElementById('feedbackComment').value = '';
    
    // Close modal
    feedbackModal.classList.remove('active');
    
    // Show thank you message
    showThankYouMessage();
});

function showThankYouMessage() {
    const thankYou = document.createElement('div');
    thankYou.className = 'flash-summary visible';
    thankYou.innerHTML = '<b>Thank you for your feedback!</b><br>Your response helps us improve InsureBot Pulse.';
    thankYou.style.position = 'fixed';
    thankYou.style.top = '24px';
    thankYou.style.left = '50%';
    thankYou.style.transform = 'translateX(-50%)';
    thankYou.style.zIndex = '2000';
    
    document.body.appendChild(thankYou);
    
    setTimeout(() => {
        thankYou.remove();
    }, 3000);
}

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 InsureBot Pulse initialized');
    initializeSocket();
    updateConnectionStatus();
    initializeCharts();
    
    // Add comprehensive demo data to show all three visualizations working
    setTimeout(() => {
        console.log('📊 Adding comprehensive demo analytics data...');
        
        // Demo emotion timeline data
        updateEmotionChart('happy');
        setTimeout(() => updateEmotionChart('neutral'), 1000);
        setTimeout(() => updateEmotionChart('worried'), 2000);
        setTimeout(() => updateEmotionChart('angry'), 3000);
        setTimeout(() => updateEmotionChart('happy'), 4000);
        
        // Demo interruption data
        setTimeout(() => {
            updateInterruptionChart();
            updateInterruptionChart();
        }, 1500);
        setTimeout(() => {
            updateInterruptionChart();
            updateInterruptionChart();
            updateInterruptionChart();
        }, 2500);
        
        // Demo empathy score updates
        setTimeout(() => {
            if (empathyChart) {
                empathyChart.data.datasets[0].data = [65, 35];
                empathyChart.update('none');
            }
        }, 1000);
        
        setTimeout(() => {
            if (empathyChart) {
                empathyChart.data.datasets[0].data = [85, 15];
                empathyChart.update('none');
            }
        }, 3000);
        
        // Update metrics with demo values
        const latencyValue = document.getElementById('latencyValue');
        const emotionValue = document.getElementById('emotionValue');
        const empathyValue = document.getElementById('empathyValue');
        const interruptionsValue = document.getElementById('interruptionsValue');
        
        if (latencyValue) latencyValue.textContent = '245ms';
        if (emotionValue) emotionValue.textContent = 'Happy';
        if (empathyValue) empathyValue.textContent = '85%';
        if (interruptionsValue) interruptionsValue.textContent = '5';
        
        // Add demo timeline items
        setTimeout(() => {
            addTimelineItem('User', 'Hello, I need help with my insurance');
            addTimelineItem('AI', 'I understand you need assistance. How can I help you today?');
            addTimelineItem('User', 'I\'m worried about my coverage');
            addTimelineItem('AI', 'I care about your concerns. Let me help you review your policy.');
        }, 500);
        
        console.log('✅ Comprehensive demo analytics data loaded');
    }, 1000);
    
    // Set up continuous live updates
    setInterval(() => {
        // Simulate live emotion changes
        const emotions = ['happy', 'neutral', 'worried', 'angry'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        updateEmotionChart(randomEmotion);
        
        // Simulate occasional interruptions
        if (Math.random() > 0.8) {
            updateInterruptionChart();
        }
        
        // Simulate empathy score fluctuations
        if (empathyChart && Math.random() > 0.7) {
            const newScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
            empathyChart.data.datasets[0].data = [newScore, 100 - newScore];
            empathyChart.update('none');
            
            // Update empathy value display
            const empathyValue = document.getElementById('empathyValue');
            if (empathyValue) empathyValue.textContent = `${newScore}%`;
        }
    }, 5000); // Update every 5 seconds
});
