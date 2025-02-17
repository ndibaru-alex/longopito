import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const isAdmin = user?.role === 'admin';
  const isAdminPath = location.pathname.includes('admin');
  const isAuthPage = location.pathname.includes('auth-login') || location.pathname.includes('auth-signup');

  // Redirect unauthenticated users from admin routes
  if (isAdminPath && !isAuthenticated) {
    return <Navigate to="/auth-login" />;
  }

  // Redirect non-admin users trying to access admin routes
  if (isAdminPath && isAuthenticated && !isAdmin) {
    return <Navigate to="*" />;
  }

  // Redirect authenticated admin users from "/" to admin panel
  if (location.pathname === "/" && isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/banner" : "/"} />;
  }

  // Prevent authenticated users from accessing login/signup pages
  if (isAuthenticated && isAuthPage) {
    return <Navigate to={isAdmin ? "/admin" : "/"} />;
  }

  return <>{children}</>;
};

export default CheckAuth;
