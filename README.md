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
1. Create an example yaml file named "webapp-deploymment.yaml" to use a simple Nginx web server for the webapp with the following content:
  
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

2. Run the following terminal command to deploy the web server.

```bash
kubectl apply -f webapp-deployment.yaml
```

3. Create an example yaml file named "webapp-service.yaml" to create a service to expose the deployment with the following content:

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

4. Run the following terminal command to expose the web application's service.

```bash
kubectl apply -f webapp-service.yaml
```


## Contributing
Any contributions are always welcomed and appreciated!
* Fork the project.
* Create your feature branch.
* Create a pull request detailing the changes you would like to introduce.
* Create a new issue on GitHub.

## Our Team
* Branden Chi [GitHub](https://github.com/brandenchi) | [LinkedIn]()
* Felipe Varela [GitHub](https://github.com/var-ela) | [LinkedIn]()
* Sung Ku Kang [GitHub](https://github.com/sung-kang) | [LinkedIn]()
* Yvonne Tram [GitHub](https://github.com/yqtram) | [LinkedIn]()