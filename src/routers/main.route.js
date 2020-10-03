const mainController = require('../controllers/home.controller');

module.exports = function (app) {
  app.get('*',
   mainController.index
  );
};
