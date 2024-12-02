import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { getProductById } from '../../services/api';
import ToastMessage from '../../components/ToastMessage';

const ProductDetails = () => {
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setToast({ show: true, message: 'Producto añadido exitosamente.', variant: 'success' });
  };

  if (!product) {
    return (
      <Container className="mt-5">
        <h3>Cargando producto...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />

      <Row className="gy-4 align-items-center">
        <Col xs={12} md={6}>
          <div className="bg-light p-3 rounded shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
        </Col>

        <Col xs={12} md={6}>
          <h2 className="mb-3">{product.name}</h2>
          <h4 className="text-primary mb-3">${product.price.toFixed(2)}</h4>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} unidades disponibles
          </p>
          <p className="mb-4">
            <strong>Descripción:</strong> {product.description}
          </p>

          <Button variant="primary" size="lg" onClick={handleAddToCart}>
            Añadir al Carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;