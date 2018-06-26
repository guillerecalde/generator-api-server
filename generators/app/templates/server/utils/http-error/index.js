var httpCodes = require('config').get(httpCodes);

function HttpError(statusCode, errorMessage) {
  // Sometimes a request returns a success code even if there
  // was an error, for those cases we replace the status code.
	this.statusCode = (statusCode !== httpCodes.success) ? statusCode : httpCodes.badRequest;
	this.errorMessage = errorMessage;
}

module.exports = HttpError;