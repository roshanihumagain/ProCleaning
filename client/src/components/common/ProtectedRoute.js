import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!token) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'ADMIN') {
    // Redirect to home if admin access is required but user is not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
