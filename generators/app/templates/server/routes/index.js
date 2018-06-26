const apiRoutes = require('./api');
const errorHandler = require('../middlewares/error-handler');
const notFoundHandler = require('../middlewares/not-found-handler');

const init = function(server) {
  /**
   * Init here the routes for this server.
   * In this place you can specify the base url for all routes.
   */
  server.use('/', apiRoutes);

  /**
   * Server middlewares
   */
  server.use(errorHandler);
  server.use(notFoundHandler);
};

module.exports = {
  init: init
};
