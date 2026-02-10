module.exports = {
  RESPONSE_STRUCTURE: {
    SUCCESS: {
      is_success: true,
      official_email: "your_email@chitkara.edu.in" // Replace with your email
    },
    ERROR: {
      is_success: false
    }
  },
  
  HTTP_STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  
  ERROR_MESSAGES: {
    INVALID_REQUEST: "Invalid request structure",
    MISSING_KEY: "Request must contain exactly one of: fibonacci, prime, lcm, hcf, AI",
    INVALID_FIBONACCI: "Fibonacci input must be a positive integer",
    INVALID_PRIME: "Prime input must be an array of integers",
    INVALID_LCM: "LCM input must be an array of positive integers",
    INVALID_HCF: "HCF input must be an array of positive integers",
    INVALID_AI: "AI input must be a non-empty string",
    AI_SERVICE_ERROR: "AI service temporarily unavailable",
    INTERNAL_ERROR: "Internal server error"
  },
  
  AI_CONFIG: {
    PROVIDER: "google", // google, openai, or anthropic
    MAX_TOKENS: 50,
    TEMPERATURE: 0.7
  }
};