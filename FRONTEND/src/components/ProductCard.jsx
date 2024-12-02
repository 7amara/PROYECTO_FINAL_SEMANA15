import React, { useState } from 'react';
import { Card, Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import ToastMessage from './ToastMessage';

const ProductCard = ({ product }) => {
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  const handleAddToCart = () => {
    setToast({ show: true, message: 'Producto añadido exitosamente.', variant: 'success' });
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <>
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
      <Card className="border product-card">
        <div className="product-image-wrapper">
          <Card.Img
            variant="top"
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        </div>

        <Card.Body className="d-flex flex-column text-center">
          <Card.Title className="product-title">{product.name}</Card.Title>

          <Card.Text className="product-description">
            {truncateText(product.description, 50)}
          </Card.Text>

          <Card.Text className="product-price text-primary fw-bold">
            S/. {product.price.toFixed(2)}
          </Card.Text>

          <div className="d-flex justify-content-center gap-2 mt-auto">
            <Button
              as={Link}
              to={`/product/${product.id}`}
              variant="outline-primary"
              size="sm"
            >
              Ver Detalles
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddToCart}>
              Añadir al Carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
