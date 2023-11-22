const fetch = require('node-fetch');
const config = require('../config');

const fetchGrafanaDashboard = async (dashboardUid) => {
  const { url, username, password } = config.grafana;
  const credentials = `${username}:${password}`;
  const buffer = Buffer.from(credentials, 'utf-8');
  const encodedCredentials = buffer.toString('base64');

  const response = await fetch(`${url}/api/dashboards/uid/${dashboardUid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    },
  });

  const data = await response.json();
  return data.dashboard;
};

module.exports = {
  fetchGrafanaDashboard,
};
