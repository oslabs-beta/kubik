const express = require('express');
const router = express.Router();
const clusterController = require('../controllers/clusterController');
const dashboardController = require('../controllers/dashboardController');
const chartController = require('../controllers/chartController');

router
  // Get cluster by ID
  .get(
    '/get/:clusterId',
    clusterController.getCluster,
    chartController.getChartUrls,
    (req, res) => {
      return res.status(200).json(res.locals.chartUrls);
    }
  )

  // Get clusters
  .get(
    '/get',
    clusterController.getCluster,
    chartController.getChartUrls,
    (req, res) => {
      return res.status(200).json(res.locals.chartUrls);
    }
  )

  // Add clusters
  .post(
    '/add',
    clusterController.addCluster,
    dashboardController.createDashboard,
    chartController.getChartUrls,
    (req, res) => {
      return res.status(201).json(res.locals.chartUrls);
    }
  )

  // Delete clusters
  .delete('/delete/:clusterId', clusterController.deleteCluster, (req, res) => {
    res.status(200).json(res.locals.updatedClusters);
  });

module.exports = router;
