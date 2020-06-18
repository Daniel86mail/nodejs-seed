const exampleController = require('../controllers/example.controller');
const cookieMiddleware = require('../middlewares/cookie.middleware');

module.exports = function (app) {
  app.get('/route',
    exampleController.get
  );

  app.post('/route',
    exampleController.save
  );
};
