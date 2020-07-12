import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import AddGrade from './components/AddGrade';
// import Grade from './components/Grade';
import TransactionList from './components/TransactionList';

export default function App() {
  return (
  <>
  <h4>Desafio Final do Bootcamp Full Stack</h4>
  <h3>Controle Financeiro Pessoal</h3>
  </>
  )
}


// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// import AddGrade from './components/AddGrade';
// import Grade from './components/Grade';
// import GradeList from './components/GradeList';

// function App() {
//   return (
//     <Router>
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
//           <Switch>
//             <Route exact path={['/', '/grade']} component={GradeList} />
//             <Route exact path="/add" component={AddGrade} />
//             <Route path="/grade/:id" component={Grade} />
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }
