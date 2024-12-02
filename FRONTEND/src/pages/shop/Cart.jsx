import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const Cart = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4">Carrito de Compras</h1>
      <Row>
        <Col xs={12} lg={8}>
          <Table responsive bordered hover>
            <thead className="bg-light">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </Col>

        <Col xs={12} lg={4}>
          <div className="bg-light p-4 rounded shadow-sm">
            <h4 className="mb-3">Resumen del Pedido</h4>
            <p>
              <strong>Total:</strong> S/. 0.00
            </p>
            <Button variant="primary" className="w-100">
              Proceder al Pago
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
