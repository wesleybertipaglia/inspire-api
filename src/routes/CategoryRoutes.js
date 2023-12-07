const BaseRoute = require('./BaseRoutes');

const data = require('../data/categories.json');
const model = require('../models/Category');
const handleRoute = new BaseRoute(data, model);
const route = handleRoute.getRouter();

module.exports = route;