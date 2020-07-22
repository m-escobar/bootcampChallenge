import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';

const DeleteTransaction = (props) => {

  console.log('///////////////')
  console.log(props);

  TransactionDataService.remove(props)
    .then((response) => {
        console.log(response);
      })
    .catch((e) => {
      console.log(e);
      
    });
};

export default DeleteTransaction;