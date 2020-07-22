import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';

const SearchBox = props => {
  const [searchBox, setSearchBox] = useState(props);

  const [searchCategory, setSearchCategory] = useState('');
  // const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    setSearchBox(props);
  }, [props]);

  console.log(`FIND_PERIOD - ${searchBox.ym}`)



  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const findByCategory = () => {
    console.log(`findby= ${(searchCategory)}`)
    TransactionDataService.getAll(searchBox.ym, searchCategory)
      .then((response) => {
        setSearchBox(response.data);
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
