import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { Container, Form, Button } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import ToastMessage from '../../components/ToastMessage';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToast({ show: true, message: 'Las contraseñas no coinciden.', variant: 'danger' });
      return;
    }
    try {
      const response = await registerUser({ name, email, password });

      if (response.id) {
        setToast({ show: true, message: 'Registro exitoso. Ahora puede iniciar sesión.', variant: 'success' });
        setTimeout(() => navigate('/login'), 2000);
      } else if (response.message) {
        setToast({ show: true, message: response.message, variant: 'danger' });
      }
    } catch (err) {
      setToast({ show: true, message: 'Error al registrarse.', variant: 'danger' });
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1>Registro</h1>
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <FormInput
          label="Nombre"
          type="text"
          placeholder="Ingrese su nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          controlId="registerName"
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          controlId="registerEmail"
        />
        <FormInput
          label="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          controlId="registerPassword"
        />
        <FormInput
          label="Confirmar Contraseña"
          type="password"
          placeholder="Confirme su contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          controlId="registerConfirmPassword"
        />
        <Button type="submit" variant="success" className="w-100">
          Registrarse
        </Button>
      </Form>

      {/* Mensaje para redirigir al login */}
      <div className="mt-3">
        <p className="text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
