import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ isAllowed, redirectPath='/login', children }) => {
  if (!isAllowed) {
    return (
      <Navigate to="/login" replace={true} />
    )

  }

  return (
    children ? children : <Outlet />
  );
};

export default PrivateRoute;