const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routers/router');
// const prometheus = require('prom-client');

const PORT = process.env.EXPRESS_PORT || 3020;
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client')));

// get request to root endpt, send index.html file as the response
app.get('/', (req, res) => {
  console.log('Backend and frontend linked');
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// routes
app.use('/auth', require('./routers/auth'));
app.use('/api/grafana', router);

// local error handler
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  // debugging
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message: message,
      status: statusCode,
      timestamp: new Date().toISOString(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});

module.exports = app;
