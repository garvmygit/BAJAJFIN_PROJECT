const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

class SecurityMiddleware {
  constructor() {
    this.limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: {
        is_success: false,
        error: 'Too many requests from this IP, please try again later.'
      }
    });
  }

  setupSecurity(app) {
    // Basic security headers
    app.use(helmet());
    
    // CORS configuration
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      next();
    });
    
    // Apply rate limiting to all requests
    app.use(this.limiter);
    
    // Request logging
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next();
    });
  }
}

module.exports = new SecurityMiddleware();