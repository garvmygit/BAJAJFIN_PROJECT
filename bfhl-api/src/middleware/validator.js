const constants = require('../utils/constants');

class ValidatorMiddleware {
  validatePostRequest(req, res, next) {
    try {
      // Check if body exists and is an object
      if (!req.body || typeof req.body !== 'object') {
        throw new Error(constants.ERROR_MESSAGES.INVALID_REQUEST);
      }
      
      // Check for empty body
      if (Object.keys(req.body).length === 0) {
        throw new Error(constants.ERROR_MESSAGES.MISSING_KEY);
      }
      
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ValidatorMiddleware();