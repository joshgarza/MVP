import { useState } from 'react';
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@mui/material';

const CoachView = ({ getUserData, clearUserInfo }) => {
  const [error, setError] = useState('');
  const { logout } = useAuth();
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
      <div>
        <Button component={RouterLink} to="dashboard">Dashboard</Button>
        <Button component={RouterLink} to="program">Program</Button>
        <Button component={RouterLink} to="profile">Profile</Button>
      </div>
      <div className="logout-btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <Outlet />
    </>
  )
}

export default CoachView;