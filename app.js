'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Load environment variables from .env file.
require('dotenv-safe').load();

// Set environment
const environment = process.env.NODE_ENV || 'local';

const app = express();

console.info(`Loading node server, Environment ${app.get('env')}`);
// set the view engine to ejs
app.set('view engine', 'ejs');

// Load routes
app.use(bodyParser.json());
require('./src/routers/user.route')(app);
require('./src/routers/main.route')(app);
require('./src/databases/mongo.db');

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error(`Error launching service : ${err}`);
    throw  err;
  } else {
    console.info(`Server is listening on port: ${process.env.PORT}`);
  }
});

module.exports = app;
