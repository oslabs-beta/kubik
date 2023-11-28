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

      const getsvcPodRelation = () => {
        // services.spec.selector
        // 1 {
        //   'app.kubernetes.io/instance': 'prometheus',
        //   'app.kubernetes.io/name': 'alertmanager'
        // }
        // 2 {
        //   'app.kubernetes.io/instance': 'prometheus',
        //   'app.kubernetes.io/name': 'alertmanager'
        // }
        // MATCH ABOVE WITH pods.metadata.labels
      };

      const mapSvcPod = (podLabels, svcSelector) => {
        for (const key of Object.keys(svcSelector)) {
          if (!podLabels[key] || podLabels[key] !== svcSelector[key])
            return false;
        }

        return true;
      };

      // gpt
      // const mapSvcPod = (podLabels, svcSelector) => {
      //   return Object.keys(svcSelector).every(
      //     (key) => podLabels[key] === svcSelector[key]
      //   );
      // };

      ////////////// fetch k8s data //////////////
      const LOGGER = {
        nodes: nodes.body.items.map((node) => node.metadata.name),
        pods: pods.body.items.map((pod) => ({
          name: pod.metadata.name,
          nodeName: pod.spec.nodeName,
        })),
        services: {
          name: services.body.items.map((service) => service.metadata.name),
          svcPodRelation: getsvcPodRelation(),
        },
        deployments: deployments.body.items.map(
          (deployment) => deployment.metadata.name
        ),
      };

      pods.body.items.forEach((pod, idx) => {
        console.log(idx, pod.metadata.labels);
      });

      res.locals.data = LOGGER;
      return next();
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = viewController;
