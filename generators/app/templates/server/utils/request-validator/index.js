var Joi = require('joi');

var HttpError = require('../../utils/http-error');
const httpCodes = require('config').get('httpCodes');

let validate = function(schema) {
	return function(request, response, next){
		const body = request.body;
		const result = Joi.validate(body, schema);
		if (result.error === null){
			next();
		} else {
			next(new HttpError(httpCodes.badRequest, 'Parametros faltantes o invalidos en el request'));
		}
	}; 
};

module.exports = validate;