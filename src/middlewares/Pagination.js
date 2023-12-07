function Pagination(req, res, next) {
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

module.exports = Pagination;