const express = require('express');
const router = express.Router();

const serverName = require('config').get('name');

/**
 * Add here the routes for this server.
 */
router.get('/', (req, res, next) => { res.send(`${serverName} Works!`); });

module.exports = router;
