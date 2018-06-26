const httpCodes = require('config').get('httpCodes');

var notFoundHandler = function(request, response, next) {
  response.status(httpCodes.notFound).send('Not Found');
};

module.exports = notFoundHandler;
