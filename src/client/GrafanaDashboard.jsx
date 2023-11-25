import React from 'react';

const GrafanaDashboard = ({ grafanaDashboardUrl }) => (
  <div>
    <h1>Grafana Dashboard</h1>
    <iframe src={grafanaDashboardUrl} width="100%" height="900"></iframe>
  </div>
);

export default GrafanaDashboard;
