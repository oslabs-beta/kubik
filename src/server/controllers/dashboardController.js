const dashboards = require('../dashboard/dashboardIndex');

const dashboardController = {
  // Middleware for creating user dashboards
  createDashboard: async (req, res, next) => {
    const clusterUrl = res.locals.clusterUrl;
    const username = 'admin';
    const password = 'admin';

    const encodedCredentials = Buffer.from(
      `${username}:${password}`,
      `utf-8`
    ).toString('base64');

    try {
      for (const dashboard of Object.values(dashboards)) {
        await fetch(`${clusterUrl}/api/dashboards/db`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
          },
          body: JSON.stringify({ dashboard: dashboard, overwrite: false }),
        });
      }

      return next();
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = dashboardController;
