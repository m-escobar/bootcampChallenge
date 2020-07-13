import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';

const TransactionList = (props) => {
  const initialTransactionState = {
    period: '2020-07'
  };
  const period = '2020-07'

  const [transaction, setTransaction] = useState([]);
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
    console.log(period)
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
        <h4>Transations List</h4>

        <ul className="list-group">
          {transaction &&
            transaction.map((transaction, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveTransaction(transaction, index)}
                key={index}
              >
                {transaction.name}
              </li>
            ))}
        </ul>


      </div>

      <div className="col-md-6">
        {currentTransaction ? (
          <div>
            <h4>Transaction</h4>
            <div>
              <label>
                <strong>description:</strong>
              </label>{' '}
              {currentTransaction.description}
            </div>
            <div>
              <label>
                <strong>value:</strong>
              </label>{' '}
              {currentTransaction.value}
            </div>
            <div>
              <label>
                <strong>category:</strong>
              </label>{' '}
              {currentTransaction.category}
            </div>
            <div>
              <label>
                <strong>day:</strong>
              </label>{' '}
              {currentTransaction.day}
            </div>

            <Link
              to={'/api/transaction/' + currentTransaction._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Transaction.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
