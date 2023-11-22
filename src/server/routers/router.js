const express = require('express');
const router = express.Router();
// import clusterRouter from './clusterRouter';
const grafanaService = require('..services/grafanaService');
const dashboardController = require('./dashboardController');

// // cluster router
// router.use('/cluster', clusterRouter);

// dashboard router
router.get('/grafana/dashboard/:uid', async (req, res) => {
  const dashboardUid = req.params.uid;

  try {
    const dashboard = await grafanaService.fetchGrafanaDashboard(dashboardUid);
    res.json(dashboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Grafana dashboard' });
  }
});

router.get('/grafana/dashboards', async (req, res) => {
  try {
    const dashboardUIds = await dashboardController.getDashboards();
    res.json(dashboardUIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Grafana dashboards' });
  }
});

module.exports = router;
