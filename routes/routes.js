const express = require('express');
const transactionRouter = express.Router();
const controller = require('../controllers/transactionsController.js');

transactionRouter.get('/api/transaction/periods', controller.findPeriods);
transactionRouter.get('/api/transaction/:id', controller.findOne);
transactionRouter.get('/api/transaction/all/:period', controller.findAll);
transactionRouter.post('/api/transaction/', controller.create);
transactionRouter.put('/api/transaction/:id', controller.update);
transactionRouter.delete('/api/transaction/:id', controller.remove);

module.exports = transactionRouter;
