// const ClusterMap = () => {
//   //useEffect for backend call
//   return <div>This is ClusterMap page 🫡🫡🫡</div>;
// };

// export default ClusterMap;

import React, { useEffect, useState } from 'react';

const ClusterMap = () => {
  const [podData, setPodData] = useState([]);

  const fetchData = async () => {
    try {
      // k8s cluster ip and port
      const clusterIP = '127.0.0.1';
      const clusterPort = '62392';

      const apiEndpoint = `http://${clusterIP}:${clusterPort}/api/v1/pods`;
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setPodData(data.items);
    } catch (error) {
      console.error('Error fetching pod data:', error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  console.log('fetched pod data', podData);

  return (
    <div>
      <h1>Pod Cluster</h1>
      <div>
        {podData.map((pod) => (
          <div key={pod.metadata.name}>
            <h3>{pod.metadata.name}</h3>
            <p>Namespace: {pod.metadata.namespace}</p>
            <p>Status: {pod.status.phase}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterMap;
