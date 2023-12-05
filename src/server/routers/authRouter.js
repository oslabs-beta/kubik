const express = require('express');
const passport = require('../config/passport');
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
  .post('/logout', authController.logout)

  // Google OAuth Routes
  .get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  .get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res, next) => {
      res.locals.user = req.user;
      return next();
    },
    sessionController.addSession,
    (req, res) => {
      res.redirect('http://localhost:4444/main-page/');
    }
  );

module.exports = router;
