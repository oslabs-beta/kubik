const sessionController = {
  // Check if user is authenticated
  checkSession: (req, res) => {
    if (req.session.userId) {
      return res.status(200).send('Session valid');
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
