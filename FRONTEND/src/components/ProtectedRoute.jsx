import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'Admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
