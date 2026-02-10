const OpenAI = require('openai');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    
    if (!this.apiKey) {
      logger.warn('OPENAI_API_KEY not configured in environment');
    }
    
    this.client = this.apiKey ? new OpenAI({ apiKey: this.apiKey }) : null;
  }

  /**
   * Ask OpenAI a question and get a clean text answer
   * @param {string} question - The question to ask
   * @returns {Promise<string>} - Clean text answer without markdown
   */
  async askAI(question) {
    try {
      if (!this.client || !this.apiKey) {
        throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY environment variable.');
      }

      // Ensure question is a string
      if (typeof question !== 'string' || question.trim() === '') {
        throw new Error('Question must be a non-empty string');
      }

      const message = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Answer questions concisely and clearly. Do not use markdown formatting. Provide plain text answers only.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      // Extract answer from response
      const answer = message.choices[0].message.content.trim();
      logger.info(`AI query processed successfully for question: ${question.substring(0, 50)}...`);
      return answer;
      
    } catch (error) {
      logger.error('Error in AIService.askAI:', error.message);
      throw new Error(`AI Service error: ${error.message}`);
    }
  }

  /**
   * Legacy method for backward compatibility
   */
  async getAIResponse(question) {
    return this.askAI(question);
  }
}

module.exports = new AIService();
