var routes = require('./routes');
var auth = require('./auth');

var express = require('express');
var data_api = express.Router();

var body_parser = require('body-parser');
var cors = require('cors')

data_api.use(body_parser.urlencoded({extended: true}))
data_api.use(body_parser.json())
data_api.use(cors())
data_api.use(auth);
data_api.use(routes);

module.exports = data_api;