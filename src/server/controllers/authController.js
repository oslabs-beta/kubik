const User = require('../models/userModel');

const authController = {
  // Middleware for existing user login
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send('Username and password are required');
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).send('Invalid username or password');
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  },

  // Middleware for new user signup
  signup: async (req, res, next) => {
    try {
      const { firstName, lastName, username, password } = req.body;

      if (!firstName || !lastName || !username || !password) {
        return res.status(400).send('Missing required fields');
      }

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).send('Username already exists');
      }

      const user = await User.create({
        firstName,
        lastName,
        username,
        password,
      });

      res.locals.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  },

  // Middleware for user logout
  logout: (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).send('Error logging out');
        } else {
          res.clearCookie('kubik_sid');
          res.send('Logged out successfully');
        }
      });
    } else {
      res.status(200).send('No active session to log out from');
    }
  },
};

module.exports = authController;
