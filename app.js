'use strict';

const express = require('express');

// Load environment variables from .env file.
require('dotenv-safe').load();

// Set environment
const environment = process.env.NODE_ENV || 'local';

const app = express();

console.info(`Loading node server, Environment ${app.get('env')}`);

// Load routes
require('./src/feature/routers/test.route')(app);
require('./src/routers/example.route')(app);

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error(`Error launching service : ${err}`);
    throw  err;
  } else {
    console.info(`Server is listening on port: ${process.env.PORT}`);
  }
});

module.exports = app;
