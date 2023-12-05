import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import deployImg from '../../assets/deploy.png';
import nodeImg from '../../assets/node.png';
import podImg from '../../assets/pod.png';
import svcImg from '../../assets/svc.png';
import logo from '../../assets/kubik-logo.png';
import ns from '../../assets/ns.png';
import Typography from '@mui/material/Typography';

let initialOptions = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#4682b4',
  },
  interaction: {
    hover: true,
  },
  configure: {
    enabled: false,
  },
  physics: {
    enabled: true,
  },
};

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
  const [graphOptions, setGraphOptions] = useState(initialOptions);
  const [graphKey, setGraphKey] = useState(0);

  // Event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setGraphKey((prevKey) => prevKey + 1);
    };
    window.addEventListener('resize', handleResize);
  }, []);

  const changeGraphOptions = () => {
    setGraphOptions((prevOptions) => ({
      ...prevOptions,
      layout: prevOptions.layout.hierarchical
        ? { randomSeed: '0.88888888888888888:8888888888888' }
        : { hierarchical: true },
    }));

    // Toggle the graphKey to force re-render
    setGraphKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };

  // Accept nodes, pods.name, services, deployments
  const processData = (clusterData) => {
    const nodes = [];
    const edges = [];

    const logoNode = {
      id: 'logo',
      label: '',
      title: 'Kubik',
      image: logo,
      shape: 'image',
      size: 45,
      Tooltip: {
        content: '<b>Kubik</b>',
      },
    };
    // nodes.push(logoNode);

    // Populate nodes for namespaces array
    // clusterData.namespaces.forEach((namespace, idx) => {
    //   nodes.push({
    //     id: `namespace-${idx}`,
    //     // label: `Namespace: ${namespace}`,
    //     label: '',
    //     title: `Namespace: ${namespace}`,
    //     image: ns,
    //     shape: 'image',
    //     size: 35,
    //     Tooltip: {
    //       content: `<b>Namespace:</b> ${namespace}`,
    //     },
    //   });
    // });

    // Populate nodes for nodes array
    clusterData.nodes.forEach((node, idx) => {
      nodes.push({
        id: `node-${idx}`,
        // label: `Node: ${node}`,
        label: '',
        title: `Node: ${node}`,
        image: nodeImg,
        shape: 'image',
        size: 30,
        Tooltip: {
          content: `<b>Node:</b> ${node}`,
        },
      });

      // Edges from logo to nodes
      // if (node.id !== 'logo') {
      //   edges.push({
      //     from: 'logo',
      //     to: `node-${idx}`,
      //     length: 700,
      //     arrows: 'to',
      //   });
      // }
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
        size: 30,
        Tooltip: {
          content: `<b>Pod:</b> ${pod}`,
        },
      });

      // Populate pod relationships in edge array
      const nodeIdx = clusterData.nodes.indexOf(pod.nodeName);
      const nsIdx = clusterData.namespaces.indexOf(pod.namespaceName);

      // // Nodes and namespaces (based on pod data)
      if (nsIdx !== -1 && nodeIdx !== -1) {
        edges.push({
          from: `namespace-${nsIdx}`,
          to: `node-${nodeIdx}`,
          length: 250,
          arrows: 'to',
        });

        // Pods and nodes
        edges.push({
          from: `node-${nodeIdx}`,
          to: `pod-${idx}`,
          length: 250,
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
        size: 30,
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
        size: 30,
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
    <div>Loading Kubernetes Cluster...</div>
  ) : (
    <div>
      {/* Content */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={changeGraphOptions}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: '10px',
            marginTop: '12px',
            zIndex: 1,
            borderRadius: '4px',
            background: 'rgba(108, 122, 137, 0.8)',
            padding: '8px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Switch Graph Type
        </button>

        <Graph
          key={graphKey}
          graph={clusterData}
          options={graphOptions}
          events={events}
          style={{ width: '100%', height: '100vh' }}
        />
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              maxWidth: '200px',
              background: 'rgba(108, 122, 137, 0.9)',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            <Typography
              style={{
                fontFamily: 'Roboto, sans-serif',
                color: 'white',
                fontSize: '13px',
              }}
            >
              {tooltipContent}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterView;
