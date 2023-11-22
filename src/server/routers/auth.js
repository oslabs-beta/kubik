const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcryptController = require('../middlewares/bcrypt');

router
  // Signup route
  .post('/signup', bcryptController.hashPassword, async (req, res, next) => {
    try {
      const { firstName, lastName, username, password } = req.body;

      if (!firstName || !lastName || !username || !password) {
        return res.status(400).send('Missing required fields');
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }

      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      next(error);
    }
  })
  // Login route
  .post(
    '/login',
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).send('Invalid username or password');
        }

        req.user = user;
        req.password = password;
        next();
      } catch (error) {
        next(error);
      }
    },
    bcryptController.verifyPassword,
    (req, res) => {
      res.send('Success');
    }
  );

module.exports = router;
