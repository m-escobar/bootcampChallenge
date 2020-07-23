import TransactionDataService from '../services/TransactionsService';

const DeleteTransaction = (props) => {
  TransactionDataService.remove(props)
    .then((response) => {
        console.log(response);
      })
    .catch((e) => {
      console.log(e);
      
    });
};

export default DeleteTransaction;