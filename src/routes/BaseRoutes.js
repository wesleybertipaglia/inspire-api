const express = require('express');
const Pagination = require('../middlewares/Pagination');

class BaseRoute {
    constructor(data, model) {
        this.data = data;
        this.model = new model();
        this.router = express.Router();

        this.router.get('/', Pagination, async (req, res) => {
            try {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                let result = this.data;

                if (req.query.page && req.query.limit) {
                    let paginatedData = this.data.slice(req.startIndex, req.endIndex);

                    result = {
                        result: paginatedData,
                        pagination: {
                            total: this.data.length,
                            page: parseInt(req.query.page),
                            pageSize: parseInt(req.query.limit),
                            nextPage: parseInt(req.query.page) + 1,
                            previousPage: parseInt(req.query.page) - 1
                        }
                    };
                }

                res.json(result);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.router.get('/random', (req, res) => {
            const randomId = Math.floor(Math.random() * this.data.length);
            const result = this.data.find((result) => result.id === randomId);

            if (result) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            } else {
                res.status(404).json({ error: 'Data not found' });
            }
        });

        this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = this.data.find((result) => result.id === id);

            if (result) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            } else {
                res.status(404).json({ error: 'result not found' });
            }
        });

        this.router.post('/', (req, res) => {
            const newData = req.body;
            const newId = this.data.length + 1;
            newData.id = newId;

            if (newData) {
                this.data.push(newData);
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json(newData);
            } else {
                res.status(400).json({ error: 'Please, give all the options' });
            }
        });

        this.router.put('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const data = this.data.find(item => item.id === id);

            if (!data) {
                return res.status(404).json({ error: 'Data not found' });
            }

            const updatedItem = { ...data, ...req.body };
            const dataIndex = this.data.findIndex(item => item.id === id);
            this.data[dataIndex] = updatedItem;

            res.status(200).json(updatedItem);
        });

        this.router.delete('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const resultIndex = this.data.findIndex(result => result.id === id);

            if (resultIndex !== -1) {
                const deleted = this.data.splice(resultIndex, 1);
                res.status(201).json(deleted[0]);
            } else {
                res.status(404).json({ error: 'Data not found' });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = BaseRoute;