import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ClientView = ({ getUserData, clearUserInfo }) => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
      clearUserInfo();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div>Client View</div>
      <div className="logout-btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  )
}

export default ClientView;