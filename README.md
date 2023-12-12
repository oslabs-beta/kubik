# Kubik

## Welcome to <b>Kubik</b>!

Kubik is an open-source Kubernetes visualization dashboard designed to give you an intuitive and efficient way to visualize the health and structure of your local Kubernetes clusters.

## Features

### Google OAuth 2.0

WRITE TEXT HERE

---DO WE NEED GIF HERE---???

### Manage Clusters

Add and name or delete your clusters.

---GIF GOES HERE---SHOW HOW TO ADD AND DELETE

### Metrics Visualization

View important metrics and graphs to monitor cluster health.

---GIF GOES HERE---SHOW THE GRAPHS PAGE

### 2D Cluster View

---GIF GOES HERE---CHANGE GRAPH TYPES

## Setup

1. Set up minikube, a local Kubernetes to get started with testing Kubik by following the minikube [documentation](https://minikube.sigs.k8s.io/docs/start/).

2. Install and configure Docker by following the Docker [documentation](https://www.docker.com/get-started/).

3. Create an example yaml file named "webapp-deploymment.yaml" to use a simple Nginx web server for the webapp with the following content:

webapp-deploymment.yaml:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
        - name: webapp-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

4. Run the following terminal command to deploy the web server.

```bash
kubectl apply -f webapp-deployment.yaml
```

5. Create an example yaml file named "webapp-service.yaml" to create a service to expose the deployment with the following content:

webapp-service.yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  selector:
    app: webapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort
```

6. Run the following terminal command to expose the web application's service.

```bash
kubectl apply -f webapp-service.yaml
```

7. Update the "webapp-service.yaml" file to include Prommetheus annotations. This allows your application to be discovered and scaped for metrics.

webapp-service.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '80'
spec:
  replicas: 2
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
        - name: webapp-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

8. Run the following terminal command to apply the changes.

```bash
kubectl apply -f webapp-deployment.yaml
```

9. Install helm by following the Helm [documentation](https://helm.sh/docs/intro/install/).

10. Deploy the Prometheus monitoring and alerting toolkit by running the following terminal command:

```bash
helm install prometheus prometheus-community/prometheus
```

11. Forward the Prometheus service from the 'default' namespace within your Kubernetes cluster to port 9090 on your local machine by executing the following terminal command:

```bash
kubectl port-forward svc/prometheus-server 9090:80 -n default
```

12. Install and log into Grafana by following the Grafana [documentation](https://grafana.com/docs/grafana/latest/setup-grafana/installation/).

13. Configure your grafana.ini by following the Grafana [documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/).

13a. Under the [security] section, change "allow_embedding" from "false" to "true". Restart Grafana.

14. Clone the repo.

15. Set up the .env file by using the .template.env file.

16. Install the dependencies by running the following command:

```bash
npm i
```

17. Run the application by running the following commands:

```bash
npm run dev
```

```bash
npm run server
```

18. Visit `http://localhost:[PORT]` in your browser.

EXTRA. INCLUDE GOOGLE OAUTH MAYBE INSTRUCTIONS LINK?????????????

## Contributing

Any contributions are always welcomed and appreciated!

- Fork the project.
- Create your feature branch.
- Create a pull request detailing the changes you would like to introduce.
- Create a new issue on GitHub.

## Our Team

- Branden Chi [GitHub](https://github.com/brandenchi) | [LinkedIn]()
- Felipe Varela [GitHub](https://github.com/var-ela) | [LinkedIn]()
- Sung Ku Kang [GitHub](https://github.com/sung-kang) | [LinkedIn]()
- Yvonne Tram [GitHub](https://github.com/yqtram) | [LinkedIn]()
