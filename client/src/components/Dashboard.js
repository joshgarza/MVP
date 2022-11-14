import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CoachView from './CoachView';
import ClientView from './ClientView';

const Dashboard = ({ userInfo, getUserData, clearUserInfo }) => {
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
      <CoachView />
      {/* {userInfo && userInfo[0].user_type === 'Coach' && <CoachView userInfo={userInfo}/>} */}
      {/* {userInfo && userInfo[0].user_type === 'Client' && <ClientView userInfo={userInfo}/>} */}
      {error && console.log(error)}
      {/* <div>
        <h2>Profile</h2>
        <strong>Email: {currentUser.email}</strong>
        <Link to="/update-profile">Update Profile</Link>
      </div> */}
      <div className="logout-btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
};

export default Dashboard;