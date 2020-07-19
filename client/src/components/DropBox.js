import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionsService';


const DropBox = (props) => {
  const currentPeriod = props['period'];
  var dataArray = [];

  for(var cp in currentPeriod) {
    dataArray.push(currentPeriod[cp]);
  }
  
  const thisPeriod = dataArray[7];
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    // console.log(`DATA -->> ${period}`);
    getPeriods();
  }, []);

const getPeriods = () => {
  TransactionDataService.periods()
    .then((response) => {
      setPeriods(response.data);
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e);
    });
};
  // const allPeriods = getPeriods;


  const Add = periods.map(Add => Add);
  const handlePeriodChange = (e) => {
    console.log((periods[e.target.value]))
  };

  return (
    < select
      onChange={e => handlePeriodChange(e)}
      className="browser-default" >
      {
        Add.map((period, key) => <option key={key}value={key}>{period}</option>)
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
