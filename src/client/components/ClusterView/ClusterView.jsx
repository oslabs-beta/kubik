import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import deployImg from '../../../assets/deploy.png';
import nodeImg from '../../../assets/node.png';
import podImg from '../../../assets/pod.png';
import svcImg from '../../../assets/svc.png';

const ClusterView = () => {
  // declare state variables
  const [clusterData, setClusterData] = useState({
    nodes: [],
    edges: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // accept nodes, pods.name, services, deployments
  const processData = (clusterData) => {
    const nodes = [];
    const edges = [];

    // Populate nodes for nodes array
    clusterData.nodes.forEach((node, idx) => {
      nodes.push({
        id: `node-${idx}`,
        // label: `Node: ${node}`,
        label: '',
        title: `Node: ${node}`,
        image: nodeImg,
        shape: 'image',
      });
    });

    // Populate pods for nodes array
    clusterData.pods.forEach((pod, idx) => {
      nodes.push({
        id: `pod-${idx}`,
        // label: `Pod: ${pod.name}`,
        label: '',
        title: `Pod: ${pod.name}`,
        image: podImg,
        shape: 'image',
      });

      // Populate pods/nodes relationship in edge array
      const nodeIdx = clusterData.nodes.indexOf(pod.nodeName);
      if (nodeIdx !== -1) {
        edges.push({
          from: `node-${nodeIdx}`,
          to: `pod-${idx}`,
          length: 250, // custom length
          arrows: 'to',
        });
      }
    });

    // Populate services for nodes array
    clusterData.services.forEach((service, idx) => {
      nodes.push({
        id: `service-${idx}`,
        // label: `Service: ${service}`,
        label: '',
        title: `Service: ${service}`,
        image: svcImg,
        shape: 'image',
      });

      // Populate servives/pod relationships in edges array
      clusterData.servicesPodRelation[service].forEach((podName) => {
        const podIdx = clusterData.pods.findIndex(
          (pod) => pod.name === podName
        );
        if (podIdx !== -1) {
          edges.push({
            from: `service-${idx}`,
            to: `pod-${podIdx}`,
            length: 250,
            arrows: 'to',
          });
        }
      });
    });

    // Populate deployments in nodes array
    clusterData.deployments.forEach((deployment, idx) => {
      nodes.push({
        id: `deployment-${idx}`,
        // label: `Deployment: ${deployment}`,
        label: '',
        title: `Deployment: ${deployment}`,
        image: deployImg,
        shape: 'image',
      });

      // Deployment/Pod
      clusterData.pods.forEach((pod, podIdx) => {
        if (pod.name.includes(deployment))
          edges.push({
            from: `deployment-${idx}`,
            to: `pod-${podIdx}`,
            length: 250,
            arrows: 'to',
          });
      });
    });

    return {
      nodes,
      edges,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3020/api/view/get');
        const data = await response.json();
        setClusterData(processData(data)); // returns {nodes: [nodes], edges: [edges]}
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '800px',
    interaction: {
      zoomView: false, // disable zooming initially
    },
    configure: {
      enabled: false,
    },
    physics: {
      enabled: true,
    },
  };

  return isLoading ? (
    <div style={{ height: '100%' }}>Loading Kubernetes Cluster...</div>
  ) : (
    <Graph graph={clusterData} options={options} />
  );
};

export default ClusterView;
