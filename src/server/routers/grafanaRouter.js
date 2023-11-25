const express = require('express');
const router = express.Router();
// const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', (req, res) => {
  return res.status(200);
});
// .get('/dashboards', (req, res) => {
//   //
// });

module.exports = router;
