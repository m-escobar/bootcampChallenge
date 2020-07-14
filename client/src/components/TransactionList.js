import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from './Flexbox';
// import './TransactionList.css'

const TransactionList = (props) => {
  // const initialTransactionState = {
  //   period: '2020-07'
  // };
  const period = '2020-07'
  console.log(`propos=> ${props['period']}`)
  const [transactions, setTransaction] = useState([]);
  // const [currentTransaction, setCurrentTransaction] = useState(initialTransactionState);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    console.log(`PROPS -->> ${period}`);
    retrieveTransaction(period);
  }, [period]);

  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const retrieveTransaction = (period) => {
    TransactionDataService.getAll(period)
      .then((response) => {
        setTransaction(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const setActiveTransaction = (transaction, index) => {
  //   setCurrentTransaction(transaction);
  //   setCurrentIndex(index);
  // };

  const findByCategory = () => {
    TransactionDataService.findByCategory(searchCategory)
      .then((response) => {
        setTransaction(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by category"
            value={searchCategory}
            onChange={onChangeSearchCategory}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCategory}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Operações Realizadas</h4>
        <Grid>
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
                      (E)
                    </Link>  
                  </Col>
                  <Col size={1} align={'center'}>
                    (D)
                  </Col>
                </Row>
              </ul>
              ))}
          </Grid>
      </div>
    </div>
  );
};

export default TransactionList;
