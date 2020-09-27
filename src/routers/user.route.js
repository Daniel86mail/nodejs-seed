const exampleController = require('../controllers/user.controller');
const cookieMiddleware = require('../middlewares/cookie.middleware');

module.exports = function (app) {
  app.get('/user/:id',
    exampleController.get
  );

  app.post('/user',
    exampleController.save
  );
};
