import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRefreshToken } from '../api/axiosInstance';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const refreshToken = getRefreshToken();
  return refreshToken ? <>{children}</> : <Navigate to="/login" />;
};
