import React from 'react';

const GrafanaDashboard = ({ grafanaDashboardUrl }) => (
  <div>
    <h1>Grafana Dashboard</h1>
    <iframe src={grafanaDashboardUrl} width="1200" height="900"></iframe>
  </div>
);

export default GrafanaDashboard;
