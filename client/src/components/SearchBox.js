import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';

const SearchBox = (props) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [transactions, setTransaction] = useState([]);

  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const findByCategory = (props) => {
    console.log(`findby= ${(props)}`)
    TransactionDataService.getAll(props) //searchCategory
      .then((response) => {
        setTransaction(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="input-group mb-3">
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
    </div>
  )
}

export default SearchBox;
