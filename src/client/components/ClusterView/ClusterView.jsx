import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import deployImg from '../../../assets/deploy.png';
import nodeImg from '../../../assets/node.png';
import podImg from '../../../assets/pod.png';
import svcImg from '../../../assets/svc.png';
import Tooltip from '@mui/material/Tooltip';

const ClusterView = () => {
  // Declare state variables
  const [clusterData, setClusterData] = useState({
    nodes: [],
    edges: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Accept nodes, pods.name, services, deployments
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
        Tooltip: {
          content: `<b>Node:</b> ${node}`,
        },
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
        Tooltip: {
          content: `<b>Pod:</b> ${pod}`,
        },
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
        Tooltip: {
          content: `<b>Service:</b> ${service}`,
        },
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
        Tooltip: {
          content: `<b>Deployment:</b> ${deployment}`,
        },
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
      // hierarchical: true,
      randomSeed: '0.88888888888888888:8888888888888',
    },
    edges: {
      color: '#4682b4',
    },
    height: '800px',
    interaction: {
      // zoomView: false, // disable zooming initially
      hover: true,
    },
    configure: {
      enabled: false,
    },
    physics: {
      enabled: true,
    },
  };

  // Event handling
  const handleNodeHover = (event) => {
    const {
      node,
      pointer: { DOM },
    } = event;
    let founded;
    if (node.length > 0) {
      clusterData.nodes.find((n) => {
        if (n.id === node) {
          founded = n;
        }
      });

      if (founded) {
        setTooltipContent(founded.title);
        setTooltipPosition({ x: DOM.x, y: DOM.y });
        setShowTooltip(true);
      }
    }
  };

  const handleNodeUnhover = () => {
    setShowTooltip(false);
  };

  const events = {
    hoverNode: handleNodeHover,
    blurNode: handleNodeUnhover,
  };

  return isLoading ? (
    <div style={{ height: '100%' }}>Loading Kubernetes Cluster...</div>
  ) : (
    <div>
      <Graph graph={clusterData} options={options} events={events} />
      {showTooltip && (
        <Tooltip title={tooltipContent} placement="top" arrow>
          <div
            style={{
              position: 'absolute',
              top: tooltipPosition.y,
              left: tooltipPosition.x,
            }}
          >
            {tooltipContent}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default ClusterView;
