const constants = require('../utils/constants');
const Helpers = require('../utils/helpers');

class ValidationService {
  validateRequest(body) {
    const keys = Object.keys(body);
    const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
    
    // Check if exactly one valid key exists
    const presentKeys = keys.filter(key => validKeys.includes(key));
    
    if (presentKeys.length !== 1) {
      throw new Error(constants.ERROR_MESSAGES.MISSING_KEY);
    }

    const key = presentKeys[0];
    const value = body[key];

    switch (key) {
      case 'fibonacci':
        if (!Helpers.validatePositiveInteger(value)) {
          throw new Error(constants.ERROR_MESSAGES.INVALID_FIBONACCI);
        }
        break;
        
      case 'prime':
        if (!Helpers.validateIntegerArray(value)) {
          throw new Error(constants.ERROR_MESSAGES.INVALID_PRIME);
        }
        break;
        
      case 'lcm':
      case 'hcf':
        if (!Helpers.validateIntegerArray(value) || value.length === 0) {
          throw new Error(constants.ERROR_MESSAGES[`INVALID_${key.toUpperCase()}`]);
        }
        break;
        
      case 'AI':
        if (typeof value !== 'string' || value.trim().length === 0) {
          throw new Error(constants.ERROR_MESSAGES.INVALID_AI);
        }
        break;
    }

    return { key, value };
  }
}

module.exports = new ValidationService();