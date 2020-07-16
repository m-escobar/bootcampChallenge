import React, { useState, useEffect } from 'react';
// import TransactionDataService from '../services/TransactionsService';

const DropBox = (pros) => {
  const defaultValue = '2020-06';

  const changeDate = (event) => {
    this.setState({value: event.target.value});
  }

  const datePeriods = ['2020-06', '2020-04'];
  return (
    <div>
      <form>
        <label htmlFor="date">Selecione o Período</label>
        <select value={defaultValue} onChange={changeDate}>
          <option key="0" value={defaultValue}>Selecione o Período</option>
          {datePeriods.map((data) => {
            return(
              <option key={data.id} value={data.yearMonth}>
                {data.label}
              </option>
            )
          })}
        </select>
      </form>
    </div>
  )
}

export default DropBox;
