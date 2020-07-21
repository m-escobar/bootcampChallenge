import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';
import './TransactionList.css'
import { Grid, Row, Col } from './Flexbox';

const Transaction = (props) => {
  const initialTransactionState = {
    id: null,
    description: '',
    value: 0,
    category: '',
    year: 0,
    month: 0,
    day: 0,
    yearMonth: '',
    yearMonthDay: 0,
    type: ''
  };

  const [currentTransaction, setCurrentTransaction] = useState(initialTransactionState);
  const [message, setMessage] = useState('');

  const getTransaction = (id) => {
    TransactionDataService.get(id)
      .then((response) => {
        setCurrentTransaction(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTransaction(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if(name === 'yearMonthDay'){
      const ymd = new Date(value);
      
      const day = ymd.getDate() + 1;
      const month = ymd.getMonth() + 1;
      const year = ymd.getFullYear();
      const fullMonth = month <= 9 ? `0${month}` : month;
      
      setCurrentTransaction({ ...currentTransaction, [name]: value, ['year']: year, 
                              ['month']: month, ['day']: day, ['yearMonth']: `${year}-${fullMonth}` });
    } else {
      setCurrentTransaction({ ...currentTransaction, [name]: value });
    }
  };

  const updateTransaction = () => {
    TransactionDataService.update(currentTransaction._id, currentTransaction)
      .then((response) => {
        setMessage('The transaction was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid>
    <div>
      {currentTransaction ? (
        <div className="edit-form">
          <h4>Editar Operação</h4>
          <form>
            <div className="form-group">
              <label htmlFor="type">{currentTransaction.type === '+' ? 'Receita' : 'Despesa'}</label>
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTransaction.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Valor</label>
              <input
                type="text"
                className="form-control"
                id="value"
                name="value"
                value={currentTransaction.value}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentTransaction.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearMonthDay">Data</label>
              <input
                type="date"
                className="form-control"
                id="yearMonthDay"
                name="yearMonthDay"
                value={currentTransaction.yearMonthDay}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <Row>
            <Col size={2}>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={updateTransaction}
          >
            Atualizar
          </button>
          </Col>
          <Col size={2}>
            <Link
              to={'/'}
              id="cancel"
              >
              <button className="btn btn-warning">
                Cancelar
              </button>
            </Link>
            </Col>
            <Col size={6} />
            </Row>
          <br />
          <p>
            <Link to={'/'}>
              <button className="btn btn-primary">
                Retornar para Lista de Operações
              </button>
            </Link>
          </p>
          <p>{message}</p>
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
    </Grid>
  );
};

export default Transaction;
