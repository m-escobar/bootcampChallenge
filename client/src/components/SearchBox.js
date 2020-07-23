import React, { useState } from 'react';
 
const SearchBox = ({period, OnSearchUpdate}) => {
  const [searchCategory, setSearchCategory] = useState('');

  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const findByCategory = () => {
    OnSearchUpdate(searchCategory);
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
