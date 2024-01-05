var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var controllers = require('../controllers');
var middlewares = require('../middlewares');

/* GET home page. */
helpers.setupPageRoute(router, '/', [middlewares.user.requireLogin], controllers.pages.getHomePage)
helpers.setupPageRoute(router, '/login', [], controllers.pages.login)

helpers.setupPageRoute(router, '/app/user', [middlewares.user.requireLogin], controllers.pages.user)
helpers.setupPageRoute(router, '/app/user/request', [middlewares.user.requireLogin], controllers.pages.request)

helpers.setupPageRoute(router, '/app/delivery', [middlewares.user.requireLogin], controllers.pages.delivery)
helpers.setupPageRoute(router, '/app/delivery/dashboard', [middlewares.user.requireLogin], controllers.pages.deliverydashboard)

module.exports = router;
