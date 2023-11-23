const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcryptController = require('../controllers/bcryptController');

router
  // Signup route
  .post(
    '/signup',
    bcryptController.hashPassword,
    authController.signup,
    (req, res) => {
      return res.status(200).json(res.locals.user);
    }
  )

  // Login route
  .post(
    '/login',
    authController.login,
    bcryptController.verifyPassword,
    (req, res) => {
      return res.status(200).json(res.locals.user);
    }
  );

module.exports = router;
