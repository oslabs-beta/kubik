import React from 'react';

const MetricIframe = ({ uid, panelId, heightVal }) => {
  const baseUrl = 'http://localhost:3000';

  return (
    <iframe
      src={`${baseUrl}/d-solo/${uid}?panelId=${panelId}&refresh=30s`}
      width="100%"
      height={heightVal}
    ></iframe>
  );
};

export default MetricIframe;

// http:localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701758867566&to=1701845267566&panelId=20
