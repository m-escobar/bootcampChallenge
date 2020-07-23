import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const DateSelector = ({period, periodsArray, onPeriodUpdate}) => {
  const [currentPeriod, setCurrentPeriod] = useState(period);
  
  // const [value, setValue] = useState();

  useEffect(() => {
    M.AutoInit();
  });

  const allPeriods = [];
  
  for(var ap in periodsArray) {
    allPeriods.push(periodsArray[ap]);
  }

const Add = allPeriods ? allPeriods.map(Add => Add) : []

const handlePeriodChange = (e) => {
  setCurrentPeriod(e.currentTarget.value);
  onPeriodUpdate(e.currentTarget.value);
};

return (
  < select
    value={currentPeriod}
    onChange={e => handlePeriodChange(e)}
  >
    {
      Add.map((period, key) => <option key={key}value={period}>{period}</option>)
    }
  </select >
  )
};

export default DateSelector;
