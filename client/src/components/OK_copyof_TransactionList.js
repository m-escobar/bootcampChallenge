import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from './Flexbox';
import SearchBox from './SearchBox';
import DropBox from './DropBox';
import NewButton from './NewButton';
import Profile from './Profile';

import './TransactionList.css';

const TransactionList = () => {
  // const [period, setPeriod] = useState({
  //   ym: '2020-06'
  // });

  const [currentPeriod, setCurrentPeriod] = useState({
    ym: '2020-06'
  });



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
  const [transactions, setTransaction] = useState([]);
  const [allPeriods, setAllPeriods] = useState();
  // const [currentPeriod, setCurrentPeriod] = useState();

  // const [searchCategory, setSearchCategory] = useState('');
  // const [currentTransaction, setCurrentTransaction] = useState(initialTransactionState);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [currentTransaction, setCurrentTransaction] = useState();

  useEffect(() => {
    console.log(`DATA -->> ${currentPeriod}`);
    getPeriods();
    // setCurrentPeriod(allPeriods[allPeriods.length -1]);
    // console.log(currentPeriod);
    retrieveTransaction(currentPeriod.ym);
  }, [currentPeriod]);

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


  const getPeriods = () => {
    TransactionDataService.periods()
      .then((response) => {
        // console.log(response.data)
        setAllPeriods(response.data);
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

  const deleteTransaction = (id) => {
    TransactionDataService.remove(id)
      .then((response) => {
          retrieveTransaction(currentPeriod);
        })
      .catch((e) => {
        console.log(e);
      });
  };

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
      <div className="col-md-6">
        <h4>Operações Realizadas</h4>
          {transactions &&
            transactions.map((transaction, index) => (
            <ul className="transaction"
              key={index}>
              <Row color={transaction.type === '-' ? 'lightpink' : 'rgb(191, 250, 191)'}>
                <Col size={1} align={'center'}>
                  <strong>{transaction.day}</strong>
                </Col>
                <Col size={6}>
                  <strong>{transaction.description}</strong><br />
                  Categoria: {transaction.category}
                </Col>
                <Col size={4} align={'right'}>
                  R$ {transaction.value}
                </Col>
                <Col size={1} align={'right'}>
                  <Link
                    to={'/api/transaction/' + transaction._id}
                    className="badge badge-warning"
                    >
                    <i id="edit" className="material-icons">edit</i>
                  </Link>  
                </Col>
                <Col size={1} align={'center'}>
                  <button className="badge badge-danger mr-2" onClick={() => deleteTransaction(transaction._id)}>
                    <i id="delete" className="material-icons">remove_circle</i>
                  </button>
                </Col>
              </Row>
            </ul>
          ))}
      </div>
    </div>
    </Grid>
  );
};

export default TransactionList;
