const swaggerJSDoc = require('swagger-jsdoc');
const swagger = require('swagger-tools');

module.exports = function (app, callback) {
  // def
  if (process.env.NODE_ENV !== 'production') {
    // define
    const pckg = require(__dirname + './../package.json');
    let swaggerDefinition = {
      info: {
        title: pckg.name,
        version: pckg.version,
        description: `Package Name : ${pckg.name}</br>Description`,
      },
      basePath: '/',
    };

    // initialize 
    let swaggerSpec = swaggerJSDoc({
      swaggerDefinition: swaggerDefinition,
      apis: ['./src/routers/*.js'],
    });

    const swaggerDoc = swaggerSpec;

    // route to serve swagger
    app.get('/swagger.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    swagger.initializeMiddleware(swaggerDoc, function (middleware) {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain		 +require('./config/swagger')(app);
      app.use(middleware.swaggerMetadata());
      // Validate Swagger requests		
      app.use(middleware.swaggerValidator());
      
      callback();
    })
  } else {
    callback();
  }
};