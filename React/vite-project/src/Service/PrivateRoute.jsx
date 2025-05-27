import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from './authService';

const PrivateRoute = ({ requiredRole }) => {
  const user = authService.getCurrentUser();
  
    if (!user) {
    return <Navigate to="/login" />;

  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <Outlet />;
};

export default PrivateRoute;