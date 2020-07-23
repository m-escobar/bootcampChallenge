import React, { useState, useEffect } from 'react';
import { Row, Col } from './Flexbox';
import { Link } from 'react-router-dom';
import DeleteTransaction from './DeleteTransaction';

const TransactionRow = props => {
  const [transactionState, setTransactionState] = useState(props);
  // const [toHome, setToHome] = useState(false);
  
  useEffect(() => {
    setTransactionState(props);
  }, [props]);
    
  return(
      <div>
     {/* { toHome ? (
      <Redirect to='/' /> 
      ) : ( */}
          <Row color={transactionState.type === '-' ? 'lightpink' : (transactionState.type === '+' ? 'rgb(191, 250, 191)' : 'purple')}>
            <Col size={1} align={'center'}>
              <strong>{transactionState.day}</strong>
            </Col>
            <Col size={6}>
              <strong>{transactionState.description}</strong><br />
              Categoria: {transactionState.category}
            </Col>
            <Col size={4} align={'right'}>
              R$ {transactionState.value}
            </Col>
            <Col size={1} align={'right'}>
              <Link
                to={'/api/transaction/' + transactionState._id}
                className="badge badge-warning"
                >
                <i id="edit" className="material-icons">edit</i>
              </Link>
            </Col>
            <Col size={1} align={'center'}>
              <button className="badge badge-danger mr-2" onClick={() => DeleteTransaction(transactionState._id)}>
              {/* onClick={() => deleteTransaction(transactionState._id)} */}
                <i id="delete" className="material-icons">remove_circle</i>
              </button>
            </Col>
          </Row>
          {/* )
        } */}
        </div>
  )
};

export default TransactionRow;
