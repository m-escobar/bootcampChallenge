import React from 'react';
import { Row, Col } from './Flexbox';

const Summary = (transactions) => {

return (
  <Row>
    <Col size={2}>
      Lançamentos:  {transactions.info.count}
    </Col>
    <Col size={2}>
      Receitas:  R$ {transactions.info.received}
    </Col>
    <Col size={2}>
      Despesas:  R$ {transactions.info.paid}
    </Col>
    <Col size={2}>
      Saldo:  R$ {transactions.info.balance}
    </Col>
  </Row>
  )
};

export default Summary;
