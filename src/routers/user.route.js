const userController = require('../controllers/user.controller');
const cookieMiddleware = require('../middlewares/cookie.middleware');

module.exports = function (app) {
  app.get('/api/user/list',
  userController.getUsersList
  );

  app.get('/api/user/:id',
  userController.get
  );

  app.post('/api/user',
  userController.save
  );
};
