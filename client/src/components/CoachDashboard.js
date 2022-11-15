import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CoachView from './CoachView';
import ClientView from './ClientView';
import { formatDistance } from 'date-fns';

const initialList = ['Alex Allain', 'Maja W.', 'Laura Kelly'];
const baseDate = new Date(2022, 0, 1, 0, 0, 15);
const currDate = new Date(2022, 0, 10, 0, 0, 15);

const initialComments = [
  {
    client: initialList[0],
    date: formatDistance(currDate, baseDate) + ' ago',
    comment: 'Finished the workout no problem!'
  },
  {
    client: initialList[1],
    date: formatDistance(currDate, baseDate)  + ' ago',
    comment: 'Had a rough time with squats today'
  },
  {
    client: initialList[2],
    date: formatDistance(currDate, baseDate)  + ' ago',
    comment: 'Hit a new PR! Super psyched :)'
  },
]

const CoachDashboard = ({ userInfo, getUserData, clearUserInfo }) => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [clientList, setClientList] = useState(initialList)
  const [clientComments, setClientComments] = useState(initialComments)

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
        {/* <button className="addworkout-btn">Add Workout</button> */}
        <div className="client-list">
          {clientList.map((client, i) => <li key={i} className="client-list-item">{client}</li>)}
        </div>
        <div className="comment-list">
          {clientComments.map((comment, i) => {
            return (
              <div key={i} className="single-comment-container">
                <div className="comment_client">{comment.client}</div>
                <div className="comment_date">{comment.date}</div>
                <p className="comment_comment">{comment.comment}</p>
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