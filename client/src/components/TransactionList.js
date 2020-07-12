import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';

const TransactionList = () => {
  const [transaction, setTransaction] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    retrieveTransaction();
  }, []);

  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const retrieveTransaction = () => {
    TransactionDataService.getAll()
      .then((response) => {
        setTransaction(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTransaction();
    setCurrentTransaction(null);
    setCurrentIndex(-1);
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
            placeholder="Search by name"
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
        <h4>Grade List</h4>

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
                <strong>Name:</strong>
              </label>{' '}
              {currentTransaction.name}
            </div>
            <div>
              <label>
                <strong>Subject:</strong>
              </label>{' '}
              {currentTransaction.subject}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{' '}
              {currentTransaction.type}
            </div>
            <div>
              <label>
                <strong>Value:</strong>
              </label>{' '}
              {currentTransaction.value}
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
