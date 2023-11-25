const express = require('express');
const router = express.Router();
// const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', (req, res) => {
  return res.status(200);
});

router.get('/dashboard', (req, res) => {
  res.json({
    grafanaDashboardUrl:
      'http://localhost:3000/d/rYdddlPWk/node-exporter-full?orgId=1',
  });
});

// .get('/dashboards', (req, res) => {
//   //
// });

module.exports = router;
