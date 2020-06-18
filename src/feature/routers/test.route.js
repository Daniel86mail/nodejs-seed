const testController = require('../controllers/test.controller');

module.exports = function (app) {

/**
 * @swagger
 * /test1:
 *   get:
 *     tags:
 *       - Test
 *     description: Returns something
 *     responses:
 *       200:
 *         description: ok
 *  
 */
  app.get('/test1',
    testController.test1);
};
