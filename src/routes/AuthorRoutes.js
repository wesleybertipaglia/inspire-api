const BaseRoute = require('./BaseRoutes');

const data = require('../data/authors.json');
const model = require('../models/Author');
const handleRoute = new BaseRoute(data, model);
const route = handleRoute.getRouter();

module.exports = route;