const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/get', viewController.get, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
