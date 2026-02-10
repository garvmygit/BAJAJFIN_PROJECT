const express = require('express');
const router = express.Router();
const bfhlRoutes = require('./bfhl');
const healthRoutes = require('./health');

// Mount sub-routes
router.use('/bfhl', bfhlRoutes);
router.use('/health', healthRoutes);

module.exports = router;