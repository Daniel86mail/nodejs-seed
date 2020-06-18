const mongoose = require('mongoose');

console.info(`Adding models`);
require('./models/test')(mongoose);

module.exports = {
  mongoose,
  models: mongoose.models
};
