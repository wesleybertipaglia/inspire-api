const BaseRoute = require('./BaseRoutes');

const data = require('../data/quotes.json');
const model = require('../models/Quote');
const handleRoute = new BaseRoute(data, model);
const route = handleRoute.getRouter();

module.exports = route;