const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const clusterRouter = require('./clusterRouter');
const grafanaRouter = require('./grafanaRouter');

// User auth router
router.use('/auth', authRouter);

// cluster router
router.use('/cluster', clusterRouter);

// grafana dashboard router
router.use('/dashboard', grafanaRouter);

module.exports = router;
