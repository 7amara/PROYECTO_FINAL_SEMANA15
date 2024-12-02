import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext); 
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">PETSHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Tienda</Nav.Link>
            <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>

            {user?.role === 'Client' && (
            <Nav.Link as={Link} to="/Message">Contactanos</Nav.Link>)}

              
            {/* Mostrar Dashboard solo si el usuario es Admin */}
            {user?.role === 'Admin' && (
              <Nav.Link as={Link} to="/admin/products">Dashboard</Nav.Link>
            )}

            {/* Mostrar login o nombre del usuario */}
            {!user ? (
              <Button as={Link} to="/login" variant="outline-light" className="ms-2">
                Iniciar Sesión
              </Button>
            ) : (
              <>
                {/* Mostrar el nombre del usuario */}
                <Navbar.Text className="me-3 text-white">Hola, <strong>{user?.name}</strong></Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
