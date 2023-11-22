const bcrypt = require('bcrypt');

const bcryptController = {
  // Middleware for hashing password
  hashPassword: async (req, res, next) => {
    try {
      const BCRYPT_SALT_ROUNDS = 10;
      const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  },

  // Middleware for verifying password
  verifyPassword: async (req, res, next) => {
    try {
      const { user, password } = req;
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        // Return a generic error message
        return res.status(401).send('Invalid username or password');
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bcryptController;
