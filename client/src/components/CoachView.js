import { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CoachView = ({ getUserData, clearUserInfo }) => {
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
      <div>
        <Link to="dashboard">Dashboard</Link>
        <Link to="program">Add Workouts</Link>
        <Link to="profile">Profile</Link>
      </div>
      <div className="logout-btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <Outlet />
    </>
  )
}

export default CoachView;