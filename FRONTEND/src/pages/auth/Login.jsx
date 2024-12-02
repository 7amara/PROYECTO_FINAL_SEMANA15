import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { Container, Form, Button } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import ToastMessage from '../../components/ToastMessage';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response.token) {
        login({
          token: response.token,
          name: response.name,
          role: response.role,
        });
        setToast({ show: true, message: 'Inicio de sesión exitoso.', variant: 'success' });
        setTimeout(() => navigate('/'), 2000);
      } else if (response.message) {
        setToast({ show: true, message: response.message, variant: 'danger' });
      }
    } catch (err) {
      setToast({ show: true, message: 'Error al iniciar sesión.', variant: 'danger' });
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1>Iniciar Sesión</h1>
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <FormInput
          label="Email"
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          controlId="loginEmail"
        />
        <FormInput
          label="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          controlId="loginPassword"
        />
        <Button type="submit" variant="primary" className="w-100">
          Iniciar Sesión
        </Button>
      </Form>

      <div className="mt-3">
        <p className="text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
