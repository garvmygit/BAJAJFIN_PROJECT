const constants = require('../utils/constants');
const logger = require('../utils/logger');

class ErrorHandler {
  // Catch 404 and forward to error handler
  notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  }

  // Main error handler
  handleError(err, req, res, next) {
    logger.error('Error Handler:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method
    });

    const statusCode = res.statusCode === 200 ? 
      constants.HTTP_STATUS.BAD_REQUEST : res.statusCode;
    
    const response = {
      ...constants.RESPONSE_STRUCTURE.ERROR,
      error: err.message || constants.ERROR_MESSAGES.INTERNAL_ERROR
    };

    // Don't expose stack trace in production
    if (process.env.NODE_ENV !== 'production') {
      response.stack = err.stack;
    }

    res.status(statusCode).json(response);
  }
}

module.exports = new ErrorHandler();