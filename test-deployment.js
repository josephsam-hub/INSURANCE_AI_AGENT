const axios = require('axios');
require('dotenv').config();

console.log('🧪 InsureBot Pulse - Deployment Test');
console.log('=====================================');

// Test 1: Environment Variables
console.log('\n1️⃣ Testing Environment Variables...');
if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your-groq-api-key') {
    console.log('✅ GROQ_API_KEY configured');
} else {
    console.log('❌ GROQ_API_KEY not configured');
}

if (process.env.PORT) {
    console.log(`✅ PORT configured: ${process.env.PORT}`);
} else {
    console.log('❌ PORT not configured');
}

// Test 2: Server Health
console.log('\n2️⃣ Testing Server Health...');
async function testServer() {
    try {
        const response = await axios.get('http://localhost:3000/api/health');
        console.log('✅ Server is running');
        console.log(`📊 Status: ${response.data.status}`);
        console.log(`🔗 Connections: ${response.data.connections}`);
    } catch (error) {
        console.log('❌ Server not responding');
        console.log('💡 Make sure to run: npm start');
    }
}

// Test 3: Groq API
console.log('\n3️⃣ Testing Groq API...');
async function testGroqAPI() {
    try {
        const response = await axios.post('http://localhost:3000/api/summary', {
            transcript: 'Customer: I need help with my insurance policy. Agent: I understand your concern. Let me help you with that.'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('✅ Groq API working - Call summary generated');
        console.log(`📝 Summary: ${JSON.stringify(response.data.summary, null, 2)}`);
    } catch (error) {
        console.log('❌ Groq API test failed');
        console.log(`🔍 Error: ${error.response?.data?.error || error.message}`);
    }
}

// Test 4: Analytics
console.log('\n4️⃣ Testing Analytics...');
async function testAnalytics() {
    try {
        const response = await axios.get('http://localhost:3000/api/analytics');
        console.log('✅ Analytics endpoint working');
        console.log(`📈 Total calls: ${response.data.totalCalls}`);
        console.log(`⚡ Average latency: ${response.data.averageLatency}ms`);
    } catch (error) {
        console.log('❌ Analytics test failed');
    }
}

// Run all tests
async function runTests() {
    await testServer();
    await testGroqAPI();
    await testAnalytics();
    
    console.log('\n🎉 Deployment Test Complete!');
    console.log('🌐 Access your app at: http://localhost:3000');
    console.log('🎤 ElevenLabs Agent ID: agent_01k0k42wczf7ravzr0gmvsqbfn');
}

runTests().catch(console.error); 