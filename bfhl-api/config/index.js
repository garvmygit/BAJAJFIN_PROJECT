// Configuration settings
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  
  response: {
    officialEmail: process.env.OFFICIAL_EMAIL || "garv1573.be23@chitkara.edu.in", // REPLACE WITH YOUR EMAIL
    version: "1.0.0"
  },
  
  app: {
    name: "BFHL API Server",
    description: "Bajaj Finserv Health API Test Solution"
  },
  
  ai: {
    provider: process.env.AI_PROVIDER || 'google',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    timeout: 10000
  }
};