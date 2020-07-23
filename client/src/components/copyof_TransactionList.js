import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from './Flexbox';
import SearchBox from './SearchBox';
import DropBox from './DateSelector';
import NewButton from './NewButton';
import Profile from './Profile';

import './TransactionList.css';

const TransactionList = () => {
  // const [period, setPeriod] = useState({
  //   ym: '2020-06'
  // });



  const [state, setState] = useState({
    name: 'Param',
    email: 'param@gmail.com',
  });
  const handleChange = () => {
    setState({
      name: 'Vennila',
      email: 'vennila@gmail.com',
    });
  };


  // const initialTransactionState = {
    // period: '2020-07'
  // };
  // console.log(`propos=> ${props['period']}`)
  // const [currentPeriod, setCurrentPeriod] = useState();

  // const [searchCategory, setSearchCategory] = useState('');
  // const [currentTransaction, setCurrentTransaction] = useState(initialTransactionState);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [currentTransaction, setCurrentTransaction] = useState();

  // const onChangeSearchCategory = (e) => {
  //   const searchCategory = e.target.value;
  //   setSearchCategory(searchCategory);
  // };

  const retrieveTransaction = (period) => {
    TransactionDataService.getAll(period, '')
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  // const setActiveTransaction = (transaction, index) => {
  //   setCurrentTransaction(transaction);
  //   setCurrentIndex(index);
  // };

  // const findByCategory = () => {
  //   TransactionDataService.findByCategory(searchCategory)
  //     .then((response) => {
  //       setTransaction(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };


  //  getPeriods();
  // console.log('>>>>>>>>>>>>>>>')
  // console.log(allPeriods)
  // console.log(`[[[[[[${allPeriods}]]]]]]`)

  
  const handleSelectChangeValue = (e) => {
    // console.log(`X--->>> ${e.target.value}`);
 
    // setCurrentPeriod(period);
    }

  const handleSearchBoxChange = (e) => {
        console.log(`X--->>> ${e}`);

  }


  return (    
    <Grid>
    <div className="list row">
    <Profile {...state} />
      <button onClick={handleChange}>Change Profile</button>
      <div className="col-md-8">
        {/* <SearchBox period="2020-06"/> */}
        <SearchBox {...currentPeriod} onChangeValue={handleSearchBoxChange(currentPeriod)} />
        <NewButton />

        <DropBox period={transactions[0]} periods={allPeriods} onChangeValue={handleSelectChangeValue()}/>
        {console.log(`!!!!!${transactions[0]}`)}
        {/* <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Procurar por Categoria"
            value={searchCategory}
            onChange={onChangeSearchCategory}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCategory}
            >
              Procurar
            </button>
          </div>
        </div> */}
      </div>
    </div>
    </Grid>
  );
};

export default TransactionList;
