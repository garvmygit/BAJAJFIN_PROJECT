const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('', routes);

// 404 handler - must come after all routes
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Endpoint not found"
  });
});

// Error handling middleware - must come last
app.use(errorHandler.handleError);

module.exports = app;