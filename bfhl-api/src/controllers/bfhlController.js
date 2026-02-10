const logger = require('../utils/logger');
const fibonacciService = require('../services/fibonacciService');
const primeService = require('../services/primeService');
const aiService = require('../services/aiService');

class BfhlController {
  async processRequest(req, res) {
    try {
      const body = req.body;
      const officialEmail = "garv1573.be23@chitkara.edu.in";
      
      // CASE 1: Fibonacci
      if (body.hasOwnProperty('fibonacci')) {
        const n = body.fibonacci;
        
        // Validate input
        if (typeof n !== 'number' || n < 0) {
          return res.status(400).json({
            is_success: false,
            error: "fibonacci must be a non-negative number"
          });
        }
        
        const fibonacciData = fibonacciService.generateFibonacci(n);
        
        const response = {
          is_success: true,
          official_email: officialEmail,
          data: fibonacciData
        };
        
        logger.info(`Fibonacci request processed for n=${n}`);
        return res.status(200).json(response);
      }
      
      // CASE 2: Prime filtering
      if (body.hasOwnProperty('prime')) {
        const primes = body.prime;
        
        // Validate input
        if (!Array.isArray(primes)) {
          return res.status(400).json({
            is_success: false,
            error: "prime must be an array"
          });
        }
        
        const filteredPrimes = primeService.filterPrimes(primes);
        
        const response = {
          is_success: true,
          official_email: officialEmail,
          data: filteredPrimes
        };
        
        logger.info(`Prime filter request processed for array of length ${primes.length}`);
        return res.status(200).json(response);
      }
      
      // CASE 3: AI Question
      if (body.hasOwnProperty('AI')) {
        const question = body.AI;
        
        // Validate input
        if (typeof question !== 'string' || question.trim() === '') {
          return res.status(400).json({
            is_success: false,
            error: "AI field must be a non-empty string"
          });
        }
        
        const aiAnswer = await aiService.askAI(question);
        
        const response = {
          is_success: true,
          official_email: officialEmail,
          data: aiAnswer
        };
        
        logger.info(`AI request processed for question: ${question.substring(0, 50)}...`);
        return res.status(200).json(response);
      }
      
      // If none of the valid fields are provided
      return res.status(400).json({
        is_success: false,
        error: "Request must contain either 'fibonacci', 'prime', or 'AI' field"
      });
      
    } catch (error) {
      logger.error('Error in BFHL controller:', error);
      res.status(400).json({
        is_success: false,
        error: error.message || 'Invalid request'
      });
    }
  }

  getStatus(req, res) {
    try {
      const response = {
        is_success: true,
        message: "BFHL API is working"
      };
      
      logger.info('BFHL health check successful');
      res.status(200).json(response);
    } catch (error) {
      logger.error('Error in BFHL health check:', error);
      res.status(500).json({
        is_success: false,
        error: 'Health check failed'
      });
    }
  }
}

module.exports = new BfhlController();