const axios = require('axios');

const baseUrl = require('config').get('ordsProxy.url');
const HttpError = require('../../utils/http-error');

const proxyRequest = (routeService, body, methodService) =>{
  return axios({
    method: methodService,
    url: `${baseUrl}/${routeService}`,
    data: body
    }).then((response) => {
        return response.data;
    })
      .catch((error) => {
        const response = error.response.data;
        throw(new HttpError(response.statusCode, response.errorMessage));
      });
};

module.exports = proxyRequest;