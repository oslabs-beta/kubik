import grafanaService from '../services/grafanaService';

const createErrorObject = (err) => {
  return {
    log: 'Error in dashboardController',
    message: { err: `An error occurred ${err}` },
  };
};

const dashboardController = {
  // get dashboard uid from grafana
  getDashboards: async (url) => {
    // credentials for grafana api access
    const username = 'admin';
    const password = 'prom-operator';

    // encode credentials
    const credentials = `${username}:${password}`;
    const buffer = Buffer.from(credentials, 'utf-8');
    const encodedCredentials = buffer.toString('base64');

    // dashboard names to search for in grafana
    const dashboards = {
      apiServerUId: 'apiServer',
      kubeStateMetricUId: 'kubeStateMetric',
      kubePrometheusUId: 'kubePrometheus',
      nodeExporterUId: 'nodeExporter',
    };

    // call the fetchGrafana function to get dashboard uids
    const dashboardUIds = await fetchGrafana();
    console.log(dashboardUIds);
    return dashboardUIds;

    // fetch dashboard UIds from grafana
    async function fetchGrafana() {
      const dashboardUIds = {};

      // iterate thru dashboard names
      for (const k in dashboards) {
        try {
          const dashboard = await grafanaService.fetchGrafanaDashboard(
            dashboards[k]
          );
          dashboardUIds[k] = dashboard.id;
        } catch (err) {
          return createErrorObject(err);
        }
      }
      // return dashboard uids object
      return dashboardUIds;
    }
  },
};

export default dashboardController;