import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

// import AddGrade from './components/AddGrade';
// import Grade from './components/Grade';
import TransactionList from './components/TransactionList';

export default function App() {
  return (
    <Router>
      <h3>Desafio Final do Bootcamp Full Stack</h3>
      <h4>Controle Financeiro Pessoal</h4>

      <Switch>
        <Route exact path={['/', '/api/transaction']} component={TransactionList} />
{/* //             <Route exact path="/add" component={AddTransaction} /> */}
{/* //             <Route path="/grade/:id" component={Transaction} /> */}
      </Switch>
    </Router>
  );
}


//       <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           <a href="/grade" className="navbar-brand">
//             Grades App
//           </a>
//           <div className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <Link to={'/grade'} className="nav-link">
//                 Grades
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={'/add'} className="nav-link">
//                 Add
//               </Link>
//             </li>
//           </div>
//         </nav>
//         <div className="container mt-3">
