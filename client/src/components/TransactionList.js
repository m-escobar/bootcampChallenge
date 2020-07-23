import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';

import { Grid, Row, Col } from './Flexbox';
import SearchBox from './SearchBox';
import NewButton from './NewButton';
import TransactionRow from './TransactionRow';
import DateSelector from './DateSelector';
import './TransactionList.css';
import Summary from './Summary';

const TransactionList = () => {
  const [state] = useState();
  const [allPeriods, setAllPeriods] = useState();
  const [transactions, setTransaction] = useState([]);
  
  const today = new Date();
  const newPeriod = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  const [currentPeriod, setCurrentPeriod] = useState(newPeriod);
  
  const [info, setInfoState] = useState({
    count: 3,
    received: 2,
    paid: 1,
    balance: 1
  });

  useEffect(() => {
    getPeriods();
  }, [state]);

  useEffect(() => {
    retrieveTransaction(currentPeriod, '');
  }, [currentPeriod]);


  useEffect(() => {
    const update = transactions ? transactions.map(Add => Add) : []
    const count = update.length;

    const allDebits = update.filter(debit => debit.type === '-');
    const allCredits = update.filter(credit => credit.type === '+');

    const totalDebits = allDebits.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    const totalCredits = allCredits.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    setInfoState({
      count: count,
      received: totalCredits,
      paid: totalDebits,
      balance: totalCredits - totalDebits
    })
  }, [transactions]);


  
  const getPeriods = () => {
    TransactionDataService.periods()
      .then((response) => {
        setAllPeriods(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTransaction = (period, searchKey) => {
    TransactionDataService.getAll(period, searchKey)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePeriod = (period) => {
    setCurrentPeriod(period);
  }
  

  const handleInfoUpdate = () => {
    setInfoState({
    count: 3,
    received: 2,
    paid: 1,
    balance: 1
    });
  };

  const handleSearchChange = (searchKey) => {
    retrieveTransaction(currentPeriod, searchKey);
  }

  return (    
    <Grid>
      <DateSelector period={currentPeriod} periodsArray={allPeriods} onPeriodUpdate={updatePeriod} />
      <Summary info={info} OnInfoUpdate={handleInfoUpdate}  />
      <Row >  
        <Col size={1}>
          <NewButton />
        </Col>
        <Col size={7}>
          <SearchBox period={currentPeriod} OnSearchUpdate={handleSearchChange} />    
        </Col>
      </Row>
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
    </Grid>
  );
};

export default TransactionList;