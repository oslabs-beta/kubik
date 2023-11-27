const metrics = require('../dashboard/metricsIndex');

const chartController = {
  // Middleware for building chart URLs for the frontend
  getChartUrls: (req, res, next) => {
    const clusterUrl = res.locals.clusterUrl;
    const chartUrls = [];

    Object.values(metrics).forEach((metric) => {
      metric.panelId.forEach((id) => {
        const url = `${clusterUrl}/d-solo/${metric.uid}?panelId=${id}`;
        chartUrls.push(url);
      });
    });

    res.locals.chartUrls = chartUrls;
    return next();
  },
};

module.exports = chartController;
