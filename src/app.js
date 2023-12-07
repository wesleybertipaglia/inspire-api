const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.send('Welcome to the Quotes API! 🎉');
});

module.exports = router;