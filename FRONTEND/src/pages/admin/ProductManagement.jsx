import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { getProducts, deleteProduct } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../components/ToastMessage';

const ProductManagement = () => {
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(''); 
  const [filterCategory, setFilterCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Hubo un error al cargar los productos.');
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
        setToast({ show: true, message: 'Producto eliminado exitosamente.', variant: 'success' });
      } catch (error) {
        console.error(error);
        setToast({ show: true, message: error.message || 'Error al eliminar el producto.', variant: 'danger' });
      }
    }
  };

  return (
    <Container className="mt-5">
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />

      <Row className="mb-3">
        <Col>
          <h1>Administración de Productos</h1>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate('/admin/products/add')}>
            Agregar Producto
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {[...new Set(products.map((p) => p.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={product.imageUrl} 
                  alt={product.name}
                  thumbnail
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.name}</td>
              <td>S/. {product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductManagement;
