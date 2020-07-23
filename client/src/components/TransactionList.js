import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Grid } from './Flexbox';
// import SearchBox from './SearchBox';
// import NewButton from './NewButton';

import TransactionRow from './TransactionRow';
import DateSelector from './DateSelector';
import './TransactionList.css';

import Profile from './Profile';

const TransactionList = () => {
  const [state, setState] = useState({
    name: 'Param',
    email: 'param@gmail.com',
  });
  
  const [allPeriods, setAllPeriods] = useState();
  const [currentPeriod, setCurrentPeriod] = useState('2021-07');
  const [transactions, setTransaction] = useState([]);
  
  const updatePeriod = (period) => {
    console.log('retorno')
    console.log(period)
    console.log('+++++++++')
    setCurrentPeriod(period);
  }
  
  useEffect(() => {
    getPeriods();
  }, [state]);

  useEffect(() => {
    console.log('UseEffect currentPeriod');
    console.log(currentPeriod);
    console.log(currentPeriod.ym);

    retrieveTransaction(currentPeriod);
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

  const handlePeriodChange = () => {
    const select = document.getElementsByClassName('select-dropdown')[0];
    
    const newPeriod = select ? select.value : '';
    console.log('eeeeeeeeeeeeee')
    console.log(newPeriod)
    console.log('-----------')
  }

  // console.log('===============')
  // console.log(currentPeriod)
  // console.log(allPeriods)

  return (    
    <Grid>
      <div className="list row">
        <Profile {...state} />
        <button onClick={handleChange}>Change Profile</button>

        <DateSelector period={currentPeriod.ym} periodsArray={allPeriods} onPeriodUpdate={updatePeriod} zcurrentPeriod={currentPeriod} />
        {/* onChangeValue={handlePeriodChange()} /> */}
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