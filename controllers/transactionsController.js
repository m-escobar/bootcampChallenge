transactionModel = require('../models/TransactionModel.js');
logger = require('../config/logger.js');

const create = async (req, res) => { 
  const request = req.body['period'];

};

const findOne = async (req, res) => { 
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      error: 'Id should be informed',
    });
  }

  try {
    const transaction = await transactionModel.findById(id);;

    res.send(transaction);
    logger.info('GET /transaction/:id');
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || `Cant find document with ${id}` });
    logger.error(`GET /transaction/:id - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => { 
  const request = req.body['period'];

  if (!request) {
    return res.status(400).send({
      error: 'Period should be informed',
    });
  }

  try {
    const all_transactions = await transactionModel.find({ yearMonth: request });
    all_transactions;

    res.send(all_transactions);
    logger.info('GET /transaction');
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Error listing documents' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => { 
  const request = req.body['period'];

};

const remove = async (req, res) => { 
  const request = req.body['period'];

};
const removeAll = async (req, res) => { 
  const request = req.body['period'];

};

module.exports = { create, findAll, findOne, update, remove, removeAll };
