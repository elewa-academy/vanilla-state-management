var routes = require('./routes');
var auth = require('./auth');

var express = require('express');
var data_api = express.Router();

var cors = require('cors')

data_api.use(cors())
data_api.use(auth);
data_api.use(routes);

module.exports = data_api;