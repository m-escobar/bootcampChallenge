import TransactionDataService from '../services/TransactionsService';

const DeleteTransaction = (id) => {
  TransactionDataService.remove(id)
    .then((response) => {
        console.log(response);
      })
    .catch((e) => {
      console.log(e);
    });
};

export default DeleteTransaction;