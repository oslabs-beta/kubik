const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const clusterRouter = require('./clusterRouter');
// const grafanaRouter = require('./grafanaRouter');
const viewRouter = require('./viewRouter');

// User auth router
router.use('/auth', authRouter);

// Cluster router
router.use('/cluster', clusterRouter);

// View router for cluster map visualization
router.use('/view', viewRouter);

module.exports = router;
