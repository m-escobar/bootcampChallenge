import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const DropBox = (props) => {
  const [periods, setPeriods] = useState([props]);
  // const [currentPeriod, setCurrentPeriod] = useState();
  const [value, setValue] = useState();

  var dataArray = [];
  var allPeriods = [];

  const currentPeriod = props['period'];
  const periodsProps = props['periods'];

  for(var cp in currentPeriod) {
    dataArray.push(currentPeriod[cp]);
  }
  const thisPeriod = dataArray[7];
  
  for(var p in periodsProps) {
    allPeriods.push(periodsProps[p]);
  }
    // console.log(`---->>>>>> ${allPeriods}<<<<<<<--------`);


  // useEffect(() => {
  //   // console.log(`DATA -->> ${period}`);
  // }, [value]);


  useEffect(() => {
    // console.log(`DATA -->> ${period}`);
    M.AutoInit();
    setPeriods(props);
  }, [props]);


// const allPeriods = ['1', '2', '3'];

// console.log(`>>>THIS${thisPeriod}`)
// setPeriods(allPeriods);
// console.log(allPeriods);

const Add = allPeriods.map(Add => Add);

const handlePeriodChange = (e) => {
  console.log(`P--->>> ${e.currentTarget.value}`);
  setValue(e.currentTarget.value);
};

return (
  < select
    value={thisPeriod}
    onChange={e => handlePeriodChange(e)}
  >
    {
      Add.map((period, key) => <option key={key}value={period}>{period}</option>)
    }
  </select >
  )
};

export default DropBox;

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
