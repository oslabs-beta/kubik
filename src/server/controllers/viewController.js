// import { ModelTraining } from '@mui/icons-material';
// import React, { useEffect, useState } from 'react';
const k8s = require('@kubernetes/client-node');

const viewController = {
  get: async (req, res, next) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    // TESTING
    const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

    try {
      const nodes = await k8sApi.listNode();
      const pods = await k8sApi.listPodForAllNamespaces();
      const services = await k8sApi.listServiceForAllNamespaces();
      const deployments = await appsV1Api.listDeploymentForAllNamespaces();

      // console.log('🚀🚀🚀deployments🚀🚀🚀', deployments);

      //////////////////////////// EDIT THIS PLEASE //////////////
      // const LOGGER = {
      //   nodes: nodes.body.items.map((node) => node.metadata.name),
      //   pods: pods.body.items.map((pod) => ({
      //     name: pod.metadata.name,
      //     nodeName: pod.spec.nodeName,
      //   })),
      //   services: services.body.items.map((service) => service.metadata.name),
      //   deployments: deployments.body.items.map(
      //     (deployment) => deployment.metadata.name
      //   ),
      // };

      // services.body.items.forEach((service, idx) => {
      //   console.log(idx, service.spec.selector);
      // });

      pods.body.items.forEach((pod, idx) => {
        console.log(idx, pod.metadata.labels);
      });

      // const LOGGER = services.body.items[1].spec.selector;

      // console.log('🚀🚀🚀LOGGER🚀🚀🚀', LOGGER);

      //////////////////////////// EDIT THIS PLEASE //////////////

      // change THIS
      // res.locals.YVONNE = LOGGER;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = viewController;
