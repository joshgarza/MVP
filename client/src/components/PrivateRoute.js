import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import React, { useEffect } from 'react';

const PrivateRoute = ({ isAllowed, redirectPath='/login', children }) => {
  // const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) {
      navigate('/login', {replace: true});
    }
  });

  return (
    children ? children : <Outlet />
  );
};

export default PrivateRoute;