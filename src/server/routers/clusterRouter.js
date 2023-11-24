const express = require('express');
const router = express.Router();
const clusterController = require('../controllers/clusterController');

router
  // Get clusters
  .get('/get', clusterController.getCluster, (req, res) => {
    return res.status(200).json(res.locals.clusters);
  })

  // Add clusters
  .post('/add', clusterController.addCluster, (req, res) => {
    return res.status(201).json(res.locals.newCluster);
  })

  // Delete clusters
  .delete('/delete/:clusterId', clusterController.deleteCluster, (req, res) => {
    res.status(200).json(res.locals.updatedClusters);
  });

module.exports = router;
