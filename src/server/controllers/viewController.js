const k8s = require('@kubernetes/client-node');

const viewController = {
  // Middleware for buillding Kubernetes cluster data
  get: async (req, res, next) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

    try {
      const namespaces = await k8sApi.listNamespace();
      const nodes = await k8sApi.listNode();
      const pods = await k8sApi.listPodForAllNamespaces();
      const services = await k8sApi.listServiceForAllNamespaces();
      const deployments = await appsV1Api.listDeploymentForAllNamespaces();

      // Map corresponding namespaces and nodes
      const nsPodRelation = namespaces.body.items.reduce(
        (accumulator, namespace) => {
          const matchingPods = pods.body.items
            .filter((pod) => pod.metadata.namespace === namespace.metadata.name)
            .map((pod) => pod.metadata.name);

          accumulator[namespace.metadata.name] === matchingPods;
          return accumulator;
        },
        {}
      );

      // Map corresponding pods and services
      const svcPodRelation = services.body.items.reduce(
        (accumulator, service) => {
          const matchingPods = pods.body.items
            .filter((pod) => {
              const podLabels = pod.metadata.labels;
              const svcSelector = service.spec.selector;

              if (!podLabels || !svcSelector) return false;

              return Object.keys(svcSelector).every(
                (key) => podLabels[key] === svcSelector[key]
              );
            })
            .map((pod) => pod.metadata.name);

          accumulator[service.metadata.name] = matchingPods;
          return accumulator;
        },
        {}
      );

      // Fetch Kubernetes cluster data
      res.locals.data = {
        namespaces: namespaces.body.items.map(
          (namespace) => namespace.metadata.name
        ),
        nodes: nodes.body.items.map((node) => node.metadata.name),
        pods: pods.body.items.map((pod) => ({
          name: pod.metadata.name,
          nodeName: pod.spec.nodeName,
          namespaceName: pod.metadata.namespace,
        })),
        namespacePodRelation: nsPodRelation,
        services: services.body.items.map((service) => service.metadata.name),
        servicesPodRelation: svcPodRelation,
        deployments: deployments.body.items.map(
          (deployment) => deployment.metadata.name
        ),
      };

      return next();
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = viewController;
