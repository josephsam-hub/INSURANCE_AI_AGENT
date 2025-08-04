// Test script to verify InsureBot Pulse setup
const fs = require('fs');
const path = require('path');

console.log('🔍 InsureBot Pulse - Setup Verification');
console.log('=====================================\n');

// Check if .env file exists
if (fs.existsSync('.env')) {
    console.log('✅ .env file found');
    const envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('GROQ_API_KEY=gsk_')) {
        console.log('✅ Groq API key configured');
    } else {
        console.log('❌ Groq API key not found in .env');
    }
} else {
    console.log('❌ .env file not found');
}

// Check if package.json exists
if (fs.existsSync('package.json')) {
    console.log('✅ package.json found');
} else {
    console.log('❌ package.json not found');
}

// Check if all required files exist
const requiredFiles = [
    'index.html',
    'style.css', 
    'script.js',
    'server.js'
];

console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} missing`);
    }
});

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
    console.log('\n✅ Dependencies installed (node_modules found)');
} else {
    console.log('\n⚠️  Dependencies not installed (node_modules missing)');
    console.log('   Run: npm install');
}

console.log('\n🚀 To start the server:');
console.log('   npm start');
console.log('   or');
console.log('   node server.js');
console.log('\n🌐 Then open: http://localhost:3000'); 