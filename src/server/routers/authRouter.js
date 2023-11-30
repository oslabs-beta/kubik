const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcryptController = require('../controllers/bcryptController');
const sessionController = require('../controllers/sessionController');

router
  // Signup user
  .post(
    '/signup',
    bcryptController.hashPassword,
    authController.signup,
    sessionController.addSession,
    (req, res) => {
      return res.status(200).json(res.locals.user.username);
    }
  )

  // Login user
  .post(
    '/login',
    authController.login,
    bcryptController.verifyPassword,
    sessionController.addSession,
    (req, res) => {
      return res.status(200).json(res.locals.user.username);
    }
  )

  // Logout user
  .post('/logout', authController.logout);

module.exports = router;
