import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from './Flexbox';
// import SearchBox from './SearchBox';
// import DropBox from './DropBox';
// import NewButton from './NewButton';
import Profile from './Profile';

import './TransactionList.css';
import TransactionRow from './TransactionRow';

const TransactionList = () => {
  const [state, setState] = useState({
    name: 'Param',
    email: 'param@gmail.com',
  });

  const [currentPeriod, setCurrentPeriod] = useState({
    ym: '2020-03'
  });

  const [transactions, setTransaction] = useState([]);
  
  const [allPeriods, setAllPeriods] = useState();

  useEffect(() => {
    getPeriods();
  }, [state]);

  useEffect(() => {
    console.log('currentPeriod');
    console.log(currentPeriod);

    retrieveTransaction(currentPeriod.ym);
  }, [currentPeriod]);


  const getPeriods = () => {
    TransactionDataService.periods()
      .then((response) => {
        console.log(response.data)
        setAllPeriods(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTransaction = (period) => {
    TransactionDataService.getAll(period, '')
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = () => {
    setState({
      name: 'Vennila',
      email: 'vennila@gmail.com',
    });
  };

  const handleDelete = () => {

  }

  return (    
    <Grid>
      <div className="list row">
        <Profile {...state} />
        <button onClick={handleChange}>Change Profile</button>


        <div className="col-md-6">
          <h4>Operações Realizadas</h4>
            {transactions &&
              transactions.map((transaction, index) => (
              <ul className="transaction"
                key={index}>
                  <TransactionRow {...transaction} />
              </ul>
            ))}
        </div>



      </div>
    </Grid>
  );
};

export default TransactionList;