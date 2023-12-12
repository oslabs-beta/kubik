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
      return res.status(200).json(res.locals.user);
    }
  )

  // Login user
  .post(
    '/login',
    authController.login,
    bcryptController.verifyPassword,
    sessionController.addSession,
    (req, res) => {
      return res.status(200).json(res.locals.user);
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
      res.redirect('http://localhost:4444/main-page/home');
      return res.status(200).json(res.locals.user);
    }
  );

module.exports = router;
