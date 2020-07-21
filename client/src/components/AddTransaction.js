import React, { useState } from 'react';
import TransactionDataService from '../services/TransactionsService';
import { Link } from 'react-router-dom';

const AddTransaction = () => {
  const initialTransactionState = {
    id: null,
    description: '',
    value: '',
    category: '',
    yearMonthDay: '',
    type: '-'
  };

  const [transaction, setTransaction] = useState(initialTransactionState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const saveTransaction = () => {
    const ymd = new Date(transaction.yearMonthDay);
    const day = ymd.getDate() + 1;
    const simpleMonth = ymd.getMonth() + 1;
    const year = ymd.getFullYear();
    const month = simpleMonth <= 9 ? `0${simpleMonth}` : simpleMonth;
    const yearMonth = `${year}-${month}`;

    var data = {
      type: transaction.type,
      description: transaction.description,
      value: transaction.value,
      category: transaction.category,
      yearMonthDay: transaction.yearMonthDay,

      year: year,
      month: month,
      day: day,
      yearMonth: yearMonth,
    };

    TransactionDataService.create(data)
      .then((response) => {
        setTransaction({
          id: response.data.id,
          description: response.data.description,
          value: response.data.value,
          category: response.data.category,
          year: response.data.year,
          month: response.data.month,
          day: response.data.day,
          yearMonth: response.data.yearMonth,
          yearMonthDay: response.data.yearMonthDay,
          type: response.data.type
        });

        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTransaction = () => {
    setTransaction(initialTransactionState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <>
        <div>
          <h4>Nova operação criada!</h4>
          <button className="btn btn-success" onClick={newTransaction}>
            Nova Operação
          </button>
        </div>
        <div>
          <p>
            <Link to={'/'}>
              <button className="btn btn-primary">
                Retornar para Lista de Operações
              </button>
            </Link>
          </p>
        </div>
        </>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="type">Tipo da transação (+ ou -)</label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={transaction.description}
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
              value={transaction.value}
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
              value={transaction.category}
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
              value={transaction.yearMonthDay}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={saveTransaction} className="btn btn-success">
            Criar
          </button>
          <p>
            <Link to={'/'}>
              <button className="btn btn-primary">
                Retornar para Lista de Operações
              </button>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
