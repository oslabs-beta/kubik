const express = require('express');
const path = require('path');
const prometheus = require('prom-client');
const dotenv = require('dotenv');
// import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 3020;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser);

app.use(express.static(path.resolve(__dirname, '../assets')));

// enable a collection of default metrics
prometheus.collectDefaultMetrics();

const httpRequestCount = new prometheus.Counter({
  name: 'webapp_http_requests_total',
  help: 'Total number of HTTP requests',
});

app.get('/', (req, res) => {
  // Increment the custom metric on each request
  httpRequestCount.inc();

  res.send('Hello World!');
});

app.get('/metrics', (req, res) => {
  // Expose metrics for Prometheus to scrape
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});
