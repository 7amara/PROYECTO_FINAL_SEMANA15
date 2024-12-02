import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import ToastMessage from '../../components/ToastMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../../services/api';

const ProductForm = ({ categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const product = await getProductById(id);
          setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            stock: product.stock,
          });
        } catch (err) {
          console.error('Error al obtener el producto:', err);
          setToast({ show: true, message: 'Error al cargar los datos del producto.', variant: 'danger' });
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateProduct(id, formData);
        setToast({ show: true, message: 'Producto actualizado exitosamente.', variant: 'success' });
      } else {
        await createProduct(formData, imageFile);
        setToast({ show: true, message: 'Producto agregado exitosamente.', variant: 'success' });
      }

      setTimeout(() => navigate('/admin/products'), 2000);
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: err.message || 'Error al guardar el producto.', variant: 'danger' });
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

      <h1>{id ? 'Editar Producto' : 'Agregar Producto'}</h1>

      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '600px' }}>
        <Form.Group controlId="productName" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del producto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productPrice" className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el precio del producto"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productCategory" className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción del producto"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productStock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el stock del producto"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {!id && (
          <Form.Group controlId="productImage" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} required />
          </Form.Group>
        )}

        <Button type="submit" variant="primary" className="w-100">
          {id ? 'Guardar Cambios' : 'Agregar Producto'}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
