const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();
// import cookieParser from 'cookie-parser';
// const prometheus = require('prom-client');

connectDB();
const PORT = process.env.EXPRESS_PORT || 3020;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser);

app.use(express.static(path.resolve(__dirname, '../assets')));

// routes
app.use('/auth', require('./endpoints/auth'));

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
