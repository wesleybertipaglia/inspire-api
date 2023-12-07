const express = require('express');
const server = express();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
const indexRoute = require('./src/app');
const quotesRoutes = require('./src/routes/QuoteRoutes');
const authorsRoutes = require('./src/routes/AuthorRoutes');
const categoriesRoutes = require('./src/routes/CategoryRoutes');

server.use('/', indexRoute);
server.use('/quotes', quotesRoutes);
server.use('/authors', authorsRoutes);
server.use('/categories', categoriesRoutes);

server.listen(port, () => {
    console.log(`Server is running in ${port} 🎉`);
});