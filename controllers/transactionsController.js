transactionModel = require('../models/TransactionModel.js');
logger = require('../config/logger.js');

const create = async (req, res) => { 
  const request = req.body;
  
  try {
    const newTransaction = await transactionModel.create(
      { 	
        description: request['description'],
        value: request['value'],
        category: request['category'],
        year: request['year'],
        month: request['month'],
        day: request['day'],
        yearMonth: request['yearMonth'],
        yearMonthDay: request['yearMonthDay'],
        type: request['type']
      }
    );

    res.send(newTransaction);
    logger.info(`POST / - ${JSON.stringify(request)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST / - ${JSON.stringify(error.message)}`);
  }
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
  const request = req.params['period'];
  const search = req.query['search'] || null;

console.log(`period=====>> ${request}`)

console.log(`search=====>> ${search}`)

  if (!request) {
    return res.status(400).send({
      error: 'Period should be informed',
    });
  }

  try {
    const allTransactions = search === null ? await transactionModel.find({ yearMonth: request })
                                            : await transactionModel.find({ yearMonth: request, description: {'$regex': search, '$options': 'i'}});

    res.send(allTransactions);
    logger.info('GET /transaction/all/:period');
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Error listing documents' });
    logger.error(`GET /transaction/all/:period - ${JSON.stringify(error.message)}`);
  }
};

const findPeriods = async (_, res) => { 
  try {
    const allData = await transactionModel.distinct('yearMonth');

    res.send(allData);
    logger.info('GET /transaction/periods');
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Error listing documents' });
    logger.error(`GET /transaction/periods - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  const values = req.body;

  if (!values) {
    return res.status(400).send({
      message: 'Provide data to update',
    });
  }

  const id = req.params.id;

  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      { _id: id },
      { description: values['description'],
        value: values['value'],
        category: values['category'],
        year: values['year'],
        month: values['month'],
        day: values['day'],
        yearMonth: values['yearMonth'],
        yearMonthDay: values['yearMonthDay'],
        type: values['type']
      });

    res.send({ message: 'Transaction updated' });

    logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Error updating transaction: ' + id });
    logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params['id'];

  try {
    const deletedGrade = await transactionModel.findByIdAndDelete({ _id: id });

    if(deletedGrade === null){
      res
        .status(500)
        .send({ message: 'Transaction not deleted: ' + id });
      logger.error(`DELETE /transaction - Transaction not deleted - id: ${id}`);
    } else {
      res.send({ message: 'Transaction deleted' });
      logger.info(`DELETE /transaction - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Transaction not deleted: ' + id });
    logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

module.exports = { create, findAll, findOne, update, remove, findPeriods };
