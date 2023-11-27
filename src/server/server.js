const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const router = require('./routers/router');
require('dotenv').config();

const PORT = process.env.EXPRESS_PORT || 3020;
const app = express();
connectDB();

app.use(
  cors({
    origin: 'http://localhost:4444',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(
  session({
    // exposed secret
    secret: 'secretSanta',
    resave: false,
    saveUninitialized: false,
    name: 'kubik_sid',
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: process.env.MONGO_NAME,
      collection: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check session
app.get('/', require('./controllers/sessionController').checkSession);

// needs directory check
app.use(express.static(path.resolve(__dirname, '../client')));

// needs edit
// get request to root endpt, send index.html file as the response
// app.get('/', (req, res) => {
//   console.log('Backend and frontend linked');
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });

// routes
app.use('/api', router);

// local error handler
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  // debugging
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
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
