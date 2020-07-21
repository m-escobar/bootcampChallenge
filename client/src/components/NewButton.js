import React from 'react';
import { Link } from 'react-router-dom';

const NewButton = () => {
  return(
    <div>
      <Link
        to={'/add'}
        className="badge badge-warning"
      >
        <button
          className="btn btn-outline-secondary"
          type="button"
          >
          Novo lançamento
        </button>
      </Link>
    </div>
  )
}

export default NewButton;