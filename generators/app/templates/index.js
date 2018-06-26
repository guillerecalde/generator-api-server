const config = require('config');

const server = require('./server');

server.create(config.get('server'));
server.start();
