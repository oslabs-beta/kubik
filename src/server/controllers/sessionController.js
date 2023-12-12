const User = require('../models/userModel');

const sessionController = {
  // Check if user is authenticated
  checkSession: async (req, res) => {
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);

      if (!user) {
        return res.status(401).send('Invalid user');
      }

      return res.status(200).send(user);
    } else {
      return res.status(401).send('Unauthorized: No active session');
    }
  },

  // Add session if authenticated
  addSession: (req, res, next) => {
    if (res.locals.user && res.locals.user._id) {
      req.session.userId = res.locals.user._id;

      return next();
    } else {
      res
        .status(400)
        .send('User data not found, unable to establish a session');
    }
  },
};

module.exports = sessionController;
