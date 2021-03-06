import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import AddTransaction from './components/AddTransaction';
import Transaction from './components/Transaction';
import TransactionList from './components/TransactionList';

export default function App() {
  return (
    <Router>
      <h3><strong>Desafio Final do Bootcamp Full Stack</strong></h3>
      <h4>Controle Financeiro Pessoal</h4>

      <Switch>
        <Route exact path={['/', '/api/transaction']} component={TransactionList} />
        <Route path="/api/transaction/:id" component={Transaction} />
        <Route exact path="/add" component={AddTransaction} />
      </Switch>
    </Router>
  );
}


      // <div>
      //   <nav className="navbar navbar-expand navbar-dark bg-dark">
      //     <a href="/transaction" className="navbar-brand">
      //       CFP App
      //     </a>
      //     <div className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link to={'/transaction'} className="nav-link">
      //           Transactions
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link to={'/add'} className="nav-link">
      //           Add
      //         </Link>
      //       </li>
      //     </div>
      //   </nav>
      //   <div className="container mt-3">
