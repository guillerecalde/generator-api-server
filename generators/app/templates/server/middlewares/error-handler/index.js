const httpCodes = require('config').get('httpCodes');

var errorHandler = function(error, request, response, next) {
  response.status(error.statusCode || httpCodes.error);
  response.send(error);
};

module.exports = errorHandler;
