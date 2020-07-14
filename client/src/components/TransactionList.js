import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';
import { Grid, Row, Col} from './Flexbox';

const TransactionList = (props) => {
  const initialTransactionState = {
    period: '2020-07'
  };
  const period = '2020-07'
  console.log(`propos=> ${props['period']}`)
  const [transactions, setTransaction] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(initialTransactionState);
  const [currentIndex, setCurrentIndex] = useState(-1);
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
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveTransaction = (transaction, index) => {
    setCurrentTransaction(transaction);
    setCurrentIndex(index);
  };

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
          <ul className="list-group">
            {transactions &&
              transactions.map((transaction, index) => (
                <Row>
                  <Col size={1}>
                    <li className={
                      'list-group-item ' + (index === currentIndex ? 'active' : '')
                    }
                    onClick={() => setActiveTransaction(transaction, index)}
                    key={index}
                    >
                    <strong>{transaction.day}</strong>
                    </li>
                  </Col>
                  <Col size={5}>
                    <strong>{transaction.description}</strong>
                    Categoria: {transaction.category}
                  </Col>
                  <Col size={1}>
                    R$ {transaction.value}
                  </Col>
                  <Col size={1}>
                    (E)   (D)
                  </Col>
                </Row>
              ))}
          </ul>
        </Grid>
      </div>
      <div className="col-md-6">
        {currentTransaction ? (
          <div>
            <h4>Grade</h4>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentTransaction.description}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>{' '}
              {currentTransaction.category}
            </div>
            <div>
              <label>
                <strong>Value:</strong>
              </label>{' '}
              {currentTransaction.value}
            </div>
            <div>
              <label>
                <strong>Data:</strong>
              </label>{' '}
              {currentTransaction.yearMonthDay}
            </div>

            <Link
              to={'/api/transaction/' + currentTransaction._id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione uma operação...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
