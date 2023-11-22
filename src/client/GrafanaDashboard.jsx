import React, { useEffect, useState } from 'react';

const GrafanaDashboard = ({ dashboardUid }) => {
  const [dashboardUrl, setDashboardUrl] = useState('');

  useEffect(() => {
    // Assuming your backend is running on the same host/port
    const baseUrl = 'http://localhost:3020/api/grafana/dashboard';
    setDashboardUrl(`${baseUrl}/${dashboardUid}`);
  }, [dashboardUid]);

  return (
    <div>
      <h2>Grafana Dashboard</h2>
      {dashboardUrl && (
        <iframe
          src={dashboardUrl}
          width="800"
          height="600"
          title="Grafana Dashboard"
        ></iframe>
      )}
    </div>
  );
};

export default GrafanaDashboard;
