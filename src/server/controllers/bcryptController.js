const bcrypt = require('bcrypt');

const bcryptController = {
  // Middleware for hashing password
  hashPassword: async (req, res, next) => {
    try {
      const BCRYPT_SALT_ROUNDS = 10;
      const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

      req.body.password = await bcrypt.hash(req.body.password, salt);
      return next();
    } catch (error) {
      return next(error);
    }
  },

  // Middleware for verifying password
  verifyPassword: async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { password } = req.body;
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).send('Invalid username or password');
      }

      return next();
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = bcryptController;
