import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CoachDashboard = ({ userInfo, clientList, clientComments, getUserData, clearUserInfo }) => {
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
      {error && console.log(error)}
      <div className="coach-view">
        <h1 className="coach-view-title">Coach View</h1>
        <div className="client-list">
          <h3>Client List</h3>
          {clientList.map((client, i) => <li key={i} className="client-list-item">{client}</li>)}
        </div>
        <div className="comment-list">
          <h3>Comments</h3>
          {clientComments.map((comment, i) => {
            return (
              <div key={i} className="single-comment-container">
                <div className="comment_client">{comment.client}</div>
                <p className="comment_comment">{comment.comment}</p>
                <div className="comment_date">{comment.date}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="logout-btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
};

export default CoachDashboard;