const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routers/router');
const connectDB = require('./config/db');

// const prometheus = require('prom-client');

const PORT = process.env.EXPRESS_PORT || 3020;
const app = express();

connectDB();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

// routes
// app.use('/auth', require('./endpoints/auth'));

// get request to root endpt, send index.html file as the response
app.get('/', (req, res) => {
  console.log('Backend and frontend linked');
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// // general server routing
// app.use('/api', router);

// grafana route
app.use('/api/grafana', router);

// local error handler
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: err },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('ERROR: ', errorObj.log);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});
// app.use((err, req, res, next) => {
//   // debugging
//   console.error(err.stack);

//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';

//   res.status(statusCode).json({
//     error: {
//       message: message,
//       status: statusCode,
//       timestamp: new Date().toISOString(),
//     },
//   });
// });

app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});

module.exports = app;
