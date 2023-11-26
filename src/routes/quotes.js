const express = require('express');
const router = express.Router();

const quotesData = require('../data/quotes.json');
const quotes = quotesData.quotes;

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.json(quotes);
});

const paginationMiddleware = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page <= 0 || limit <= 0) {
        return res.status(400).json({ message: 'Invalid pagination parameters' });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    req.startIndex = startIndex;
    req.endIndex = endIndex;

    next();
};

router.get('/q', paginationMiddleware, async (req, res) => {
    const paginatedData = quotes.slice(req.startIndex, req.endIndex);
    const totalCount = quotes.length;

    const response = {
        quotes: paginatedData,
        pagination: {
            total: totalCount,
            page: parseInt(req.query.page),
            pageSize: parseInt(req.query.limit),
            nextPage: parseInt(req.query.page) + 1,
            previousPage: parseInt(req.query.page) - 1
        }
    };

    res.json(response);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find((quote) => quote.id === id);

    if (quote) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quote);
    } else {
        res.status(404).json({ error: 'Quote not found' });
    }
})

router.post('/', (req, res) => {
    const { text, author, category } = req.body;
    const newId = quotes.length + 1;

    if (!text || !author || !category) {
        res.status(400).json({ error: 'Please, give the text, author and category' });
    } else {
        res.setHeader('Content-Type', 'application/json');
        const newQuote = { id: newId, text, author, category };
        quotes.push(newQuote);
        res.status(201).json(newQuote);
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find(quote => quote.id === id);
    const { text, author, category } = req.body;

    if (quote) {
        quote.text = text || quote.text;
        quote.author = author || quote.author;
        quote.category = category || quote.category;
        res.status(201).json(quote);
    } else {
        res.status(404).json({ error: 'Quote not found' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quoteIndex = quotes.findIndex(quote => quote.id === id);

    if (quoteIndex !== -1) {
        const deletedQuote = quotes.splice(quoteIndex, 1);
        res.status(201).json(deletedQuote[0]);
    } else {
        res.status(404).json({ error: 'Quote not found' });
    }
});

module.exports = router;
