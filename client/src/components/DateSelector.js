import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const DateSelector = (props) => {
  const [currentPeriod, setCurrentPeriod] = useState(props.period);
  
  const [value, setValue] = useState();

  console.log('>>>>>>>>>>>>><<<<<<<<<<');
  console.log(currentPeriod)


  useEffect(() => {
    M.AutoInit();
    // setPeriods(props.periods)
    // setCurrentPeriod();
  }, [props]);


  const allPeriods = [];
  
  for(var ap in props.periodsArray) {
    allPeriods.push(props.periodsArray[ap]);
  }
  // console.log('000000000000000')
  // console.log(allPeriods)


  // useEffect(() => {
  //   // console.log(`DATA -->> ${period}`);
  // }, [value]);

// console.log(`>>>THIS${thisPeriod}`)
// setPeriods(allPeriods);
// console.log(allPeriods);

const Add = allPeriods ? allPeriods.map(Add => Add) : []

const handlePeriodChange = (e) => {
  setCurrentPeriod(e.currentTarget.value);
  onPeriodUpdate(currentPeriod);
  console.log(`P--->>> `);
  console.log(currentPeriod)
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

// export default DropBox;

// const dropdownlist = ["item1", "item2", "item3"]

// const DropBox = () => {
//   const [firstdropdown, setFirstdropdown] = useState("I am the first!");
//   return(
//     <label htmlFor="First Dropdown">
//       First Dropdown
//         <select
//           id="first"
//           value={firstdropdown}
//           onChange={e=> setFirstdropdown(e.target.value)}
//           onBlur={e=> setFirstdropdown(e.target.value)}
//           disabled={!dropdownlist.length}>
//             <option>All</option>
//             {dropdownlist.map((item) =>(<option key={item} value={item}>
//             </option>))}
//         </select>
//     </label>
//   );
// }