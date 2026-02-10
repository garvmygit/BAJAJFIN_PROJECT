const express = require('express');
const router = express.Router();
const bfhlController = require('../controllers/bfhlController');

// GET /bfhl - health check endpoint
router.get('/', bfhlController.getStatus);

// POST /bfhl - process fibonacci or prime filtering
router.post('/', bfhlController.processRequest);

module.exports = router;