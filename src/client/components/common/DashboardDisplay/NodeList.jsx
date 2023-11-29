import React, { useState } from 'react';

const NodeList = ({ props }) => {
  const [selectedNode, setSelectedNode] = useState([
    {
      index: '',
      name: '',
      status: '',
      role: '',
      age: '',
      version: '',
      internalIp: '',
      externalIp: '',
      osImage: '',
      kernal: '',
      containerRuntime: '',
      nodeCpuUsed: '',
      nodeCpuLimit: '',
      nodeCpuPercent: '',
      nodeCpuPercentMath: '',
      nodeMemoryUsed: '',
      nodeMemoryUsedDisplay: '',
      nodeMemoryLimit: '',
      nodeMemoryPercent: '',
    },
  ]);
};

export default NodeList;
